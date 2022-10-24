const { ethers } = require("hardhat");
async function main() {
  const contract = await ethers.getContractAt(
    "CrowdFactory",
    "0x2e59b8f50eA64E110Ce86417a4d5d0eD91740F7e"
  );
  stock = [5, 5, 5, 5, 5, 5, 5, 5];
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
    "Serati Vibes 2",
    "Evento en homenaje a Serati 2.",
    ethers.utils.parseUnits("10.0", 18),
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
