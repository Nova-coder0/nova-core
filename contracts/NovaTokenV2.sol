// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/// @title NovaTokenV2
/// @notice Fixed-supply NOVA token with no mint, pause, tax, blacklist, or owner controls.
contract NovaTokenV2 is ERC20, ERC20Burnable, ERC20Permit {
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 * 10 ** 18;

    error ZeroTreasury();

    constructor(address treasury) ERC20("NovaToken", "NOVA") ERC20Permit("NovaToken") {
        if (treasury == address(0)) {
            revert ZeroTreasury();
        }

        _mint(treasury, INITIAL_SUPPLY);
    }
}
