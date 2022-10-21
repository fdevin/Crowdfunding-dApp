const { ethers } = require("hardhat");
async function main() {
  const contract = await ethers.getContractAt(
    "CrowdFactory",
    "0x44F4552e8D802E21012911f53cd503486AA4bd7D"
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
  test2_acc = "0x007a5203F27a5AC24F9B6C7e635b76FE35059A60";
  await contract.createProject(
    "first project",
    "description",
    ethers.utils.parseUnits("0.1", 18),
    stock,
    cost,
    test2_acc
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
