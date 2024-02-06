import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import * as dotenv from "dotenv";
dotenv.config();

const {
  POLYGONSCAN_API_KEY,
  POLYGON_URL,
  POLYGON_PRIVATE_KEY,
  MUMBAI_URL,
  MUMBAI_PRIVATE_KEY
} = process.env;

if (
  !POLYGONSCAN_API_KEY || 
  !POLYGON_URL || 
  !POLYGON_PRIVATE_KEY || 
  !MUMBAI_URL || 
  !MUMBAI_PRIVATE_KEY
) {
  console.error("Please make sure your .env file is properly configured");
  process.exit(1);
}

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
      url: POLYGON_URL,
      accounts: [`${POLYGON_PRIVATE_KEY}`],
    },
    mumbai: {
      url: MUMBAI_URL,
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
