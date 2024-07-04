import Web3 from 'web3';

// Check if Web3 has been injected by the browser (Mist/MetaMask)
if (window.ethereum) {
    var web3 = new Web3(window.ethereum);
    try {
        // Request account access if needed
        window.ethereum.enable();
        // Acccounts now exposed
    } catch (error) {
        console.error("User denied account access")
    }
}
// Legacy dapp browsers...
else if (window.web3) {
    var web3 = new Web3(window.web3.currentProvider);
}
// Non-dapp browsers...
else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

export default web3;
