import { Contract } from "@ethersproject/contracts";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Signer } from "ethers";

 
let MathOperation;
let mathOperation: Contract;

describe('MathOperationV1 (Proxy)', function () {
    let signer1: Signer
    beforeEach(async function () {
        MathOperation = await ethers.getContractFactory("MathOperationV1");
        mathOperation = await upgrades.deployProxy(MathOperation, [2, 8], {initializer: 'operation'});
        await mathOperation.deployed();
    });
     
    it('operation adds two numbers and changes storage', async function () {
        // await mathOperation.operation(2, 7);
        expect((await mathOperation.c()).toString()).to.equal('10');
    });
    
    it('adds a member to Members struct', async() => {
        [signer1] = await ethers.getSigners();
        let signer1Address = await signer1.getAddress();
        let mathOperationAsSigner1 = mathOperation.connect(signer1);

        await mathOperationAsSigner1.addMember("Zeynab");

        let members = await mathOperation.members(0);
    
        expect((members.name)).to.equal("Zeynab");
    
        expect((members.memberAdr)).to.equal(signer1Address);
    });
});