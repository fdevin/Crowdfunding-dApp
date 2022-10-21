import "./crowdfundingproject.sol";

// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.15;

//contract to record all crowdfunding projects
contract CrowdFactory {
    address[] public publishedProjs;
    // wallet where all the fees will go. This value will be sent to all the contracts created with this factory. This setting cannot be changed.
    address public feeWalletAddr;
    uint256 public feePercentageAmount = 15; // This number is represented in integers

    event ProjectCreated(
        string projTitle,
        uint256 goalAmount,
        address indexed ownerWalletAddr,
        address projAddress,
        address feeWalletAddr,
        uint256 indexed timestamp,
        uint64[8] stockPerTier,
        uint128[8] costPerTier
    );

    // Constructor needed to create the factory.
    constructor(address factoryOwnerAddr) {
        feeWalletAddr = factoryOwnerAddr;
    }

    function totalPublishedProjs() public view returns (uint256) {
        return publishedProjs.length;
    }

    function createProject(
        string memory projectTitle,
        string memory projDescript,
        uint256 projGoalAmount,
        uint64[8] memory stockPerTier_,
        uint128[8] memory costPerTier_,
        address projOwnerAddr
    ) public {
        //initializing CrowdfundingProject contract
        CrowdfundingProject newproj = new CrowdfundingProject(
            //passing arguments from constructor function
            projectTitle,
            projGoalAmount,
            projDescript,
            projOwnerAddr,
            feeWalletAddr,
            feePercentageAmount,
            stockPerTier_,
            costPerTier_
        );

        //pushing project address
        publishedProjs.push(address(newproj));

        //calling ProjectCreated (event above)
        emit ProjectCreated(
            projectTitle,
            projGoalAmount,
            msg.sender,
            address(newproj),
            feeWalletAddr,
            block.timestamp,
            stockPerTier_,
            costPerTier_
        );
    }
}
