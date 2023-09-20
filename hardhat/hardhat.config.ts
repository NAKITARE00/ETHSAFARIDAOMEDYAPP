import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();
const fs = require('fs');
const LINEA_TESTNET_PRIVATE_KEY = fs.readFileSync(".lineasecret").toString()
const BASE_GOERLI_TESTNET_PRIVATE_KEY  = fs.readFileSync(".secret").toString()
const { INFURA_API_KEY } = process.env;


const config: HardhatUserConfig = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      
    },
    /* for mainnet
     'base-mainnet': {
      url: 'https://mainnet.base.org',
      accounts: [process.env.WALLET_KEY as string],
      gasPrice: 1000000000,
     },*/

    // for testnet
    // 'base-goerli': {
    //   url: 'https://goerli.base.org',
    //   accounts: [BASE_GOERLI_TESTNET_PRIVATE_KEY],
    //   gasPrice: 1000000000,
    // },
    
    // linea_mainnet: {
    //   url: `https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    //   accounts: [PRIVATE_KEY],
    // },

    linea_testnet: {
      url: `https://linea-goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [LINEA_TESTNET_PRIVATE_KEY],
    },
   
    
  },
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './src/contracts',
    artifacts: './src/abis',
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;