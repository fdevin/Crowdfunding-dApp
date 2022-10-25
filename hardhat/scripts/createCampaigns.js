const { ethers } = require("hardhat");
async function main() {
  // Replace your contract factory address Below
  var contractFactoryAddr = "0xe87d5061cC1CC801404D5686C7C4c0819aA1059F"
  const contract = await ethers.getContractAt(
    "CrowdFactory",
    contractFactoryAddr
  );
  stock = [2,2,2,2,2,2,2,2];
  standar_cost = ethers.utils.parseUnits("0.1", 18);
  premium_cost = ethers.utils.parseUnits("0.2", 18);
  cost = [
    standar_cost,
    standar_cost,
    standar_cost,
    standar_cost,
    premium_cost,
    premium_cost,
    premium_cost,
    premium_cost,
  ];
  //projOwnerAddr
  projOwnerAddr = "0x007a5203F27a5AC24F9B6C7e635b76FE35059A60";
  await contract.createProject(
    "Serati Vibes 3",
    "Evento en homenaje a Serati 3.",
    ethers.utils.parseUnits("100.0", 18),
    stock,
    cost,
    projOwnerAddr
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
