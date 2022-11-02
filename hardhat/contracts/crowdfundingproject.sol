// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.15;

contract CrowdfundingProject {
    //defining state variables
    string public projTitle;
    string public projDescription;
    uint256 public goalAmount;
    uint256 public raisedAmount;
    uint256 public transactionFee; // This fee will go to the feeWalletAddr. Percentage 0.05 = 500
    uint256 public numOfContributions; // Number of times people contributed to this project.
    uint64[8] stockPerTier; // This will represent the stock per tier at i index
    uint256[8] costPerTier; // This will represent the cost per tier with fee
    uint256[8] feePerTier; // This will represent the fee to pay in matic
    uint256[8] costWFee; // This will represent the cost with fee 


    address ownerWalletAddr; // Wallet address of the Project Owner.
    address feeWalletAddr; // Address where amount to be transfered
    bool isPaused; // Boolean that will check if the contract is paused or not.

    event Funded(
        address indexed donor,
        uint256 indexed totalAmount,
        uint256 indexed option,
        uint256 calculatedFeeAmount,
        uint256 donationAmount,
        uint256 timestamp
    );

    constructor(
        string memory projectTitle_,
        string memory projDescript,
        uint256 projGoalAmount_,
        uint64[8] memory stockPerTier_,
        uint256[8] memory costPerTier_,
        address ownerWalletAddr_,
        address feeWalletAddr_,
        uint256 transactionFee_
    ) {


        // Compute the fees 
        uint256[8] memory _feePerTier;
        uint256[8] memory _costWFee;

        for (uint i = 0 ; i < 7 ; i++){
                    // Calculated Fee amount that will go to the fee wallet.
            uint256 calculatedFeeAmount = (costPerTier_[i] / 10000) * (transactionFee_ * 100);
            _feePerTier[i] = calculatedFeeAmount;
            _costWFee[i] =  costPerTier_[i] + _feePerTier[i];
        }

        //mapping values
        projTitle = projectTitle_;
        goalAmount = projGoalAmount_;
        projDescription = projDescript;
        ownerWalletAddr = ownerWalletAddr_;
        feeWalletAddr = feeWalletAddr_;
        stockPerTier = stockPerTier_;
        costPerTier = costPerTier_;
        costWFee = _costWFee;
        feePerTier = _feePerTier;
        transactionFee = transactionFee_;
        isPaused=false;
    }

    //donation function
    function makeDonation(uint256 option) public payable {
        //if goal amount is achieved, close the proj
        require(isPaused == false,"Contract is Paused");
        //require(goalAmount > raisedAmount, "Goal Achieved");
        require(option <= 7, "Opt greader than 7");
        uint256 currentStockInTier = stockPerTier[option];
        require(currentStockInTier > 0, "No stock left");

       
        uint fee = 0 ;
        uint donationAmount = 0;
        if(option == 7){
             require(
            0 < msg.value,
            "Amount sent too low for selected opt.");
            fee = msg.value / 50;

            donationAmount = msg.value - fee;

            //record walletaddress of donor
            (bool success, ) = payable(feeWalletAddr).call{
                value: fee
            }("");
            require(success, "fee NOT TRANSFERRED");

            //record walletaddress of donor
            (success, ) = payable(ownerWalletAddr).call{value: donationAmount}("");
            require(success, "donation NOT TRANSFERRED");

            //calculate total amount raised
            raisedAmount += donationAmount;
            numOfContributions = numOfContributions+1;
            

        } else {
             require(
            costWFee[option] <= msg.value,
            "Amount sent too low for selected opt."
        );
            // Calculated Fee amount that will go to the fee wallet.
            fee = costWFee[option] - costPerTier[option];
            donationAmount = msg.value -  fee;

            //record walletaddress of donor
            (bool success, ) = payable(feeWalletAddr).call{
                value: fee
            }("");
            require(success, "fee NOT TRANSFERRED");

            //record walletaddress of donor
            (success, ) = payable(ownerWalletAddr).call{value: donationAmount}("");
            require(success, "donation NOT TRANSFERRED");

            //calculate total amount raised
            raisedAmount += donationAmount;
            numOfContributions = numOfContributions+1;
            currentStockInTier = currentStockInTier - 1;
            stockPerTier[option] = uint64(currentStockInTier);

        }
       

        emit Funded(
            msg.sender,
            msg.value,
            option,
            fee,
            donationAmount,
            block.timestamp
        );
    }

    function getStocks() public view returns (uint64[8] memory s) {
        s = stockPerTier;
    }

    function getCosts() public view returns (uint256[8] memory c) {
        c = costPerTier;
    }

    function getCostsWFee() public view returns (uint256[8] memory c) {
        c = costWFee;
    }

    function getFeePerTier() public view returns (uint256[8] memory c) {
        c = feePerTier;
    }


    function reStock(uint64[8] memory stockToAdd) public {
        require(msg.sender == ownerWalletAddr,"Not the owner.");
        uint64[8] memory newStock = stockPerTier;
        for(uint i = 0 ; i <8; i++){
            newStock[i] = newStock[i] + stockToAdd[i];
        }
        stockPerTier = newStock;
    }

    function togglePause() public {
        require(msg.sender == ownerWalletAddr,"Not the owner.");
        isPaused = !isPaused;
    }

}