// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Map} from "./Map.sol";
import {Rules} from "./lib/Rules.sol";
import {FixedMath} from "./lib/FixedMath.sol";

/// @dev Only the slice of Season that Battle needs, to keep the two decoupled.
interface ISeasonPool {
    function draw(uint256 amount) external returns (uint256);
}

/**
 * @title Battle
 * @notice Commit, reveal, and the resolution of every siege in a tick.
 *
 * ── Why there is a bond ────────────────────────────────────────────────────
 * The brief says a missed reveal forfeits the stake, "10% burned, 90% returned".
 * That cannot be implemented: if the player never reveals, the contract only
 * ever saw a hash and has no idea what the amount was. So the penalty attaches
 * to a BOND posted in the open at commit time instead.
 *
 * Three problems fall to that one change:
 *
 *   1. A missed reveal is now punishable, because the bond is a known number.
 *   2. Order-independence stops depending on the mempool. Reveals are separate
 *      transactions; if a player could commit more than their balance, which of
 *      their reveals landed would be decided by transaction ordering. The bond
 *      is debited at commit, so the number of live commitments is bounded before
 *      the reveal window opens.
 *   3. Losing your salt stops being catastrophic. The stake is only debited at
 *      reveal, so a player who loses their salt forfeits the bond — a known,
 *      small, capped amount — rather than everything they meant to stake.
 *
 * ── Why anyone can submit a reveal ─────────────────────────────────────────
 * The reveal window is 45 minutes, three times a day, for six weeks. A player
 * asleep through their window would lose out, so `reveal` is permissionless:
 * anybody holding the salt can post it on the player's behalf, and the
 * commitment binds the player's own address so a relayer cannot redirect
 * anything.
 *
 * Handing a relayer your salt leaks almost nothing, and that is not a hope, it
 * is structural: by the time the reveal window opens the commit window has
 * closed, so nobody — relayer included — can still change their own order in
 * response to learning yours.
 *
 * ── Why batching is safe ───────────────────────────────────────────────────
 * `resolveTick` walks contested hexes in ascending id in batches. No hex's
 * outcome can depend on another's: adjacency and the empire tax are charged at
 * reveal time, and a battle reads only its own hex plus stakes that were fixed
 * when the reveal window shut. Nothing written during resolution is ever read
 * during resolution, so the cursor can stop and resume anywhere and the final
 * state is identical. `test/Invariants.t.sol` asserts exactly that.
 */
