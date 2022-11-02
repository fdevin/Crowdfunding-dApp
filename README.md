# ARSMUSE

Project forked from https://github.com/kaymomin/Crowdfunding-dApp. 

## The Tech Stack

- Smart Contract Language: Solidity
- Smart Contract Deploy and Verify Scripts: Javascript
- Smart Contract Development Environment: [Hardhat]         tps://hardhat.org/)
- Frontend Language: React - TypeScript
- Wallet Connect: [Rainbowkit](https://www.rainbowkit.com/)
- Interacting with Contract through Frontend: [Wagmi](https://wagmi.sh/)

## Accounts needed for this project to work and the given urls to retrieve those values:
# Api Keys for hardhat.config.js ( Contract Preparations )

1. **Infura Provider** — We need to create our api keys to be able to see information related to web3. The url changes for testnet and mainet - For more details go to https://infura.io/. We need to add this url to our hardhat.config.js under /hardhat folder.

2. **Polygon Scan** — We need to validate our contracts created in Testnet/Mainnat. This step is not mandatory but it gives trust if the deployer contract is verified. We need to add this under hardhat.config.js - https://polygonscan.com/apis

3. **Deployer private key** — We need to include our private key to deploy the contract(This is for the contrac deployment in the /hardhat/ folder. This key shouldn't be stored anywhere since it has full access to the wallet). Remember that this private key should not be shared nor stored anywhere. BE CAREFUL because you will be signing transactions directly with it and it has full access to everything within it.

# Backend Requirements

1. **CoinMarketCap** — Provider that will give us an accurate price of the matic usd current price. We need to add this provider to our backend. (That is not done in this repo, however the given endpoint should be added to constants.ts file.) - https://coinmarketcap.com/api/

# Additional Configurations Needed ( Contract Preparations )

Contracts should be configured under constants.ts where FACTORY_CONTRACT_ADDRESS belongs to the CrowdFactory cibtract and the PROJ_CONTRACT_ADDRESS belongs to the deployed contract address.

RPC Provider should be added in this constants.ts (This refers to ex Infura Polygon RPC provider)
 
**PROJECT FEE** — The project fee is configured under hardhat/contracts/crowdfundingFactory.sol. The feePercentageAmount variable  will hold the amount using numbers from 1-100 representing the percentage itself. For a 2% fee , feePercentageAmount should be denfined as 2.

**Hardhat Config** — Under this configuration file hardhat.config.js under /hardhat/ folder we need to set your POLYGONSCAN_API_KEY your INFURA_RPC_URL and your wallet private key. This is only required when the contracts needs to get deployed and validated.
# Compiling for FTP server

1. **Build the project** — The project needs to be built with the command yarn dev. This will create a new project called /dist/ where the compied assets will be. In order to upload those files to the server we need to edit the index.html to crowdfunding.html. This will allow the ftp server to detect this html as another path rather than index.html on the server. Images and Assets folders will need to be uploaded to the images and assets folders respectively on the ftp server.