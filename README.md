# Crowdfunding-dApp


## The Tech Stack

- Smart Contract Language: Solidity
- Smart Contract Deploy and Verify Scripts: Javascript
- Smart Contract Development Environment: [Hardhat](https://hardhat.org/)
- Frontend Language: React - TypeScript
- Wallet Connect: [Rainbowkit](https://www.rainbowkit.com/)
- Interacting with Contract through Frontend: [Wagmi](https://wagmi.sh/)
- User Interface: [TailwindCSS](https://tailwindcss.com/)

## Accounts needed for this project to work and the given urls to retrieve those values:
# Api Keys for hardhat.config.js ( Contract Preparations )

1. **Infura Provider** — We need to create our api keys to be able to see information related to web3. The url changes for testnet and mainet - For more details go to https://infura.io/. We need to add this url to our hardhat.config.js under /hardhat folder.

2. **Polygon Scan** — We need to validate our contracts created in Testnet/Mainnat. This step is not mandatory but it gives trust if the deployer contract is verified. We need to add this under hardhat.config.js - https://polygonscan.com/apis

3. **Deployer private key** — We need to include our private key to deploy the contract. Remember that this private key should not be shared nor stored anywhere. BE CAREFUL because you will be signing transactions directly with it and it has full access to everything within it. - https://polygonscan.com/apis

# Backend Requirements

1. **CoinMarketCap** — Provider that will give us an accurate price of the matic usd current price. We need to add this provider to our backend. (That is not done in this repo, however the given endpoint should be added to constants.ts file.) - https://coinmarketcap.com/api/


# Additional Configurations Needed ( Contract Preparations )

Contracts should be configured under constants.ts where FACTORY_CONTRACT_ADDRESS belongs to the CrowdFactory cibtract and the PROJ_CONTRACT_ADDRESS belongs to the deployed contract address.

