/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("dotenv").config();
 require("@nomiclabs/hardhat-ethers");
 require("@nomiclabs/hardhat-etherscan");
 
 module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.15",
      },
      {
        version: "0.8.15",
        settings: {},
      }
    ]
  },
  paths: {
    artifacts:'./src/artifacts'
  },
  networks:{
    hardhat:{
      chainId: 1337
    },
    matic:{
      url:"https://polygon-mumbai.g.alchemy.com/v2/AUoY_TeYT5Sxja2sRk2oPeJXu7fn96Jp",
      accounts: ["4218db7f0ef2b4763f5de5ea69d3404811a685969c11f0c66519b05a3a52dc77"],
      gasPrice: 10000000000,
      gas: 150000000,
    },
  
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
    },
  },
 };