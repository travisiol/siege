// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {HexwarToken} from "../src/HexwarToken.sol";
import {Map} from "../src/Map.sol";
import {Battle} from "../src/Battle.sol";
import {Season} from "../src/Season.sol";

/**
 * @dev The cheatcode interface, declared here rather than imported from
 *      forge-std. Foundry is the runner for these tests, but declaring the
 *      handful of cheatcodes we use means the suite also compiles under plain
 *      solc — so it can be type-checked on a machine that has no Foundry.
 */
interface Vm {
    function warp(uint256) external;
    function prank(address) external;
    function startPrank(address) external;
    function stopPrank() external;
    function expectRevert(bytes calldata) external;
    function label(address, string calldata) external;
    function assume(bool) external;
    function snapshotState() external returns (uint256);
    function revertToState(uint256) external returns (bool);
}

/// @dev Minimal assertions, same names Foundry users expect.
contract Asserts {
    event log_named_uint(string key, uint256 val);
    event log_named_string(string key, string val);

    error AssertFailed(string what);

    function assertTrue(bool c, string memory what) internal pure {
        if (!c) revert AssertFailed(what);
    }

    function assertEq(uint256 a, uint256 b, string memory what) internal pure {
        if (a != b) revert AssertFailed(what);
    }

    function assertEq(bytes32 a, bytes32 b, string memory what) internal pure {
        if (a != b) revert AssertFailed(what);
    }

    function assertLe(uint256 a, uint256 b, string memory what) internal pure {
        if (a > b) revert AssertFailed(what);
    }
}

/**
 * @notice Shared fixture: a small board, two guilds, funded players.
 *
 * The board is radius 2 (19 hexes) rather than the real 547. Adjacency, tiers
 * and the refuge all behave identically at that size, and a small board keeps
 * the invariant runs fast enough to be worth running on every commit.
 */
contract Harness is Asserts {
    Vm internal constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));

    HexwarToken internal token;
    Map internal map;
    Battle internal battle;
    Season internal season;

    address internal treasury = address(0xA11CE);
    address internal alice = address(0xA1);
    address internal bob = address(0xB0);
    address internal carol = address(0xC0);

    uint32 internal guildA;
    uint32 internal guildB;

    uint256 internal start;

    uint128 internal constant BOND = 10e18;
    uint128 internal constant YIELD_UNIT = 5e18;

    function _setUpWorld(uint256 empireExponent) internal {
        start = 1_800_000_000; // a fixed, round timestamp
        vm.warp(start);

        token = new HexwarToken(treasury);
        map = new Map("ipfs://hexwar/{id}");
        season = new Season(token);
        battle = new Battle(token, map, start, empireExponent, BOND, YIELD_UNIT);

        map.setBattle(address(battle));
        season.setBattle(address(battle));
        battle.setSeason(address(season));

        _seedRadius2();
        map.seal();

        vm.startPrank(treasury);
        token.approve(address(season), type(uint256).max);
        season.fund(1_000_000e18);
        token.transfer(alice, 500_000e18);
        token.transfer(bob, 500_000e18);
        token.transfer(carol, 500_000e18);
        vm.stopPrank();

        _fund(alice);
        _fund(bob);
        _fund(carol);

        vm.prank(alice);
        guildA = map.createGuild(alice);
        vm.prank(bob);
        guildB = map.createGuild(bob);
        vm.prank(carol);
        map.joinGuild(guildB);
    }

    function _fund(address who) private {
        vm.startPrank(who);
        token.approve(address(battle), type(uint256).max);
        battle.deposit(400_000e18);
        vm.stopPrank();
    }

    /// @dev A radius-2 disc, tiers laid out so no two tier 3 touch.
    function _seedRadius2() private {
        int16[] memory q = new int16[](19);
        int16[] memory r = new int16[](19);
        uint8[] memory t = new uint8[](19);

        int16 i = 0;
        uint256 n = 0;
        for (i = -2; i <= 2; i++) {
            int16 lo = -2 > -i - 2 ? int16(-2) : int16(-i - 2);
            int16 hi = 2 < -i + 2 ? int16(2) : int16(-i + 2);
            for (int16 j = lo; j <= hi; j++) {
                q[n] = i;
                r[n] = j;
                t[n] = 1;
                n++;
            }
        }
        // Centre is the only tier 3; one tier 2 well away from it.
        for (uint256 k = 0; k < n; k++) {
            if (q[k] == 0 && r[k] == 0) t[k] = 3;
            if (q[k] == 2 && r[k] == 0) t[k] = 2;
        }
        map.seedHexes(q, r, t);
    }

    // ------------------------------------------------------------- time helpers

    function _toTick(uint32 tick) internal {
        vm.warp(start + (uint256(tick) - 1) * battle.TICK_SECONDS());
    }

    function _toReveal(uint32 tick) internal {
        vm.warp(start + (uint256(tick) - 1) * battle.TICK_SECONDS() + battle.COMMIT_SECONDS());
    }

    function _toResolve(uint32 tick) internal {
        vm.warp(
            start + (uint256(tick) - 1) * battle.TICK_SECONDS() + battle.COMMIT_SECONDS()
                + battle.REVEAL_SECONDS()
        );
    }

    // ------------------------------------------------------------ order helpers

    function _hash(uint16 hexId, uint128 amount, bool isAttack, bytes32 salt, address player)
        internal
        pure
        returns (bytes32)
    {
        return keccak256(abi.encode(hexId, amount, isAttack, salt, player));
    }

    function _commit(address player, uint16 hexId, uint128 amount, bool isAttack, bytes32 salt)
        internal
    {
        vm.prank(player);
        battle.commit(_hash(hexId, amount, isAttack, salt, player));
    }

    function _reveal(address player, uint16 hexId, uint128 amount, bool isAttack, bytes32 salt)
        internal
    {
        battle.reveal(player, hexId, amount, isAttack, salt);
    }

    function _idAt(int16 q, int16 r) internal view returns (uint16) {
        return map.idAt(q, r);
    }

    /// @dev Every token the game is accountable for: player balances plus the pool.
    function _systemTotal() internal view returns (uint256) {
        return token.balanceOf(address(battle)) + token.balanceOf(address(season))
            + token.balanceOf(alice) + token.balanceOf(bob) + token.balanceOf(carol)
            + token.balanceOf(treasury);
    }
}
