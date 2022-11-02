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
      // INFURA_URL
      url: "https://polygon-mumbai.infura.io/v3/18e0637774c34939b40c46b18b41d9af",
      accounts: [
        // TODO: Add your wallet private key.
        "",
      ],
      gasLimit: 4612388,
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
