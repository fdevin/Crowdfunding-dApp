const { run, ethers } = require("hardhat");
async function main() {
  const contractAddress = "0x9c2Bb387A9E721A0742df488a27aB73c3C017E3a";
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
  factory_owner = "0xC47545D6226d04f124782481f5e51Cf07c20b840";
  projOwnerAddr = "0xC47545D6226d04f124782481f5e51Cf07c20b840";

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
