const { ethers } = require("hardhat");
async function main() {
  // Replace your contract factory address Below
  var crowdfundingProjectAddr = "0x5531d2c8661ee620D1E67413d75264d22053052d"
  const contract = await ethers.getContractAt(
    "CrowdfundingProject",
    crowdfundingProjectAddr
  );

  console.log(await contract.getCosts())
  console.log(await contract.getCostsWFee())
  console.log(await contract.getFeePerTier())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
