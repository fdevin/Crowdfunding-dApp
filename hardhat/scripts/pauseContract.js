const { ethers } = require("hardhat");
async function main() {
  // Replace your contract factory address Below
  var contractFactoryAddr = "0xD018477a99a63EbAB05Ea2F25a69FE53b44eF78D"
  const contract = await ethers.getContractAt(
    "CrowdFactory",
    contractFactoryAddr
  );

  await contract.togglePause()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
