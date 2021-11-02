import hre from "hardhat";

async function main() {

  const MathOperationV1 = await hre.ethers.getContractFactory("MathOperationV1");
  console.log("Deploying MathOperationV1...");
  const mathOperationV1 = await hre.upgrades.deployProxy(
    MathOperationV1, [3, 6], 
    { initializer: 'operation'}
  )

  console.log("MathOperationV1 deployed to:", mathOperationV1.address);
}


main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
