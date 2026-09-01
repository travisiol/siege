// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Harness, Asserts} from "./Harness.sol";
import {FixedMath} from "../src/lib/FixedMath.sol";
import {Rules} from "../src/lib/Rules.sol";

/// @notice The maths, checked against the brief's own worked examples.
contract RulesTest is Asserts {
    function test_isqrt_isExactFloor() public pure {
        uint256[8] memory xs =
            [uint256(0), 1, 2, 3, 4, 99, 100, 123456789012345678901234567890];
        for (uint256 i = 0; i < xs.length; i++) {
            uint256 r = FixedMath.isqrt(xs[i]);
            assertTrue(r * r <= xs[i], "root squared must not exceed x");
            if (r < type(uint128).max) {
                assertTrue((r + 1) * (r + 1) > xs[i], "root must be the floor");
            }
        }
    }

    function testFuzz_isqrt_isExactFloor(uint256 x) public pure {
        x = x % (2 ** 200); // keep (r+1)^2 inside 256 bits
        uint256 r = FixedMath.isqrt(x);
        assertTrue(r * r <= x, "root squared must not exceed x");
        assertTrue((r + 1) * (r + 1) > x, "root must be the floor");
    }

    function test_sqrtWad_matchesTheSimulation() public pure {
        assertEq(FixedMath.sqrtWad(100e18), 10e18, "sqrt(100) = 10");
        assertEq(FixedMath.sqrtWad(10000e18), 100e18, "sqrt(10000) = 100");
    }

    /// @notice Power is the SUM of roots, so splitting a stake multiplies it by sqrt(n).
    function test_powerIsSumOfRootsNotRootOfSum() public pure {
        uint256 whole = Rules.powerOf(1000e18);
        uint256 split;
        for (uint256 i = 0; i < 4; i++) split += Rules.powerOf(250e18);
        assertEq(split, 2 * whole, "four equal parts weigh exactly twice one whole");
    }

    function test_cohesionBounds() public pure {
        assertEq(Rules.cohesion(0), 100, "no active member");
        assertEq(Rules.cohesion(25), 150, "twenty-five");
        assertEq(Rules.cohesion(9999), 150, "caps at 150");
    }

    function test_fortificationBounds() public pure {
        assertEq(Rules.fortification(10, 10), 100, "freshly taken");
        assertEq(Rules.fortification(30, 10), 200, "twenty ticks held");
        assertEq(Rules.fortification(500, 10), 200, "caps at 200");
    }

    /// @notice The three empire-tax examples written into the brief.
    function test_empireTax_briefExamples() public pure {
        assertEq(Rules.empireMultiplierX100(10, 200), 200, "10 hexes -> x2");
        assertEq(Rules.empireMultiplierX100(20, 200), 500, "20 hexes -> x5");
        assertEq(Rules.empireMultiplierX100(30, 200), 1000, "30 hexes -> x10");
        assertEq(Rules.expansionCost(100e18, 10, 200), 200e18, "cost doubles at ten hexes");
    }

    /// @notice The gentler curves exist because the square burns the economy.
    function test_empireTax_alternateCurvesAreCheaper() public pure {
        uint256 square = Rules.empireMultiplierX100(30, 200);
        uint256 threeHalves = Rules.empireMultiplierX100(30, 150);
        uint256 linear = Rules.empireMultiplierX100(30, 100);
        assertTrue(threeHalves < square, "h^1.5 must cost less than h^2");
        assertTrue(linear < threeHalves, "linear must cost less than h^1.5");
    }

    function test_tieHoldsTheGround() public pure {
        assertTrue(!Rules.attackerWins(100, 100), "a tie is not a win");
        assertTrue(Rules.attackerWins(101, 100), "one wei over is");
    }

    function test_rebellionBonusStartsAfterTick32() public pure {
        uint256 without = Rules.attackPower(1000, 0, 2, 32);
        uint256 with_ = Rules.attackPower(1000, 0, 2, 33);
        assertEq((without * 125) / 100, with_, "+25% from tick 33");
    }
}

