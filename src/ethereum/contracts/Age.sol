// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Age {
    uint256 public age = 0;
    address public lastCaller;

    function getAge() public view returns (uint256) {
        return age;
    }

    function getLastCaller() public view returns (address) {
        return lastCaller;
    }

    function updateAge(uint256 num) public {
        lastCaller = msg.sender;
        age = num;
    }
}