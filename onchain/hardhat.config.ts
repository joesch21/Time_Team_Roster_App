import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const OPBNB = process.env.OPBNB_RPC_URL || "";
const OPBNB_TEST = process.env.OPBNB_TESTNET_RPC_URL || "";
const DEPLOYER_KEY = process.env.DEPLOYER_PRIVATE_KEY || ""; // 0x-prefixed

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: { optimizer: { enabled: true, runs: 200 } }
  },
  paths: {
    sources: "../contracts"
  },
  networks: {
    // opBNB mainnet
    opbnb: {
      url: OPBNB,
      accounts: DEPLOYER_KEY ? [DEPLOYER_KEY] : []
    },
    // opBNB testnet
    opbnbTestnet: {
      url: OPBNB_TEST,
      accounts: DEPLOYER_KEY ? [DEPLOYER_KEY] : []
    }
  }
};

export default config;

