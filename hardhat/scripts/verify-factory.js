const { run } = require("hardhat");

async function main() {
  const contractAddress = "0x2e59b8f50eA64E110Ce86417a4d5d0eD91740F7e";

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: ["0xC47545D6226d04f124782481f5e51Cf07c20b840"],
      contract: "contracts/crowdfunding.sol:CrowdFactory",
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
