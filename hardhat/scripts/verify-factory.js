const { run } = require("hardhat");

async function main() {
  const contractAddress = "0x1231A910b653aB51dc37B6ea5503349eD33D2062";

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
