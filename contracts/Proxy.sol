// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

import "./StorageStructure.sol";

contract Proxy is StorageStructure {
    
    modifier onlyOwner() {
        require (msg.sender == owner);
        _;
    }
    
    /**
     * @dev constructor that sets the owner address
     */
    constructor() public {
        owner = msg.sender;
    }
    
    /**
     * @dev Upgrades the mathOperation address
     * @param _newMathOperation address of the new mathOperation
     */
    function upgradeTo(address _newMathOperation) 
        external onlyOwner 
    {
        require(mathOperation != _newMathOperation);
        _setMathOperation(_newMathOperation);
    }
    
    /**
     * @dev Fallback function allowing to perform a delegatecall 
     * to the given implementation. This function will return 
     * whatever the implementation call returns
     */
    fallback () payable public {
        address opr = mathOperation;
        require(opr != address(0));
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize)
            let result := delegatecall(gas, opr, ptr, calldatasize, 0, 0)
            let size := returndatasize
            returndatacopy(ptr, 0, size)
            
            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }
    
    /**
     * @dev Sets the address of the current implementation
     * @param _newOpr address of the new mathOperation
     */
    function _setImplementation(address _newOpr) internal {
        mathOperation = _newOpr;
    }
}