/// @notice The commit/reveal machinery, including the parts the brief could not specify.
contract BattleTest is Harness {
    function setUp() public {
        _setUpWorld(200);
    }

    function test_commitLocksOnlyTheBond() public {
        _toTick(1);
        uint256 before = battle.balanceOf(alice);
        _commit(alice, _idAt(0, 0), 5000e18, true, "s");

        assertEq(battle.balanceOf(alice), before, "commit must not spend the stake");
        assertEq(battle.lockedOf(alice), BOND, "only the bond is locked");
    }

    /// @notice Anyone holding the salt can post the reveal for a sleeping player.
    function test_anyoneCanRelayAReveal() public {
        _toTick(1);
        _commit(alice, _idAt(0, 0), 1000e18, true, "s");

        _toReveal(1);
        vm.prank(carol); // a relayer, not the player
        battle.reveal(alice, _idAt(0, 0), 1000e18, true, "s");

        _toResolve(1);
        battle.resolveTick(0);
        assertEq(map.ownerOf(_idAt(0, 0)), guildA, "the relayed order still counted");
    }

    /// @notice A relayer cannot point a reveal at itself: the player is in the hash.
    function test_relayerCannotRedirect() public {
        _toTick(1);
        _commit(alice, _idAt(0, 0), 1000e18, true, "s");

        _toReveal(1);
        vm.expectRevert(bytes("Battle: no commitment this tick"));
        battle.reveal(carol, _idAt(0, 0), 1000e18, true, "s");
    }

    /**
     * @notice A missed reveal costs the bond, and only the bond.
     *
     * This is the whole reason the bond exists: the contract never learns the
     * hidden amount, so it cannot burn a slice of it. Losing a salt therefore
     * costs a known, small, capped sum instead of the entire intended stake.
     */
    function test_missedRevealBurnsTenPercentOfTheBondAndNothingElse() public {
        _toTick(1);
        uint256 before = battle.balanceOf(alice);
        bytes32 h = _hash(_idAt(0, 0), 50_000e18, true, "lost", alice);
        vm.prank(alice);
        battle.commit(h);

        _toTick(2); // the window closed without a reveal
        battle.slashUnrevealed(alice, h);

        assertEq(battle.lockedOf(alice), 0, "the bond is released");
        assertEq(battle.balanceOf(alice), before - (BOND / 10), "only a tenth of the bond burns");
        assertEq(battle.totalBurned(), BOND / 10, "and that tenth is destroyed");
    }

    function test_cannotCommitMoreBondsThanBalance() public {
        _toTick(1);
        vm.startPrank(alice);
        battle.withdraw(battle.freeBalance(alice) - BOND);
        battle.commit(_hash(_idAt(0, 0), 1e18, true, "a", alice));
        vm.expectRevert(bytes("Battle: bond exceeds balance"));
        battle.commit(_hash(_idAt(1, 0), 1e18, true, "b", alice));
        vm.stopPrank();
    }

    function test_refugeIsUnattackable() public {
        _toTick(1);
        _commit(alice, _idAt(0, 0), 1000e18, true, "c");
        _toReveal(1);
        _reveal(alice, _idAt(0, 0), 1000e18, true, "c");
        _toResolve(1);
        battle.resolveTick(0);

        // The first hex a guild takes becomes its refuge.
        _toTick(2);
        _commit(bob, _idAt(0, 0), 9000e18, true, "x");
        _toReveal(2);
        vm.expectRevert(bytes("Battle: refuge"));
        _reveal(bob, _idAt(0, 0), 9000e18, true, "x");
    }

    function test_cannotClaimGroundYouCannotReach() public {
        _toTick(1);
        _commit(alice, _idAt(0, 0), 1000e18, true, "c");
        _toReveal(1);
        // A radius-2 centre is not on the rim, so a guild with no ground cannot take it.
        vm.expectRevert(bytes("Battle: not reachable"));
        _reveal(alice, _idAt(0, 0), 1000e18, true, "c");
    }

    function test_claimCostCarriesTheEmpireMultiplier() public pure {
        uint256 base = Rules.baseClaimCost(1);
        assertEq(
            Rules.expansionCost(base, 0, 200), base, "a guild with no ground pays the base price"
        );
        assertTrue(
            Rules.expansionCost(base, 20, 200) == base * 5,
            "twenty hexes in, the same empty hex costs five times as much"
        );
    }
}
