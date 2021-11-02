import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";


const config: HardhatUserConfig = {
  solidity: "0.7.6",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/18c3ef00d59848658bd65f781b1b3aa0`,
      accounts: [`09267c6fbd4c912d91a06d3fbe72c6a4d749bbc7fd646fc2082f613dc5f6d1f1`]
    },
  },
};

export default config;
