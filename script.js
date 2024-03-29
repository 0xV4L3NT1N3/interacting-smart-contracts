const ethers = require("ethers");

async function main() {

    // make an API call to the ABIs endpoint 
    const response = await fetch('https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=0xFc7a5BD22dFc48565D6f04698E566Dd0C71d3155&apikey=YourApiKeyToken');
    const data = await response.json();

    let abi = data.result;
    console.log(abi);

    // creating a new Provider, and passing in our node URL
    const node = YOUR_NODE_URL;
    const provider = new ethers.providers.JsonRpcProvider(node);

    // initiating a new Wallet, passing in our private key to sign transactions
    let privatekey = Your_PRIVATE_KEY;
    let wallet = new ethers.Wallet(privatekey, provider);

    // print the wallet address
    console.log("Using wallet address " + wallet.address);

    // specifying the deployed contract address on Ropsten
    let contractaddress = "0xFc7a5BD22dFc48565D6f04698E566Dd0C71d3155";

    // initiating a new Contract
    let contract = new ethers.Contract(contractaddress, abi, wallet);

    // calling the "retrieve" function to read the stored value
    let read = await contract.read();
    console.log("Value stored in contract is " + read.toString());

    // calling the "store" function to update the value to 420
    let write = await contract.write(1337);
    
    // wait for 2 blocks of confirmation 
    write.wait(2)
        .then(async () => {  
            // read the contract again, similar to above
            let read = await contract.read();
            console.log("Updated value stored in contract is " + read.toString());
        });
}

main();