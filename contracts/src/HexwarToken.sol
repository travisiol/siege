// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/**
 * @title HexwarToken
 * @notice $HEXWAR. Fixed supply, minted once at deployment, never again.
 *
 * There is no mint function and no owner. The entire supply exists after the
 * constructor and the only way the number goes is down, through `burn`.
 *
 * This matters because the season pool is pre-funded rather than emitted: the
 * game pays out of a pot someone filled, not out of new tokens. Anything that
 * could mint would quietly turn every balance figure on the site into a promise
 * instead of a fact.
 */
contract HexwarToken is ERC20, ERC20Burnable {
    uint256 public constant MAX_SUPPLY = 100_000_000e18;

    constructor(address treasury) ERC20("Hexwar", "HEXWAR") {
        _mint(treasury, MAX_SUPPLY);
    }
}
