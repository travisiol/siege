// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Season
 * @notice Holds the pot and pays it out once the last tick has been played.
 *
 * The pool is pre-funded and fixed. Nothing here can mint, and the token has no
 * mint function at all: whatever the season pays, somebody put in first.
 *
 * Hex treasuries are claims against this pool rather than tokens sitting on a
 * hex. Yield credited to a hex only moves a number in Map; the tokens stay here
 * until a capture actually pays them out, at which point Battle draws them. That
 * is what keeps "the pot is fixed" true even while 547 hexes accrue three times
 * a day.
 *
 * The final split is a merkle claim, not a loop. Paying hundreds of wallets in
 * one transaction is not possible, and a pull-based claim also means a wallet
 * that never comes back cannot block anybody else's payout.
 */
contract Season is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;
    address public battle;

    /// @notice Tokens paid in before the season opened.
    uint256 public funded;
    /// @notice Tokens drawn out so far, by captures and by claims.
    uint256 public paidOut;

    /// @notice Root over (index, account, amount) of the end-of-season split.
    bytes32 public merkleRoot;
    bool public finalised;
    mapping(uint256 => bool) public claimed;

    event Funded(address indexed from, uint256 amount);
    event Drawn(address indexed to, uint256 amount);
    event Finalised(bytes32 root, uint256 remaining);
    event Claimed(uint256 indexed index, address indexed account, uint256 amount);

    constructor(IERC20 token_) Ownable(msg.sender) {
        token = token_;
    }

    modifier onlyBattle() {
        require(msg.sender == battle, "Season: not battle");
        _;
    }

    function setBattle(address battle_) external onlyOwner {
        require(battle == address(0), "Season: battle set");
        battle = battle_;
    }

    /// @notice Pre-fund the pot. Must happen before the first tick.
    function fund(uint256 amount) external {
        require(!finalised, "Season: finalised");
        token.safeTransferFrom(msg.sender, address(this), amount);
        funded += amount;
        emit Funded(msg.sender, amount);
    }

    function poolRemaining() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    /**
     * @notice Move tokens to Battle so a captured treasury can actually be paid.
     * @dev Capped by what is left. A hex treasury is a claim on this pool, so a
     *      claim larger than the pool pays what is there and no more — the pot
     *      cannot be overdrawn into existence.
     */
    function draw(uint256 amount) external onlyBattle returns (uint256 sent) {
        uint256 avail = poolRemaining();
        sent = amount > avail ? avail : amount;
        if (sent == 0) return 0;
        paidOut += sent;
        token.safeTransfer(battle, sent);
        emit Drawn(battle, sent);
    }

    /// @notice Return upkeep skimmed off hex treasuries.
    function returnToPool(uint256 amount) external {
        token.safeTransferFrom(msg.sender, address(this), amount);
    }

    /**
     * @notice Close the season and publish the split.
     * @dev The allocation is computed off-chain by the indexer from the final
     *      board — every wallet's tier-weighted share of held territory — and
     *      committed here as a root. The inputs are public events, so anyone can
     *      rebuild the tree and check the root before claiming.
     */
    function finalise(bytes32 root) external onlyOwner {
        require(!finalised, "Season: finalised");
        require(root != bytes32(0), "Season: empty root");
        finalised = true;
        merkleRoot = root;
        emit Finalised(root, poolRemaining());
    }

    function claim(uint256 index, address account, uint256 amount, bytes32[] calldata proof)
        external
    {
        require(finalised, "Season: not finalised");
        require(!claimed[index], "Season: already claimed");

        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(index, account, amount))));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Season: bad proof");

        claimed[index] = true;
        paidOut += amount;
        token.safeTransfer(account, amount);
        emit Claimed(index, account, amount);
    }
}
