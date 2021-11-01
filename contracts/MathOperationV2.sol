// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./MathOperationV1.sol";

contract MathOperationV2 is MathOperationV1  {
    using SafeMath for uint;
    
    /**
     * @dev multiplication between a and b
     */
    function operation(uint _a, uint _b) 
        override
        public onlyOwner 
        returns (uint)
    {
        a = _a;
        b = _b;
        c = a.mul(b);
        return c;
    }
}