// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Map
 * @notice The board: 547 hexes in axial coordinates, who holds them, and the
 *         ERC-1155 that represents a wallet's share of one.
 *
 * `tokenId == hexId`, and a balance is that wallet's slice of the stake
 * committed on the hex. Several wallets hold the same hex at once; the season
 * payout follows those slices.
 *
 * Adjacency is computed, not stored. Axial distance is three subtractions and
 * three absolute values, which is far cheaper than 3,282 stored edges and
 * cannot drift out of sync with the coordinates.
 *
 * Seeding is batched and then sealed. 547 hexes will not fit in one transaction,
 * so `seedHexes` is called repeatedly and `seal()` closes the door: after that
 * no tier can be edited and no hex can be added.
 */
contract Map is ERC1155, Ownable {
    // ------------------------------------------------------------------ types

    struct Hex {
        int16 q;
        int16 r;
        uint8 tier; // 1 | 2 | 3
        uint32 ownerGuild; // 0 = neutral
        uint32 heldSinceTick;
        uint32 lastDefendedTick;
        bool isRefuge;
        uint128 treasury;
    }

    struct Guild {
        address treasury; // Safe multisig
        uint16 hexCount;
        uint16 refugeHexId;
        uint32 memberCount;
        bool exists;
    }

    // ------------------------------------------------------------------ state

    /// @notice The hex registry, indexed by hex id. Order matches `sim/hex.ts`.
    Hex[] public hexes;

    /// @dev Packed axial coordinate -> hexId + 1 (0 means "no hex there").
    mapping(uint32 => uint16) private _idByCoord;

    mapping(uint32 => Guild) public guilds;
    mapping(address => uint32) public guildOf;
    uint32 public guildCount;

    /// @notice Battle is the only contract allowed to move ground or mint positions.
    address public battle;
    bool public sealed_;

    // ----------------------------------------------------------------- events

    event HexSeeded(uint16 indexed hexId, int16 q, int16 r, uint8 tier);
    event Sealed(uint256 hexCount);
    event GuildCreated(uint32 indexed guildId, address treasury);
    event MemberJoined(uint32 indexed guildId, address indexed member);
    event HexOwnerChanged(uint16 indexed hexId, uint32 indexed from, uint32 indexed to, uint32 tick);
    event RefugeMoved(uint32 indexed guildId, uint16 from, uint16 to);

    // ------------------------------------------------------------------ setup

    constructor(string memory uri_) ERC1155(uri_) Ownable(msg.sender) {}

    modifier onlyBattle() {
        require(msg.sender == battle, "Map: not battle");
        _;
    }

    function setBattle(address battle_) external onlyOwner {
        require(battle == address(0), "Map: battle already set");
        battle = battle_;
    }

    /**
     * @notice Seed a slice of the board. Call until every hex is in, then seal.
     * @dev Coordinates and tiers come from `sim/hex.ts`, which places tier 3 so
     *      that no two are adjacent. That property is asserted here rather than
     *      trusted: a bad seed would silently unbalance every season.
     */
    function seedHexes(int16[] calldata q, int16[] calldata r, uint8[] calldata tier)
        external
        onlyOwner
    {
        require(!sealed_, "Map: sealed");
        require(q.length == r.length && r.length == tier.length, "Map: length mismatch");

        for (uint256 i = 0; i < q.length; i++) {
            require(tier[i] >= 1 && tier[i] <= 3, "Map: bad tier");
            uint32 key = _coordKey(q[i], r[i]);
            require(_idByCoord[key] == 0, "Map: duplicate hex");

            uint16 id = uint16(hexes.length);
            hexes.push(
                Hex({
                    q: q[i],
                    r: r[i],
                    tier: tier[i],
                    ownerGuild: 0,
                    heldSinceTick: 0,
                    lastDefendedTick: 0,
                    isRefuge: false,
                    treasury: 0
                })
            );
            _idByCoord[key] = id + 1;
            emit HexSeeded(id, q[i], r[i], tier[i]);
        }
    }

    /// @notice Close seeding permanently and check the tier-3 spacing invariant.
    function seal() external onlyOwner {
        require(!sealed_, "Map: sealed");
        require(hexes.length > 0, "Map: empty");

        for (uint256 i = 0; i < hexes.length; i++) {
            if (hexes[i].tier != 3) continue;
            uint16[6] memory nb = neighbors(uint16(i));
            for (uint256 d = 0; d < 6; d++) {
                if (nb[d] == type(uint16).max) continue;
                require(hexes[nb[d]].tier != 3, "Map: adjacent tier 3");
            }
        }

        sealed_ = true;
        emit Sealed(hexes.length);
    }

    // ------------------------------------------------------------- geometry

    function hexCount() external view returns (uint256) {
        return hexes.length;
    }

    /// @dev Offsets keep the packed key positive for the radius-13 board and well beyond.
    function _coordKey(int16 q, int16 r) private pure returns (uint32) {
        return (uint32(uint16(int16(q + 1000))) << 16) | uint32(uint16(int16(r + 1000)));
    }

    /// @notice Hex id at a coordinate, or `type(uint16).max` if the board has no such cell.
    function idAt(int16 q, int16 r) public view returns (uint16) {
        uint16 stored = _idByCoord[_coordKey(q, r)];
        return stored == 0 ? type(uint16).max : stored - 1;
    }

    /// @notice The six neighbours, in the same direction order as `sim/hex.ts`.
    function neighbors(uint16 hexId) public view returns (uint16[6] memory out) {
        Hex storage h = hexes[hexId];
        out[0] = idAt(h.q + 1, h.r);
        out[1] = idAt(h.q + 1, h.r - 1);
        out[2] = idAt(h.q, h.r - 1);
        out[3] = idAt(h.q - 1, h.r);
        out[4] = idAt(h.q - 1, h.r + 1);
        out[5] = idAt(h.q, h.r + 1);
    }

    /// @notice True when the hex touches ground already held by the guild.
    function touchesGuild(uint16 hexId, uint32 guildId) external view returns (bool) {
        uint16[6] memory nb = neighbors(hexId);
        for (uint256 d = 0; d < 6; d++) {
            if (nb[d] == type(uint16).max) continue;
            if (hexes[nb[d]].ownerGuild == guildId) return true;
        }
        return false;
    }

    /// @notice True for a rim hex — where a guild without ground plants its first flag.
    function isBorder(uint16 hexId) external view returns (bool) {
        uint16[6] memory nb = neighbors(hexId);
        for (uint256 d = 0; d < 6; d++) {
            if (nb[d] == type(uint16).max) return true;
        }
        return false;
    }

    // ---------------------------------------------------------------- guilds

    /// @notice Open a guild. The treasury is expected to be a Safe.
    function createGuild(address treasury_) external returns (uint32 guildId) {
        require(sealed_, "Map: not sealed");
        require(treasury_ != address(0), "Map: no treasury");
        require(guildOf[msg.sender] == 0, "Map: already in a guild");

        guildId = ++guildCount;
        guilds[guildId] =
            Guild({treasury: treasury_, hexCount: 0, refugeHexId: 0, memberCount: 1, exists: true});
        guildOf[msg.sender] = guildId;

        emit GuildCreated(guildId, treasury_);
        emit MemberJoined(guildId, msg.sender);
    }

    /// @notice Join an existing guild. Membership is what cohesion counts.
    function joinGuild(uint32 guildId) external {
        require(guilds[guildId].exists, "Map: no such guild");
        require(guildOf[msg.sender] == 0, "Map: already in a guild");
        guildOf[msg.sender] = guildId;
        guilds[guildId].memberCount += 1;
        emit MemberJoined(guildId, msg.sender);
    }

    // ------------------------------------------------------- battle-only writes

    /**
     * @notice Hand a hex to a guild.
     * @dev Called for both a claim (from == 0) and a capture. The first hex a
     *      guild takes becomes its refuge, which is what guarantees no guild can
     *      ever be wiped off the board.
     */
    function setOwner(uint16 hexId, uint32 to, uint32 tick) external onlyBattle {
        Hex storage h = hexes[hexId];
        uint32 from = h.ownerGuild;
        require(from != to, "Map: no change");

        if (from != 0) guilds[from].hexCount -= 1;
        guilds[to].hexCount += 1;

        h.ownerGuild = to;
        h.heldSinceTick = tick;
        h.lastDefendedTick = tick;

        if (guilds[to].refugeHexId == 0 && !h.isRefuge) {
            _assignRefuge(to, hexId);
        }

        emit HexOwnerChanged(hexId, from, to, tick);
    }

    function _assignRefuge(uint32 guildId, uint16 hexId) private {
        uint16 old = guilds[guildId].refugeHexId;
        if (old != 0) hexes[old].isRefuge = false;
        guilds[guildId].refugeHexId = hexId;
        hexes[hexId].isRefuge = true;
        emit RefugeMoved(guildId, old, hexId);
    }

    function markDefended(uint16 hexId, uint32 tick) external onlyBattle {
        hexes[hexId].lastDefendedTick = tick;
    }

    function addTreasury(uint16 hexId, uint128 amount) external onlyBattle {
        hexes[hexId].treasury += amount;
    }

    function clearTreasury(uint16 hexId) external onlyBattle returns (uint128 taken) {
        taken = hexes[hexId].treasury;
        hexes[hexId].treasury = 0;
    }

    /// @notice Upkeep: skim a slice of the treasury back toward the season pool.
    function skimTreasury(uint16 hexId, uint128 amount) external onlyBattle {
        hexes[hexId].treasury -= amount;
    }

    function mintPosition(address to, uint16 hexId, uint256 amount) external onlyBattle {
        _mint(to, hexId, amount, "");
    }

    function burnPosition(address from, uint16 hexId, uint256 amount) external onlyBattle {
        _burn(from, hexId, amount);
    }

    // ---------------------------------------------------------------- refuge

    /**
     * @notice Move the guild's refuge. Cooldown is enforced by Battle, which is
     *         the only contract that knows the tick.
     */
    function moveRefuge(uint32 guildId, uint16 hexId) external onlyBattle {
        require(hexes[hexId].ownerGuild == guildId, "Map: not yours");
        _assignRefuge(guildId, hexId);
    }

    // ------------------------------------------------------------------ views

    function ownerOf(uint16 hexId) external view returns (uint32) {
        return hexes[hexId].ownerGuild;
    }

    function tierOf(uint16 hexId) external view returns (uint8) {
        return hexes[hexId].tier;
    }

    function treasuryOf(uint16 hexId) external view returns (uint128) {
        return hexes[hexId].treasury;
    }

    function guildHexCount(uint32 guildId) external view returns (uint16) {
        return guilds[guildId].hexCount;
    }

    function memberCount(uint32 guildId) external view returns (uint32) {
        return guilds[guildId].memberCount;
    }
}
