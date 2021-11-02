// SPDX-License-Identifier: MIT
pragma solidity  0.7.6;

contract StorageStructure {
    
    struct Member {
        address memberAdr;
        string name;
    }
    
    address public mathOperation;
    address public owner;
    
    uint public a;
    uint public b;
    uint public c;
    
    Member[] public members;
}