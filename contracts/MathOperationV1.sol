// SPDX-License-Identifier: MIT
pragma solidity  0.7.6;

import "./StorageStructure.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract MathOperationV1 is StorageStructure {
    // using SafeMath for uint;

    modifier onlyOwner() {
        require (msg.sender == owner, "msg.sender is not an owner");
        _;
    }

    /**
     * @dev addition between a and b
     */
    function operation(uint _a, uint _b)  
        virtual
        public 
        returns (uint)
    {
        a = _a;
        b = _b;
        c = a + b;
        return c;
    }
    
    function addMember(string memory _name)
        virtual
        external
    {
        members.push(
            Member({
                memberAdr: msg.sender,
                name: _name
            })
        );
    }
}