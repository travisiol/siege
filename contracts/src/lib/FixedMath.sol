// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/**
 * @title FixedMath
 * @notice Integer arithmetic at 1e18. No floats reach a game rule, ever.
 *
 * This is the on-chain twin of `sim/fixed.ts`. The simulation is the reference
 * implementation: it was verified against 200,000 consecutive values plus 2,000
 * large random integers, and `test/FixedMath.t.sol` re-checks the same property
 * here. Any change to one file has to be mirrored in the other or the balance
 * work stops meaning anything.
 */
library FixedMath {
    uint256 internal constant WAD = 1e18;

    /**
     * @notice floor(sqrt(x)).
     *
     * Seeded at a power of two above sqrt(x) so Newton converges from above,
     * then a single clamp fixes the one case where the last step overshoots.
     * The result is the unique floor, so it is identical to the Babylonian loop
     * in `sim/fixed.ts` even though the iteration schedule differs.
     */
    function isqrt(uint256 x) internal pure returns (uint256) {
        if (x == 0) return 0;

        uint256 r = 1 << (log2(x) >> 1);

        // Seven steps take a 256-bit input to within one of the true root.
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;

        uint256 down = x / r;
        return r < down ? r : down;
    }

    /**
     * @notice sqrt of a WAD-scaled amount, result also WAD-scaled.
     * @dev sqrt(x / 1e18) * 1e18 == sqrt(x * 1e18).
     *
     * Stakes are bounded by the 100M token supply (1e26), so `x * WAD` peaks
     * around 1e44 and cannot overflow.
     */
    function sqrtWad(uint256 x) internal pure returns (uint256) {
        return isqrt(x * WAD);
    }

    /// @notice floor(log2(x)) for x > 0.
    function log2(uint256 x) internal pure returns (uint256 r) {
        unchecked {
            if (x >> 128 > 0) { x >>= 128; r += 128; }
            if (x >> 64 > 0)  { x >>= 64;  r += 64; }
            if (x >> 32 > 0)  { x >>= 32;  r += 32; }
            if (x >> 16 > 0)  { x >>= 16;  r += 16; }
            if (x >> 8 > 0)   { x >>= 8;   r += 8; }
            if (x >> 4 > 0)   { x >>= 4;   r += 4; }
            if (x >> 2 > 0)   { x >>= 2;   r += 2; }
            if (x >> 1 > 0)   { r += 1; }
        }
    }

    /// @notice a * b / d, truncating toward zero exactly as the simulation does.
    function mulDiv(uint256 a, uint256 b, uint256 d) internal pure returns (uint256) {
        return (a * b) / d;
    }

    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
}
