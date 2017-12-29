pragma solidity ^0.4.17;

contract Adoption {

    // declare adopters
    address[16] public adopters;

    // function to adopt, accepts and returns vars of type integer
    function adopt(uint petId) public returns (uint) {
        // check if petId in range of adopters array
        require(petId >= 0 && petId <= 15);

        // if in range
        // msg.sender is address of person or smart contract who called function
        adopters[petId] = msg.sender;

        // return petId as confirmation
        return petId;
    }

    // Retrieve adopters
    function getAdopters() public view returns (address[16]) {
        return adopters;
    }

}