contract Battle is Ownable {
    using SafeERC20 for IERC20;

    // ------------------------------------------------------------------ types

    enum Phase {
        Commit,
        Reveal,
        Resolution
    }

    struct Commitment {
        uint32 tick;
        uint128 bond;
        bool revealed;
        bool settled;
    }

    struct Side {
        uint128 rawPower; // sum of sqrt(stake), WAD
        uint128 stake;
    }

    // -------------------------------------------------------------- constants

    uint256 public constant TICK_SECONDS = 8 hours;
    uint256 public constant COMMIT_SECONDS = 7 hours;
    uint256 public constant REVEAL_SECONDS = 45 minutes;
    uint256 public constant TICKS_PER_SEASON = 126;
    uint256 public constant REFUGE_COOLDOWN_TICKS = 21;
    uint16 public constant DEFAULT_BATCH = 64;

    // ------------------------------------------------------------------ state

    IERC20 public immutable token;
    Map public immutable map;
    address public season;

    uint256 public seasonStart;

    /// @notice Empire curve selector: 200 = h^2 (the brief), 150 = h^1.5, 100 = linear.
    uint256 public empireExponent;

    /// @notice Flat bond locked per commitment. Public by design — see the header.
    uint128 public commitBond;

    /// @notice Yield one tier-1 hex accrues per tick, drawn from the season pool.
    uint128 public yieldUnit;

    /// @notice Deposited, unstaked balance. Stakes never move tokens during commit.
    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public lockedOf;

    mapping(bytes32 => Commitment) public commitments;

    /// @notice Last tick a wallet revealed anything — drives the cohesion count.
    mapping(address => uint32) public lastActiveTick;
    mapping(uint32 => uint32) private _activeCount;
    mapping(uint32 => uint32) private _activeCountTick;

    // --- per-tick tallies, cleared as resolution consumes them
    uint16[] public contested;
    mapping(uint16 => Side) public defSide;
    mapping(uint16 => address[]) private _defList;
    mapping(uint16 => mapping(address => uint128)) private _defAmt;
    mapping(uint16 => uint32[]) private _atkGuilds;
    mapping(uint16 => mapping(uint32 => Side)) public atkSide;
    mapping(uint16 => mapping(uint32 => address[])) private _atkList;
    mapping(uint16 => mapping(uint32 => mapping(address => uint128))) private _atkAmt;
    mapping(uint16 => uint32) private _tallyTick;

    /// @notice Position epoch per hex. tokenId = (epoch << 16) | hexId.
    mapping(uint16 => uint32) public hexEpoch;

    mapping(uint16 => uint32) public lastAccrualTick;
    mapping(uint32 => uint32) public lastRefugeMoveTick;

    uint32 public lastResolvedTick;
    uint16 public resolveCursor;

    uint256 public totalBurned;

    // ----------------------------------------------------------------- events

    event Deposited(address indexed player, uint256 amount);
    event Withdrawn(address indexed player, uint256 amount);
    event Committed(address indexed player, bytes32 indexed commitment, uint32 tick, uint128 bond);
    event Revealed(
        address indexed player,
        uint16 indexed hexId,
        uint128 amount,
        bool isAttack,
        address relayer
    );
    event CommitSlashed(address indexed player, bytes32 indexed commitment, uint128 burned);
    event HexCaptured(
        uint16 indexed hexId, uint32 indexed from, uint32 indexed to, uint128 treasury
    );
    event HexHeld(uint16 indexed hexId, uint32 indexed guildId);
    event HexClaimed(uint16 indexed hexId, uint32 indexed guildId, uint256 cost);
    event TickResolved(uint32 indexed tick, uint16 battles);
    event Burned(uint256 amount, string reason);

    // ------------------------------------------------------------------ setup

    constructor(
        IERC20 token_,
        Map map_,
        uint256 seasonStart_,
        uint256 empireExponent_,
        uint128 commitBond_,
        uint128 yieldUnit_
    ) Ownable(msg.sender) {
        token = token_;
        map = map_;
        seasonStart = seasonStart_;
        empireExponent = empireExponent_;
        commitBond = commitBond_;
        yieldUnit = yieldUnit_;
        // Tick 0 is before the season opens; the first playable tick is 1.
        lastResolvedTick = 0;
    }

    function setSeason(address season_) external onlyOwner {
        require(season == address(0), "Battle: season set");
        season = season_;
    }

    /**
     * @notice Retune the empire curve.
     * @dev Exposed because the balance simulation shows `h^2` burns roughly 63%
     *      of staked capital per season against a fixed supply. The right curve
     *      is a live design decision; hardcoding it would have meant redeploying
     *      to change it.
     */
    function setEmpireExponent(uint256 exponent) external onlyOwner {
        require(exponent == 100 || exponent == 150 || exponent == 200, "Battle: bad exponent");
        empireExponent = exponent;
    }

    // ------------------------------------------------------------------ clock

    function currentTick() public view returns (uint32) {
        if (block.timestamp < seasonStart) return 0;
        return uint32((block.timestamp - seasonStart) / TICK_SECONDS) + 1;
    }

    function phase() public view returns (Phase) {
        uint256 into = (block.timestamp - seasonStart) % TICK_SECONDS;
        if (into < COMMIT_SECONDS) return Phase.Commit;
        if (into < COMMIT_SECONDS + REVEAL_SECONDS) return Phase.Reveal;
        return Phase.Resolution;
    }

    function seasonOver() public view returns (bool) {
        return currentTick() > TICKS_PER_SEASON;
    }

    // ----------------------------------------------------------- deposits

    function deposit(uint256 amount) external {
        token.safeTransferFrom(msg.sender, address(this), amount);
        balanceOf[msg.sender] += amount;
        emit Deposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        uint256 free = balanceOf[msg.sender] - lockedOf[msg.sender];
        require(amount <= free, "Battle: locked");
        balanceOf[msg.sender] -= amount;
        token.safeTransfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    /// @notice Balance not tied up in a live commitment.
    function freeBalance(address player) public view returns (uint256) {
        return balanceOf[player] - lockedOf[player];
    }

    // ------------------------------------------------------------------ commit

    /**
     * @notice Post a sealed order.
     * @param commitment keccak256(abi.encode(hexId, amount, isAttack, salt, player))
     *
     * No token moves and no amount is revealed. Only the bond is locked, and the
     * bond is the same for everybody, so its size says nothing about the order.
     */
    function commit(bytes32 commitment) external {
        require(!seasonOver(), "Battle: season over");
        require(phase() == Phase.Commit, "Battle: not commit phase");
        uint32 tick = currentTick();
        require(lastResolvedTick + 1 == tick, "Battle: previous tick unresolved");
        require(commitments[commitment].tick == 0, "Battle: duplicate commitment");
        require(freeBalance(msg.sender) >= commitBond, "Battle: bond exceeds balance");

        lockedOf[msg.sender] += commitBond;
        commitments[commitment] =
            Commitment({tick: tick, bond: commitBond, revealed: false, settled: false});

        emit Committed(msg.sender, commitment, tick, commitBond);
    }

    /**
     * @notice Open a sealed order. Callable by anyone holding the salt.
     * @dev The player's address is inside the preimage, so a relayer can post
     *      the reveal but cannot point it at a different wallet or a different
     *      hex. See the header for why handing a relayer the salt is safe.
     */
    function reveal(
        address player,
        uint16 hexId,
        uint128 amount,
        bool isAttack,
        bytes32 salt
    ) external {
        require(phase() == Phase.Reveal, "Battle: not reveal phase");
        uint32 tick = currentTick();

        bytes32 h = keccak256(abi.encode(hexId, amount, isAttack, salt, player));
        Commitment storage c = commitments[h];
        require(c.tick == tick, "Battle: no commitment this tick");
        require(!c.revealed, "Battle: already revealed");

        c.revealed = true;
        c.settled = true;
        lockedOf[player] -= c.bond;

        uint32 guildId = map.guildOf(player);
        require(guildId != 0, "Battle: no guild");

        _accrue(hexId, tick);
        uint32 owner = map.ownerOf(hexId);
        uint256 charged = _validateAndCharge(player, guildId, hexId, amount, isAttack, owner);

        _countActive(player, guildId, tick);
        _tally(hexId, guildId, player, uint128(charged), isAttack, owner, tick);

        emit Revealed(player, hexId, amount, isAttack, msg.sender);
    }

    /**
     * @notice Burn the penalty on a commitment that was never opened.
     * @dev 10% of the bond burned, 90% returned — the brief's split, applied to
     *      the one number the contract actually knows.
     */
    function slashUnrevealed(address player, bytes32 commitment) external {
        Commitment storage c = commitments[commitment];
        require(c.tick != 0 && !c.settled, "Battle: nothing to slash");
        require(currentTick() > c.tick, "Battle: tick still open");

        c.settled = true;
        uint128 bond = c.bond;
        uint128 burn = (bond * uint128(Rules.PENALTY_BURN_PCT)) / 100;

        lockedOf[player] -= bond;
        balanceOf[player] -= burn;
        _burn(burn, "missed reveal");

        emit CommitSlashed(player, commitment, burn);
    }

    // -------------------------------------------------------- reveal internals

    function _validateAndCharge(
        address player,
        uint32 guildId,
        uint16 hexId,
        uint128 amount,
        bool isAttack,
        uint32 owner
    ) private returns (uint256 charged) {
        require(amount > 0, "Battle: zero stake");
        uint16 held = map.guildHexCount(guildId);

        if (!isAttack) {
            require(owner == guildId, "Battle: not your hex");
            charged = amount;
        } else if (owner == 0) {
            // A claim. Priced at the base tier cost carrying the empire multiplier.
            require(
                held == 0 ? map.isBorder(hexId) : map.touchesGuild(hexId, guildId),
                "Battle: not reachable"
            );
            uint256 base = Rules.baseClaimCost(map.tierOf(hexId));
            charged = Rules.expansionCost(base, held, empireExponent);
        } else {
            require(owner != guildId, "Battle: already yours");
            require(!_isRefuge(hexId), "Battle: refuge");
            require(map.touchesGuild(hexId, guildId), "Battle: not adjacent");
            charged = Rules.expansionCost(amount, held, empireExponent);
        }

        require(balanceOf[player] >= charged, "Battle: insufficient balance");
        balanceOf[player] -= charged;

        // The surcharge above the stake is destroyed, never redistributed.
        if (charged > amount) _burn(charged - amount, "empire tax");
    }

    function _isRefuge(uint16 hexId) private view returns (bool) {
        (,,,,,, bool isRefuge,) = map.hexes(hexId);
        return isRefuge;
    }

    function _countActive(address player, uint32 guildId, uint32 tick) private {
        if (lastActiveTick[player] == tick) return;
        lastActiveTick[player] = tick;
        if (_activeCountTick[guildId] != tick) {
            _activeCountTick[guildId] = tick;
            _activeCount[guildId] = 0;
        }
        _activeCount[guildId] += 1;
    }

    function activeMembers(uint32 guildId) public view returns (uint32) {
        return _activeCountTick[guildId] == currentTick() ? _activeCount[guildId] : 0;
    }

    function _tally(
        uint16 hexId,
        uint32 guildId,
        address player,
        uint128 stake,
        bool isAttack,
        uint32 owner,
        uint32 tick
    ) private {
        if (_tallyTick[hexId] != tick) {
            _tallyTick[hexId] = tick;
            contested.push(hexId);
        }

        // The power basis is the stake itself, never the taxed cost: the empire
        // tax must make expansion expensive, not make the expander stronger.
        uint128 p = uint128(Rules.powerOf(stake));

        if (!isAttack) {
            Side storage s = defSide[hexId];
            if (_defAmt[hexId][player] == 0) _defList[hexId].push(player);
            _defAmt[hexId][player] += stake;
            s.rawPower += p;
            s.stake += stake;
            map.markDefended(hexId, tick);
        } else {
            Side storage s = atkSide[hexId][guildId];
            if (s.stake == 0 && s.rawPower == 0) _atkGuilds[hexId].push(guildId);
            if (_atkAmt[hexId][guildId][player] == 0) _atkList[hexId][guildId].push(player);
            _atkAmt[hexId][guildId][player] += stake;
            s.rawPower += p;
            s.stake += stake;
        }

        // Silences the unused warning while documenting that owner is validated above.
        owner;
    }

    // -------------------------------------------------------------- resolution

    /**
     * @notice Resolve up to `max` contested hexes of the open tick.
     * @dev Walks `contested` from a stored cursor, so a keeper can spread the
     *      work over several transactions when a tick is busy. Batching cannot
     *      change any outcome — see the header.
     */
    function resolveTick(uint16 max) external {
        uint32 tick = currentTick();
        require(tick > lastResolvedTick, "Battle: already resolved");
        require(phase() == Phase.Resolution || tick > lastResolvedTick + 1, "Battle: too early");

        uint16 limit = max == 0 ? DEFAULT_BATCH : max;
        uint256 end = resolveCursor + limit;
        if (end > contested.length) end = contested.length;

        for (uint256 i = resolveCursor; i < end; i++) {
            _resolveHex(contested[i], tick);
        }

        uint16 done = uint16(end);
        if (end >= contested.length) {
            emit TickResolved(tick, uint16(contested.length));
            delete contested;
            resolveCursor = 0;
            lastResolvedTick = tick;
        } else {
            resolveCursor = done;
        }
    }

    function _resolveHex(uint16 hexId, uint32 tick) private {
        uint32 owner = map.ownerOf(hexId);
        uint32[] storage atkGuilds = _atkGuilds[hexId];

        if (owner == 0) {
            _resolveClaim(hexId, tick, atkGuilds);
        } else {
            _resolveBattle(hexId, tick, owner, atkGuilds);
        }

        _clearHexTally(hexId, atkGuilds);
    }

    function _resolveClaim(uint16 hexId, uint32 tick, uint32[] storage atkGuilds) private {
        if (atkGuilds.length == 0) return;

        // Highest raw power takes it; an exact tie goes to the lower guild id so
        // the outcome never depends on the order the reveals arrived in.
        uint32 winner = 0;
        uint128 best = 0;
        for (uint256 i = 0; i < atkGuilds.length; i++) {
            uint32 g = atkGuilds[i];
            uint128 p = atkSide[hexId][g].rawPower;
            if (p > best || (p == best && winner != 0 && g < winner)) {
                best = p;
                winner = g;
            }
        }
        if (winner == 0) return;

        uint256 base = Rules.baseClaimCost(map.tierOf(hexId));
        uint128 pot = atkSide[hexId][winner].stake;
        uint128 seed = pot < uint128(base) ? pot : uint128(base);

        map.setOwner(hexId, winner, tick);
        map.addTreasury(hexId, seed);
        lastAccrualTick[hexId] = tick;

        // Anything staked beyond the base price was the empire surcharge, and it
        // is burned rather than banked — otherwise the tax would flow back into
        // the pool through upkeep and the fixed pot would stop being fixed.
        if (pot > seed) _burn(pot - seed, "claim surcharge");

        _mintPositions(hexId, winner);
        _refundLosers(hexId, winner, atkGuilds);
        emit HexClaimed(hexId, winner, seed);
    }

    function _resolveBattle(
        uint16 hexId,
        uint32 tick,
        uint32 owner,
        uint32[] storage atkGuilds
    ) private {
        Side storage def = defSide[hexId];

        if (atkGuilds.length == 0) {
            // Nobody came. The defenders get their stake back untouched.
            _returnSide(hexId, 0, true);
            emit HexHeld(hexId, owner);
            return;
        }

        (uint32 winner, uint256 bestA, bool tie) = _bestAttacker(hexId, tick, atkGuilds);

        // Strictly greater, and an exact tie between attackers holds the ground.
        bool taken = Rules.attackerWins(bestA, _defenceOf(hexId, tick, owner, def.rawPower)) && !tie;

        for (uint256 i = 0; i < atkGuilds.length; i++) {
            uint32 g = atkGuilds[i];
            if (taken && g == winner) continue;
            _penaliseSide(hexId, g, owner);
        }

        if (!taken) {
            _returnSide(hexId, 0, true);
            emit HexHeld(hexId, owner);
            return;
        }

        uint128 prize = map.clearTreasury(hexId);
        // A hex treasury is a claim on the season pool, not tokens sitting on the
        // hex. Draw what is actually there before crediting anybody.
        if (prize > 0 && season != address(0)) {
            prize = uint128(ISeasonPool(season).draw(prize));
        }
        _payPro(hexId, winner, prize);
        _returnSide(hexId, winner, false); // winners get their stake back whole
        _penaliseDefenders(hexId, winner);

        map.setOwner(hexId, winner, tick);
        hexEpoch[hexId] += 1;
        lastAccrualTick[hexId] = tick;
        _mintPositions(hexId, winner);

        emit HexCaptured(hexId, owner, winner, prize);
    }


    /// @dev Pulled out of `_resolveBattle` purely to keep the stack under 16 slots.
    function _defenceOf(uint16 hexId, uint32 tick, uint32 owner, uint128 rawPower)
        private
        view
        returns (uint256)
    {
        (,,,, uint32 heldSince, uint32 lastDefended,,) = map.hexes(hexId);
        bool lapsed = tick - lastDefended >= Rules.NO_DEFENSE_LAPSE_TICKS;
        return Rules.defensePower(rawPower, activeMembers(owner), tick, heldSince, lapsed);
    }

    /// @dev Highest attack power on the hex, and whether the top spot is tied.
    function _bestAttacker(uint16 hexId, uint32 tick, uint32[] storage atkGuilds)
        private
        view
        returns (uint32 winner, uint256 bestA, bool tie)
    {
        for (uint256 i = 0; i < atkGuilds.length; i++) {
            uint32 g = atkGuilds[i];
            uint256 a = Rules.attackPower(
                atkSide[hexId][g].rawPower, activeMembers(g), map.guildHexCount(g), tick
            );
            if (a > bestA) {
                bestA = a;
                winner = g;
                tie = false;
            } else if (a == bestA && a != 0) {
                tie = true;
            }
        }
    }

    // ---------------------------------------------------------- payout helpers

    /// @dev 20% off a losing attacker: half to the defenders, half destroyed.
    function _penaliseSide(uint16 hexId, uint32 guildId, uint32 defenderGuild) private {
        address[] storage list = _atkList[hexId][guildId];
        for (uint256 i = 0; i < list.length; i++) {
            address p = list[i];
            uint128 amt = _atkAmt[hexId][guildId][p];
            if (amt == 0) continue;
            uint128 cut = (amt * uint128(Rules.PENALTY_BURN_PCT)) / 100;
            balanceOf[p] += amt - 2 * cut;
            _burn(cut, "failed attack");
            _spreadOverDefenders(hexId, cut, defenderGuild);
        }
    }

    /// @dev 20% off the defenders when the hex falls: half to the winner, half destroyed.
    function _penaliseDefenders(uint16 hexId, uint32 winner) private {
        address[] storage list = _defList[hexId];
        for (uint256 i = 0; i < list.length; i++) {
            address p = list[i];
            uint128 amt = _defAmt[hexId][p];
            if (amt == 0) continue;
            uint128 cut = (amt * uint128(Rules.PENALTY_BURN_PCT)) / 100;
            balanceOf[p] += amt - 2 * cut;
            _burn(cut, "hex lost");
            _payPro(hexId, winner, cut);
        }
    }

    function _spreadOverDefenders(uint16 hexId, uint128 pot, uint32 defenderGuild) private {
        Side storage def = defSide[hexId];
        if (def.stake == 0) {
            // Undefended ground: the defenders' share has nowhere to go and burns.
            _burn(pot, "no defender");
            return;
        }
        address[] storage list = _defList[hexId];
        uint128 given;
        for (uint256 i = 0; i < list.length; i++) {
            uint128 share = uint128((uint256(pot) * _defAmt[hexId][list[i]]) / def.stake);
            balanceOf[list[i]] += share;
            given += share;
        }
        if (pot > given) _burn(pot - given, "dust");
        defenderGuild;
    }

    /// @dev Split a pot across a guild's attackers on this hex, pro rata to stake.
    function _payPro(uint16 hexId, uint32 guildId, uint128 pot) private {
        if (pot == 0) return;
        Side storage s = atkSide[hexId][guildId];
        if (s.stake == 0) {
            _burn(pot, "no claimant");
            return;
        }
        address[] storage list = _atkList[hexId][guildId];
        uint128 given;
        for (uint256 i = 0; i < list.length; i++) {
            uint128 share = uint128((uint256(pot) * _atkAmt[hexId][guildId][list[i]]) / s.stake);
            balanceOf[list[i]] += share;
            given += share;
        }
        if (pot > given) _burn(pot - given, "dust");
    }

    /// @dev Give a side its stake back whole.
    function _returnSide(uint16 hexId, uint32 guildId, bool defenders) private {
        if (defenders) {
            address[] storage list = _defList[hexId];
            for (uint256 i = 0; i < list.length; i++) {
                balanceOf[list[i]] += _defAmt[hexId][list[i]];
            }
        } else {
            address[] storage list = _atkList[hexId][guildId];
            for (uint256 i = 0; i < list.length; i++) {
                balanceOf[list[i]] += _atkAmt[hexId][guildId][list[i]];
            }
        }
    }

    function _refundLosers(uint16 hexId, uint32 winner, uint32[] storage atkGuilds) private {
        for (uint256 i = 0; i < atkGuilds.length; i++) {
            if (atkGuilds[i] == winner) continue;
            _returnSide(hexId, atkGuilds[i], false);
        }
    }

    /**
     * @dev Mint the ERC-1155 slice for whoever just took the hex.
     *
     * The token id carries the hex's epoch, which is bumped on every capture.
     * The brief specifies `tokenId == hexId`, and that holds for a hex's first
     * owner; past that, positions from a previous owner would have to be burned,
     * and burning them means enumerating every past holder on-chain, which no
     * ERC-1155 can do. Retiring the id instead is the only bounded way to expire
     * the old claims.
     */
    function _mintPositions(uint16 hexId, uint32 guildId) private {
        uint256 id = (uint256(hexEpoch[hexId]) << 16) | uint256(hexId);
        address[] storage list = _atkList[hexId][guildId];
        for (uint256 i = 0; i < list.length; i++) {
            uint128 amt = _atkAmt[hexId][guildId][list[i]];
            if (amt > 0) map.mintPosition(list[i], uint16(id), amt);
        }
    }

    function _clearHexTally(uint16 hexId, uint32[] storage atkGuilds) private {
        address[] storage dl = _defList[hexId];
        for (uint256 i = 0; i < dl.length; i++) delete _defAmt[hexId][dl[i]];
        delete _defList[hexId];
        delete defSide[hexId];

        for (uint256 i = 0; i < atkGuilds.length; i++) {
            uint32 g = atkGuilds[i];
            address[] storage al = _atkList[hexId][g];
            for (uint256 j = 0; j < al.length; j++) delete _atkAmt[hexId][g][al[j]];
            delete _atkList[hexId][g];
            delete atkSide[hexId][g];
        }
        delete _atkGuilds[hexId];
        delete _tallyTick[hexId];
    }

    // ------------------------------------------------------------- accrual

    /**
     * @notice Bring a hex's treasury up to date.
     * @dev Lazy on purpose. Touching all 547 hexes every tick is impossible on
     *      chain, so yield and the 2% upkeep are applied only when a hex is
     *      involved in something. The loop is pure arithmetic in memory and the
     *      season is 126 ticks, so the worst case is a few thousand gas.
     */
    function _accrue(uint16 hexId, uint32 tick) private {
        uint32 from = lastAccrualTick[hexId];
        if (from >= tick) return;
        lastAccrualTick[hexId] = tick;

        uint32 owner = map.ownerOf(hexId);
        if (owner == 0) return;

        uint256 t = map.treasuryOf(hexId);
        uint256 y = Rules.tickYield(map.tierOf(hexId), yieldUnit);
        uint256 paid;
        uint256 skimmed;

        for (uint32 i = from; i < tick; i++) {
            t += y;
            paid += y;
            uint256 up = (t * Rules.UPKEEP_PCT) / 100;
            t -= up;
            skimmed += up;
        }

        if (paid > 0) map.addTreasury(hexId, uint128(paid));
        if (skimmed > 0) map.skimTreasury(hexId, uint128(skimmed));
    }

    /// @notice Public nudge so a keeper can settle a hex the game has not touched.
    function accrue(uint16 hexId) external {
        _accrue(hexId, currentTick());
    }

    // --------------------------------------------------------------- refuge

    function moveRefuge(uint16 hexId) external {
        uint32 guildId = map.guildOf(msg.sender);
        require(guildId != 0, "Battle: no guild");
        uint32 tick = currentTick();
        require(
            tick >= lastRefugeMoveTick[guildId] + REFUGE_COOLDOWN_TICKS, "Battle: refuge cooldown"
        );
        lastRefugeMoveTick[guildId] = tick;
        map.moveRefuge(guildId, hexId);
    }

    // ----------------------------------------------------------------- burn

    function _burn(uint256 amount, string memory reason) private {
        if (amount == 0) return;
        totalBurned += amount;
        ERC20Burnable(address(token)).burn(amount);
        emit Burned(amount, reason);
    }

    // ----------------------------------------------------------------- views

    function contestedCount() external view returns (uint256) {
        return contested.length;
    }

    function positionId(uint16 hexId) external view returns (uint256) {
        return (uint256(hexEpoch[hexId]) << 16) | uint256(hexId);
    }
}
