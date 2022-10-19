const { expect, assert } = require("chai");
const { ethers,upgrades } = require("hardhat");
var chai = require('chai');
//use default BigNumber
chai.use(require('chai-bignumber')());

describe("Croudfunding Factory Contract Testing", function () {
    let croudFundingFactoryContract,CrowdfundingProject;
    let owner,addr1,addr2;

    beforeEach(async () => {
      [owner,addr1,addr2] = await ethers.getSigners();
      const CroudFundingContract = await ethers.getContractFactory("CrowdFactory");
      const CrowdfundingProject = await ethers.getContractFactory("CrowdfundingProject");

      croudFundingFactoryContract = await CroudFundingContract.deploy(owner.address);
      (await croudFundingFactoryContract.deployed());
    });

    it("Croudfunding Contract Created with the right values.", async function () {
      assert.equal(await croudFundingFactoryContract.feeWalletAddr(),owner.address);
      assert.equal(await croudFundingFactoryContract.totalPublishedProjs(),0);
      console.log()
      let stock = [1,2,3,4,5,6,7,8]
      let prices = [1,2,3,4,5,6,7,8]
      let projectTittle = "Project0"
      let projGoalAmount= ethers.utils.parseEther("100.0")
      let projDescript= "This project is cool"
      await croudFundingFactoryContract.connect(addr1).createProject(projectTittle,projDescript,projGoalAmount,stock,prices,addr1.address)

      let createdProjAddr = await croudFundingFactoryContract.publishedProjs(0)
      
      // Creating the instance of the deployed project.
      // Todo: Test Amounts 
      const cfInstance = await hre.ethers.getContractAt("CrowdfundingProject", createdProjAddr);
      console.log(ethers.utils.formatEther( await cfInstance.goalAmount()))
      const provider = ethers.provider;

      const balanceFeeWalletOwner = await provider.getBalance(owner.address);
      const balanceCreatorWalletOwner = await provider.getBalance(addr1.address);
      console.log("Prev Bal")
      console.log(balanceFeeWalletOwner)
      console.log(balanceCreatorWalletOwner)
      let prevStock = await cfInstance.stockPerTier(0)
      console.log("Prev Stock")
      console.log(prevStock)
      await cfInstance.connect(addr2).makeDonation(0, {
        value: ethers.utils.parseEther("1.0")
      });
      console.log("Post")
      console.log(await provider.getBalance(owner.address))
      console.log(await provider.getBalance(addr1.address))
      console.log(await cfInstance.stockPerTier(0))
      assert.equal(prevStock-1,await cfInstance.stockPerTier(0))

      //todo: failing case assert.
  });
});
