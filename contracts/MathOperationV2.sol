// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// import "./MathOperationV2.sol";
import "./StorageStructure.sol";

contract MathOperationV2 is StorageStructure  {
    using SafeMath for uint;
    
    modifier onlyOwner() {
        require (msg.sender == owner);
        _;
    }

    /**
     * @dev multiplication between a and b
     */
    function operation(uint _a, uint _b) 
        public onlyOwner 
        returns (uint)
    {
        a = _a;
        b = _b;
        c = a.mul(b);
        return c;
    }
}