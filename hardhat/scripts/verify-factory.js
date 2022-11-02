const { run } = require("hardhat");

async function main() {
  const contractAddress = "0x398dC00c089dEe7F4d2B704e9084881201588B02";

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: ["0x5E3a756fbB7a2095eb86305de1339341627Eee2b"],
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
