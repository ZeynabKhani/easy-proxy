import hre from "hardhat";

async function main() {

  const MathOperationV2 = await hre.ethers.getContractFactory("MathOperationV2");
  console.log("Deploying MathOperationV2...");
  let mathOperationV2 = await hre.upgrades.upgradeProxy('0x72532567A0efBa092e9aC3daFaAF250B05B853d1', MathOperationV2)

  console.log("Contract is successfuly upgraded!", mathOperationV2.address);
}


main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
