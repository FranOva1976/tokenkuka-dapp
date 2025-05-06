// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Kuka is ERC20, Ownable, Pausable {
    constructor() ERC20("Kuka", "KUKA") {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // 1 millón de tokens iniciales
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override
    {
        require(!paused(), "TokenKuka: transfer while paused");
        super._beforeTokenTransfer(from, to, amount);
    }
}
