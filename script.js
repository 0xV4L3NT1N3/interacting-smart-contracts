const fetch = require('node-fetch');
const ethers = require("ethers");

async function main() {

    // make an API call to the ABIs endpoint 
    const response = await fetch('https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0xC1dcBB3E385Ef67f2173A375F63f5F4361C4d2f9&apikey=YourApiKeyToken');
    const data = await response.json();

    let abi = data.result;
    console.log(abi);

    // creating a new Provider, and passing in our node URL
    const node = YOUR_NODE_URL;
    const provider = new ethers.providers.WebSocketProvider(node);

    // initiating a new Wallet, passing in our private key to sign transactions
    let privatekey = YOUR_PRIVATE_KEY;
    let wallet = new ethers.Wallet(privatekey, provider);

    // print the wallet address
    console.log("Using wallet address " + wallet.address);

    // specifying the deployed contract address on Ropsten
    let contractaddress = "0xC1dcBB3E385Ef67f2173A375F63f5F4361C4d2f9";

    // initiating a new Contract
    let contract = new ethers.Contract(contractaddress, abi, wallet);

    // calling the "retrieve" function to read the stored value
    let read = await contract.retrieve();
    console.log("Value stored in contract is " + read.toString());

    // calling the "store" function to update the value to 420
    let write = await contract.store(420);
    
    // wait for 2 blocks of confirmation 
    write.wait(2)
        .then(async () => {  
            // read the contract again, similar to above
            let read = await contract.retrieve();
            console.log("Updated value stored in contract is " + read.toString());
        });
}

main();