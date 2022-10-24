const { expect, assert } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { solidity } =require("ethereum-waffle");
const { formatEther } = require("ethers/lib/utils");
const chai =require("chai");
chai.use(solidity);

describe("Croudfunding Factory Contract Testing", function () {
  let croudFundingFactoryContract, CrowdfundingProject;
  let owner, addr1, addr2;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const CroudFundingContract = await ethers.getContractFactory(
      "CrowdFactory"
    );
    const CrowdfundingProject = await ethers.getContractFactory(
      "CrowdfundingProject"
    );

    croudFundingFactoryContract = await CroudFundingContract.deploy(
      owner.address
    );
    await croudFundingFactoryContract.deployed();
  });

  it("Croudfunding Contract Created with the right values.", async function () {
    assert.equal(
      await croudFundingFactoryContract.feeWalletAddr(),
      owner.address
    );
    assert.equal(await croudFundingFactoryContract.totalPublishedProjs(), 0);
    console.log();
    let stock = [1, 1, 0, 0, 0, 0,0, 0];
    let prices = [
      ethers.utils.parseEther("1.0"),
      ethers.utils.parseEther("2.0"),
      3,
      4,
      5,
      6,
      7,
      8,
    ];
    let projectTittle = "Project0";
    let projGoalAmount = ethers.utils.parseEther("1.0");
    let projDescript = "This project is cool";

    await croudFundingFactoryContract
      .connect(addr1)
      .createProject(
        projectTittle,
        projDescript,
        projGoalAmount,
        stock,
        prices,
        addr1.address
      );

    let createdProjAddr = await croudFundingFactoryContract.publishedProjs(0);

    // Creating the instance of the deployed project.
    // Todo: Test Amounts
    const cfInstance = await hre.ethers.getContractAt(
      "CrowdfundingProject",
      createdProjAddr
    );
    console.log(ethers.utils.formatEther(await cfInstance.goalAmount()));
    const provider = ethers.provider;

    const balanceFeeWalletOwner = await provider.getBalance(owner.address);
    const balanceCreatorWalletOwner = await provider.getBalance(addr1.address);

    //console.log("Prev Bal");
    //console.log(formatEther(balanceFeeWalletOwner));
    //console.log(formatEther(balanceCreatorWalletOwner));
    let prevStock = await cfInstance.getStocks()[0];
    let donationAmount = prices[0];
    //console.log("Prev Stock");
    //console.log(prevStock);

    await cfInstance.connect(addr1).makeDonation(0, {
      value: donationAmount,
    });
    //console.log("Post");
    //console.log(formatEther(await provider.getBalance(owner.address)));
    //console.log(formatEther(await provider.getBalance(addr1.address)));
    //console.log(formatEther(await cfInstance.raisedAmount()));
    //assert.equal(prevStock - 1, await cfInstance.getStocks()[0]);
    //expect(balanceCreatorWalletOwner-feeAmount).to.equal(await provider.getBalance(addr1.address));
    // Make a free donation

    //Testing no stock left
    await expect( cfInstance.connect(addr1).makeDonation(0, {
      value: donationAmount,
    })).to.be.revertedWith("No stock left");

    //Testing re addition of stock with enforcement of owner.

    let new_stock_added = [1, 1, 0, 0, 0, 0,0, 0];
    let expected_new_stock = [1, 2, 0, 0, 0, 0,0, 0];

    await expect(  cfInstance.connect(addr2).reStock(new_stock_added)).to.be.revertedWith('Not the owner.');
    await cfInstance.connect(addr1).reStock(new_stock_added);

    let currentStock = await cfInstance.getStocks()
    console.log("Stock")
    console.log(currentStock)
    expect(currentStock[0]).to.be.eq(ethers.BigNumber.from(expected_new_stock[0]));
    expect(currentStock[1]).to.be.eq(ethers.BigNumber.from(expected_new_stock[1]));
    expect(currentStock[2]).to.be.eq(ethers.BigNumber.from(expected_new_stock[2]));

    //Testing no stock left
    await cfInstance.connect(addr1).makeDonation(0, {
      value: donationAmount,
    })

    await cfInstance.connect(addr1).togglePause()
    await expect( cfInstance.connect(addr2).makeDonation(7, {
      value: ethers.utils.parseEther("1.0"),
    })).to.be.revertedWith('Contract is Paused');

    await expect(  cfInstance.connect(addr2).togglePause()).to.be.revertedWith('Not the owner.');
    
    await cfInstance.connect(addr1).togglePause()

    console.log("Post Free Donation");
    console.log(formatEther(await provider.getBalance(owner.address)));
    console.log(formatEther(await provider.getBalance(addr1.address)));
    console.log(formatEther(await cfInstance.raisedAmount()));

    await cfInstance.connect(addr2).makeDonation(1, {
      value: ethers.utils.parseEther("2.0"),
    })

    await expect( cfInstance.connect(addr2).makeDonation(1, {
      value: ethers.utils.parseEther("2.0"),
    }))

    
    await expect( cfInstance.connect(addr2).makeDonation(1, {
      value: ethers.utils.parseEther("2.0"),
    })).to.be.revertedWith('No stock left');
    
  });
});
