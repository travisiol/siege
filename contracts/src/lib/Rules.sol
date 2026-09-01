// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {FixedMath} from "./FixedMath.sol";

/**
 * @title Rules
 * @notice Every formula in the game, in one place, in integers.
 *
 * The on-chain twin of `sim/rules.ts`. Deliberately free of storage so the
 * balance simulation and the chain compute the same numbers from the same
 * inputs and a differential test can compare them directly.
 *
 * The empire exponent is NOT hardcoded. The simulation shows the square burns
 * roughly 63% of staked capital per season on a fixed supply, which is not
 * survivable; the curve is a live design decision, so it arrives as a parameter
 * and Battle.sol carries it in storage where governance can retune it.
 */
library Rules {
    using FixedMath for uint256;

    uint256 internal constant COHESION_MIN = 100;
    uint256 internal constant COHESION_CAP_MEMBERS = 25;
    uint256 internal constant FORT_MIN = 100;
    uint256 internal constant FORT_CAP_TICKS = 20;
    uint256 internal constant REBELLION_TICK = 32;
    uint256 internal constant REBELLION_HEX_LIMIT = 3;
    uint256 internal constant REBELLION_BONUS_X100 = 125;
    uint256 internal constant UPKEEP_PCT = 2;
    uint256 internal constant NO_DEFENSE_LAPSE_TICKS = 30;

    /// @notice 10% to the winner, 10% burned. The 20% of the brief, split.
    uint256 internal constant PENALTY_TO_WINNER_PCT = 10;
    uint256 internal constant PENALTY_BURN_PCT = 10;

    /**
     * @notice Raw power is the SUM of roots, not the root of the sum.
     * @dev Accumulated one reveal at a time, so callers add `sqrtWad(stake)`
     *      per contributor rather than calling this with an array. Splitting a
     *      stake across N wallets therefore multiplies power by sqrt(N) — a
     *      deliberate property of the design, not an oversight.
     */
    function powerOf(uint256 stake) internal pure returns (uint256) {
        return FixedMath.sqrtWad(stake);
    }

    /// @notice cohesion = 100 + 2 * min(activeMembers, 25) -> 100..150
    function cohesion(uint256 activeMembers) internal pure returns (uint256) {
        return COHESION_MIN + 2 * FixedMath.min(activeMembers, COHESION_CAP_MEMBERS);
    }

    /// @notice fortification = 100 + 5 * min(tick - heldSince, 20) -> 100..200
    function fortification(uint256 currentTick, uint256 heldSinceTick)
        internal
        pure
        returns (uint256)
    {
        uint256 held = currentTick > heldSinceTick ? currentTick - heldSinceTick : 0;
        return FORT_MIN + 5 * FixedMath.min(held, FORT_CAP_TICKS);
    }

    /**
     * @notice A = rawPower * cohesion / 100, +25% for a cornered guild.
     * @param rawPower Sum of sqrt(stake) over the attacking side.
     */
    function attackPower(
        uint256 rawPower,
        uint256 activeMembers,
        uint256 guildHexCount,
        uint256 currentTick
    ) internal pure returns (uint256 a) {
        a = (rawPower * cohesion(activeMembers)) / 100;
        if (guildHexCount < REBELLION_HEX_LIMIT && currentTick > REBELLION_TICK) {
            a = (a * REBELLION_BONUS_X100) / 100;
        }
    }

    /// @notice D = rawPower * cohesion / 100 * fortification / 100
    function defensePower(
        uint256 rawPower,
        uint256 activeMembers,
        uint256 currentTick,
        uint256 heldSinceTick,
        bool fortificationLapsed
    ) internal pure returns (uint256) {
        uint256 base = (rawPower * cohesion(activeMembers)) / 100;
        uint256 fort = fortificationLapsed ? FORT_MIN : fortification(currentTick, heldSinceTick);
        return (base * fort) / 100;
    }

    /**
     * @notice The empire multiplier, x100.
     * @param exponentNumerator Curve selector. 200 reproduces the brief's
     *        `hexCount^2`; 150 gives `hexCount^1.5`; 100 gives linear growth.
     * @dev Computed as `100 + hexCount^(exponentNumerator/100)`, done in
     *      integers: h^1.5 is `h * isqrt(h)`, h^2 is `h * h`, h^1 is `h`.
     *      Only these three curves are supported, because a general fractional
     *      power in integer arithmetic is a precision trap nobody needs here.
     */
    function empireMultiplierX100(uint256 hexCount, uint256 exponentNumerator)
        internal
        pure
        returns (uint256)
    {
        if (hexCount == 0) return 100;
        if (exponentNumerator == 200) return 100 + hexCount * hexCount;
        if (exponentNumerator == 150) return 100 + hexCount * FixedMath.isqrt(hexCount);
        if (exponentNumerator == 100) return 100 + hexCount;
        revert("Rules: unsupported exponent");
    }

    /**
     * @notice cost = stake * (100 + hexCount^e) / 100. The surcharge is burned.
     *
     * Applies to attacking AND to claiming empty ground. The brief taxed only
     * attacks, which left expansion onto neutral hexes free at any size — the
     * hole a lone wallet drove 216 hexes through in the balance simulation.
     */
    function expansionCost(uint256 stake, uint256 hexCount, uint256 exponentNumerator)
        internal
        pure
        returns (uint256)
    {
        return (stake * empireMultiplierX100(hexCount, exponentNumerator)) / 100;
    }

    /// @notice Base claim price of a neutral hex: tier * 100 tokens, before the empire tax.
    function baseClaimCost(uint256 tier) internal pure returns (uint256) {
        return tier * 100 * FixedMath.WAD;
    }

    /// @notice The attacker must beat the defender strictly; a tie holds the ground.
    function attackerWins(uint256 a, uint256 d) internal pure returns (bool) {
        return a > d;
    }

    /// @notice Yield accrued by one hex in one tick, from the pre-funded pool.
    function tickYield(uint256 tier, uint256 yieldUnit) internal pure returns (uint256) {
        if (tier == 3) return 8 * yieldUnit;
        if (tier == 2) return 3 * yieldUnit;
        return yieldUnit;
    }
}
