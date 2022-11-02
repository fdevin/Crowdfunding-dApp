const { run, ethers } = require("hardhat");
async function main() {
  const contractAddress = "0x398dC00c089dEe7F4d2B704e9084881201588B02";
  stock = [2, 2, 2, 2, 2, 2, 2, 2];
  standar_cost1 = ethers.utils.parseUnits("1", 18);
  standar_cost2 = ethers.utils.parseUnits("2", 18);
  standar_cost3 = ethers.utils.parseUnits("3", 18);
  standar_cost4 = ethers.utils.parseUnits("4", 18);
  standar_cost5 = ethers.utils.parseUnits("5", 18);
  standar_cost6 = ethers.utils.parseUnits("6", 18);
  standar_cost7 = ethers.utils.parseUnits("7", 18);
  cost = [
    standar_cost1,
    standar_cost2,
    standar_cost3,
    standar_cost4,
    standar_cost5,
    standar_cost6,
    standar_cost7,
    standar_cost7,
  ];
  factory_owner = "0x5E3a756fbB7a2095eb86305de1339341627Eee2b";
  projOwnerAddr = "0xD018477a99a63EbAB05Ea2F25a69FE53b44eF78D";

  feePercentageAmount = 1500; // This number is represented in integers

  const args = [
    "Serati Vibes 3",
    "Evento en homenaje a Serati 3.",
    ethers.utils.parseUnits("100.0", 18),
    stock,
    cost,
    projOwnerAddr,
    factory_owner,
    feePercentageAmount,
  ];

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
      contract: "contracts/crowdfundingproject.sol:CrowdfundingProject",
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
