import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import * as dotenv from "dotenv";
dotenv.config();

const {
  POLYGONSCAN_API_KEY,
  POLYGON_API_KEY,
  POLYGON_PRIVATE_KEY,
  MUMBAI_API_KEY,
  MUMBAI_PRIVATE_KEY
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${POLYGON_API_KEY}`,
      accounts: [`${POLYGON_PRIVATE_KEY}`],
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_API_KEY}`,
      accounts: [`${MUMBAI_PRIVATE_KEY}`],
    },
    hardhat: {
      chainId: 31337,
      initialBaseFeePerGas: 0,
    },
  },
  etherscan: {
    apiKey: {
      polygon: `${POLYGONSCAN_API_KEY}`,
      polygonMumbai: `${POLYGONSCAN_API_KEY}`,
    }
  },
  contractSizer: {
    runOnCompile: true,
    strict: true,
    only: ["Escrow"],
  }
};

export default config;
