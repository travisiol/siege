// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {HexwarToken} from "../src/HexwarToken.sol";
import {Map} from "../src/Map.sol";
import {Battle} from "../src/Battle.sol";
import {Season} from "../src/Season.sol";

/// @dev The cheatcodes this script needs, declared locally so it type-checks
///      without Foundry installed. `forge script` supplies the same interface.
interface VmDeploy {
    function startBroadcast() external;
    function stopBroadcast() external;
    function envUint(string calldata) external view returns (uint256);
    function envAddress(string calldata) external view returns (address);
    function readFile(string calldata) external view returns (string memory);
    function parseJsonIntArray(string calldata, string calldata)
        external
        pure
        returns (int256[] memory);
    function parseJsonUintArray(string calldata, string calldata)
        external
        pure
        returns (uint256[] memory);
}

/**
 * @title Deploy
 * @notice Puts the four contracts on chain and seeds the real 547-hex board.
 *
 * The board comes from `contracts/seed/hexes.json`, which `npm run sim:seed`
 * writes out of the same generator the simulation and the site use. Seeding is
 * batched because 547 hexes will not fit in one transaction, and `seal()` at the
 * end makes the tiers permanent.
 *
 *   forge script contracts/script/Deploy.s.sol --rpc-url $RPC --broadcast
 */
contract Deploy {
    VmDeploy internal constant vm =
        VmDeploy(address(uint160(uint256(keccak256("hevm cheat code")))));

    uint256 internal constant SEED_BATCH = 64;

    function run() external {
        address treasury = vm.envAddress("HEXWAR_TREASURY");
        uint256 seasonStart = vm.envUint("HEXWAR_SEASON_START");
        uint256 empireExponent = vm.envUint("HEXWAR_EMPIRE_EXPONENT");
        uint256 bond = vm.envUint("HEXWAR_COMMIT_BOND");
        uint256 yieldUnit = vm.envUint("HEXWAR_YIELD_UNIT");

        string memory json = vm.readFile("contracts/seed/hexes.json");
        int256[] memory q = vm.parseJsonIntArray(json, ".q");
        int256[] memory r = vm.parseJsonIntArray(json, ".r");
        uint256[] memory tier = vm.parseJsonUintArray(json, ".tier");

        vm.startBroadcast();

        HexwarToken token = new HexwarToken(treasury);
        Map map = new Map("ipfs://hexwar/{id}.json");
        Season season = new Season(token);
        Battle battle = new Battle(
            token, map, seasonStart, empireExponent, uint128(bond), uint128(yieldUnit)
        );

        map.setBattle(address(battle));
        season.setBattle(address(battle));
        battle.setSeason(address(season));

        for (uint256 offset = 0; offset < q.length; offset += SEED_BATCH) {
            uint256 n = q.length - offset;
            if (n > SEED_BATCH) n = SEED_BATCH;

            int16[] memory bq = new int16[](n);
            int16[] memory br = new int16[](n);
            uint8[] memory bt = new uint8[](n);
            for (uint256 i = 0; i < n; i++) {
                bq[i] = int16(q[offset + i]);
                br[i] = int16(r[offset + i]);
                bt[i] = uint8(tier[offset + i]);
            }
            map.seedHexes(bq, br, bt);
        }

        // Locks the board and asserts that no two tier 3 hexes touch.
        map.seal();

        vm.stopBroadcast();
    }
}
