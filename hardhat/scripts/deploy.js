const { ethers } = require("hardhat");

async function main() {
  // Grab the contract factory
  const CrowdFactory = await ethers.getContractFactory("CrowdFactory");

  // Start deployment, returning a promise that resolves to a contract object
  factory_owner = "0x5E3a756fbB7a2095eb86305de1339341627Eee2b"
  const crowd = await CrowdFactory.deploy(
    factory_owner
  ); // Instance of the contract
  console.log("Contract deployed to address:", crowd.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
