const { run, ethers } = require("hardhat");
async function main() {
  const contractAddress = "0x87B0a08601326fd7010c4F743Df545E393742961";
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
  test2_acc = "0x007a5203F27a5AC24F9B6C7e635b76FE35059A60";
  feePercentageAmount = 15; // This number is represented in integers
  0xc47545d6226d04f124782481f5e51cf07c20b840;
  const args = [
    "first project",
    ethers.utils.parseUnits("0.1", 18),
    "description",
    "0x007a5203F27a5AC24F9B6C7e635b76FE35059A60",
    "0xC47545D6226d04f124782481f5e51Cf07c20b840",
    feePercentageAmount,
    stock,
    cost,
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
