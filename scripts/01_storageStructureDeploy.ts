import { ethers } from "hardhat";

async function main() {
  const StorageStructure = await ethers.getContractFactory("StorageStructure");
  const storageStructure = await StorageStructure.deploy();

  await storageStructure.deployed();

  console.log("StorageStructure deployed to:", storageStructure.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
