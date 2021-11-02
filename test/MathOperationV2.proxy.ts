import { Contract } from "@ethersproject/contracts";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Signer } from "ethers";
import { Address } from "hardhat-deploy/dist/types"

 
let MathOperationV1;
let mathOperationV1: Contract;
let MathOperationV2;
let mathOperationV2: Contract;

let signer1: Signer
let signer2: Signer
let signer1Address: Address
let signer2Address: Address

before('Deploy upgradable MathOperationV1', async () => {
    [ signer1, signer2 ] = await ethers.getSigners();
    signer1Address = await signer1.getAddress();
    signer2Address = await signer2.getAddress();

    
})

describe('MathOperationV1 (Proxy)', function () {
    before('Deploy MathOperationV1', async() => {
        MathOperationV1 = await ethers.getContractFactory("MathOperationV1");
        mathOperationV1 = await upgrades.deployProxy(
            MathOperationV1, 
            [2, 8], 
            {initializer: 'operation'}
        );
    })

    it('operation adds two numbers and changes storage', async function () {
        expect((await mathOperationV1.c()).toString()).to.equal('10');

        let mathOperationV1AsSigner1 = mathOperationV1.connect(signer1);
        await mathOperationV1AsSigner1.operation(3, 6);
        expect((await mathOperationV1.c()).toString()).to.equal('9');
    });
    
    it('adds a member to Members struct', async() => {
        let mathOperationV1AsSigner1 = mathOperationV1.connect(signer1);

        await mathOperationV1AsSigner1.addMember("Zeynab");

        let members = await mathOperationV1.members(0);
    
        expect((members.name)).to.equal("Zeynab");
    
        expect((members.memberAdr)).to.equal(signer1Address);
    });
});

describe('MathOperationV2 (Proxy)', async () => {
    before('Upgrades MathOperationV1 to MathOperationV2', async() =>{
        MathOperationV2 = await ethers.getContractFactory("MathOperationV2");
        mathOperationV2 = await upgrades.upgradeProxy(
            mathOperationV1.address, 
            MathOperationV2
        );
    })
     
    it('operation multiplies two numbers and changes storage', async function () {
        
        let mathOperationV2AsSigner2 = mathOperationV2.connect(signer2);
        await mathOperationV2AsSigner2.operation(5, 9);
        expect((await mathOperationV2.c()).toString()).to.equal('45');

        await mathOperationV2AsSigner2.addMember("Mahdi");
        let members = await mathOperationV2.members(1);
        expect((members.name)).to.equal("Mahdi");
        expect((members.memberAdr)).to.equal(signer2Address);

        // To make sure the Members Struct is appended and not overwritten
        members = await mathOperationV2.members(0);
        expect((members.name)).to.equal("Zeynab");
        expect((members.memberAdr)).to.equal(signer1Address);
    });
});