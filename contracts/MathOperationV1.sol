// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

import "./StorageStructure.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract MathOperationV1 is StorageStructure {
    using SafeMath for uint;

    modifier onlyOwner() {
        require (msg.sender == owner);
        _;
    }

    /**
     * @dev addition between a and b
     */
    function operation(uint _a, uint _b)  
        public 
        virtual
        onlyOwner 
        returns (uint)
    {
        a = _a;
        b = _b;
        c = a.add(b);
        return c;
    }
}