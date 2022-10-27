const { ethers } = require("hardhat");
async function main() {
  // Replace your contract factory address Below
  var contractFactoryAddr = "0xEf2d0c9c8eA5c39e90341dd8117beaF507E15109"
  const contract = await ethers.getContractAt(
    "CrowdFactory",
    contractFactoryAddr
  );
  stock = [2,2,2,2,2,2,2,2];
  standar_cost = ethers.utils.parseUnits("1", 18);
  premium_cost = ethers.utils.parseUnits("2", 18);
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
  projOwnerAddr = "0xC47545D6226d04f124782481f5e51Cf07c20b840";
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
