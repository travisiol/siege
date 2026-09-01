// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Harness} from "./Harness.sol";
import {Rules} from "../src/lib/Rules.sol";

/**
 * @title Invariants
 * @notice The four properties the brief makes mandatory for M1.
 *
 *   1. Stakes plus burns are always conserved.
 *   2. No hex changes hands without A > D.
 *   3. A reveal can never cost more than what was committed.
 *   4. Replaying a tick with the transactions in a different order gives the
 *      same final state.
 *
 * Number four was already demonstrated in the TypeScript simulation, which
 * replays every seventh tick with the orders shuffled and compares an effects
 * fingerprint — zero failures across ten seasons of eight scenarios. This is the
 * same property, asserted against the contract that will actually run it.
 */
contract InvariantsTest is Harness {
    function setUp() public {
        _setUpWorld(200);
    }

    // ------------------------------------------------------------------ (1)

    /// @notice Nothing is created. Supply only ever falls, and only by the burn.
    function test_conservation_acrossAClaimAndABattle() public {
        uint256 supplyBefore = token.totalSupply();
        uint256 systemBefore = _systemTotal();

        _playClaimTick(1);
        _playContestedTick(2);

        assertEq(
            supplyBefore,
            token.totalSupply() + battle.totalBurned(),
            "supply must equal current supply plus everything burned"
        );
        assertLe(_systemTotal(), systemBefore, "tokens can leave via burn, never appear");
    }

    // ------------------------------------------------------------------ (2)

    /// @notice A hex only moves when the attacker strictly outpowers the defence.
    function test_noCaptureWithoutStrictlyGreaterPower() public {
        _playClaimTick(1);
        uint16 target = _idAt(0, 0);
        assertEq(map.ownerOf(target), guildA, "guild A should hold the centre");

        // Equal stakes on both sides. Cohesion favours B (two members), but the
        // defender's fortification is at least 100, so a tie must hold.
        _toTick(2);
        _commit(alice, target, 100e18, false, "d");
        _commit(bob, target, 100e18, true, "a");

        _toReveal(2);
        _reveal(alice, target, 100e18, false, "d");
        _reveal(bob, target, 100e18, true, "a");

        _toResolve(2);
        battle.resolveTick(0);

        uint256 d = Rules.defensePower(
            uint128(Rules.powerOf(100e18)), battle.activeMembers(guildA), 2, 1, false
        );
        uint256 a =
            Rules.attackPower(uint128(Rules.powerOf(100e18)), battle.activeMembers(guildB), 0, 2);

        if (a > d) {
            assertEq(map.ownerOf(target), guildB, "A > D so it must fall");
        } else {
            assertEq(map.ownerOf(target), guildA, "A <= D so it must hold");
        }
    }

    /// @notice An undefended hex still cannot be taken by a zero-power attack.
    function test_zeroPowerNeverCaptures() public {
        _playClaimTick(1);
        uint16 target = _idAt(0, 0);

        _toTick(2);
        vm.prank(bob);
        vm.expectRevert(bytes("Battle: zero stake"));
        battle.reveal(bob, target, 0, true, "x");

        assertEq(map.ownerOf(target), guildA, "nothing happened, so nothing moved");
    }

    // ------------------------------------------------------------------ (3)

    /**
     * @notice A reveal costs exactly the committed stake plus the empire
     *         multiplier — a number the player can compute before committing.
     *
     * The multiplier depends only on the guild's hex count, which is public and
     * frozen for the whole reveal window, so the charge is knowable at commit
     * time. Nothing else can be taken.
     */
    function test_revealCostsExactlyTheCommittedAmountPlusTheKnownTax() public {
        _playClaimTick(1);

        uint16 target = _idAt(1, 0);
        uint128 stake = 250e18;

        _toTick(2);
        _commit(bob, target, stake, true, "s");

        uint256 held = map.guildHexCount(guildB);
        uint256 expected = Rules.expansionCost(stake, held, battle.empireExponent());

        uint256 before = battle.balanceOf(bob);
        _toReveal(2);
        _reveal(bob, target, stake, true, "s");
        uint256 spent = before - battle.balanceOf(bob);

        assertEq(spent, expected, "charge must equal the published formula, to the wei");
    }

    /// @notice A player cannot be charged twice for one commitment.
    function test_revealIsSingleUse() public {
        _playClaimTick(1);
        uint16 target = _idAt(1, 0);

        _toTick(2);
        _commit(bob, target, 100e18, true, "s");
        _toReveal(2);
        _reveal(bob, target, 100e18, true, "s");

        vm.expectRevert(bytes("Battle: already revealed"));
        _reveal(bob, target, 100e18, true, "s");
    }

    // ------------------------------------------------------------------ (4)

    /**
     * @notice The same tick, revealed in two different orders and resolved in
     *         two different batch shapes, lands on the identical state.
     */
    function test_transactionOrderCannotChangeTheOutcome() public {
        _playClaimTick(1);

        uint256 snap = vm.snapshotState();

        // Pass one: reveal defender first, resolve in a single batch.
        _stageTick2();
        _toReveal(2);
        _reveal(alice, _idAt(0, 0), 100e18, false, "d");
        _reveal(bob, _idAt(0, 0), 400e18, true, "a");
        _reveal(carol, _idAt(1, 0), 90e18, true, "c");
        _toResolve(2);
        battle.resolveTick(0);
        bytes32 first = _fingerprint();

        vm.revertToState(snap);

        // Pass two: reveal attackers first, and resolve one hex at a time.
        _stageTick2();
        _toReveal(2);
        _reveal(carol, _idAt(1, 0), 90e18, true, "c");
        _reveal(bob, _idAt(0, 0), 400e18, true, "a");
        _reveal(alice, _idAt(0, 0), 100e18, false, "d");
        _toResolve(2);
        battle.resolveTick(1);
        battle.resolveTick(1);
        battle.resolveTick(1);
        bytes32 second = _fingerprint();

        assertEq(first, second, "order of reveals and batch shape must not matter");
    }

    // -------------------------------------------------------------- fixtures

    function _stageTick2() private {
        _toTick(2);
        _commit(alice, _idAt(0, 0), 100e18, false, "d");
        _commit(bob, _idAt(0, 0), 400e18, true, "a");
        _commit(carol, _idAt(1, 0), 90e18, true, "c");
    }

    /// @dev Everything an observer could tell apart, in one hash.
    function _fingerprint() private view returns (bytes32 h) {
        uint256 n = map.hexCount();
        bytes memory acc = abi.encodePacked(battle.totalBurned());
        for (uint16 i = 0; i < n; i++) {
            acc = abi.encodePacked(acc, map.ownerOf(i), map.treasuryOf(i));
        }
        acc = abi.encodePacked(
            acc, battle.balanceOf(alice), battle.balanceOf(bob), battle.balanceOf(carol)
        );
        h = keccak256(acc);
    }

    /// @dev Guild A buys the centre; guild B buys a hex on the rim.
    function _playClaimTick(uint32 tick) private {
        _toTick(tick);
        _commit(alice, _idAt(0, 0), 1000e18, true, "c1");
        _commit(bob, _idAt(2, 0), 1000e18, true, "c2");

        _toReveal(tick);
        _reveal(alice, _idAt(0, 0), 1000e18, true, "c1");
        _reveal(bob, _idAt(2, 0), 1000e18, true, "c2");

        _toResolve(tick);
        battle.resolveTick(0);
    }

    function _playContestedTick(uint32 tick) private {
        _toTick(tick);
        _commit(alice, _idAt(0, 0), 200e18, false, "d1");
        _commit(bob, _idAt(1, 0), 300e18, true, "a1");

        _toReveal(tick);
        _reveal(alice, _idAt(0, 0), 200e18, false, "d1");
        _reveal(bob, _idAt(1, 0), 300e18, true, "a1");

        _toResolve(tick);
        battle.resolveTick(0);
    }
}
