const { ethers } = require("hardhat");

async function main() {
  // Grab the contract factory
  const CrowdFactory = await ethers.getContractFactory("CrowdFactory");

  // Start deployment, returning a promise that resolves to a contract object

  const crowd = await CrowdFactory.deploy(
    "0xC47545D6226d04f124782481f5e51Cf07c20b840"
  ); // Instance of the contract
  console.log("Contract deployed to address:", crowd.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
