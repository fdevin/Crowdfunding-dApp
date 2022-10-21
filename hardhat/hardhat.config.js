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
      },
    ],
  },
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    matic: {
      url: "https://polygon-mumbai.infura.io/v3/c48ae9943075418d848c97fa094d6633",
      accounts: [
        "4218db7f0ef2b4763f5de5ea69d3404811a685969c11f0c66519b05a3a52dc77",
      ],
      gas: 4612388,
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai:
        process.env.POLYGONSCAN_API_KEY || "PPGQ155U1Y4D1M4F7N72AE48XKSCSHPXZN",
    },
  },
};
