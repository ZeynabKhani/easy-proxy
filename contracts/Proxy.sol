// // SPDX-License-Identifier: MIT
// pragma solidity  0.7.6;

// import "./StorageStructure.sol";

// contract Proxy is StorageStructure {
    
//     modifier onlyOwner() {
//         require (msg.sender == owner, "msg.sender is not an owner");
//         _;
//     }
    
//     /**
//      * @dev constructor that sets the owner address
//      */
//     constructor() public {
//         owner = msg.sender;
//     }
    
//     /**
//      * @dev Upgrades the mathOperation address
//      * @param _newMathOperation address of the new mathOperation
//      */
//     function upgradeTo(address _newMathOperation) 
//         external onlyOwner 
//     {
//         require(mathOperation != _newMathOperation);
//         _setMathOperation(_newMathOperation);
//     }
    
//     /**
//      * @dev Fallback function allowing to perform a delegatecall 
//      * to the given implementation. This function will return 
//      * whatever the implementation call returns
//      */
//     fallback () external payable  {
//         address opr = mathOperation;
//         require(opr != address(0));
//         assembly {
//             calldatacopy(0, 0, calldatasize())
//             let result := delegatecall(gas(), opr, 0, calldatasize(), 0, 0)
//             returndatacopy(0, 0, returndatasize())
//             switch result
//             case 0 { revert(0, returndatasize()) }
//             default { return(0, returndatasize()) }
//         }
//     }
    
//     /**
//      * @dev Sets the address of the current implementation
//      * @param _newOpr address of the new mathOperation
//      */
//     function _setMathOperation(address _newOpr) internal {
//         mathOperation = _newOpr;
//     }
// }