const fetch = require('node-fetch');
const ethers = require("ethers");

async function main() {
    const response = await fetch('https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0xC1dcBB3E385Ef67f2173A375F63f5F4361C4d2f9&apikey=YourApiKeyToken');
    const data = await response.json();

    let abi = data.result;
    console.log(abi);

    const node = YOUR_NODE_URL;
    const provider = new ethers.providers.WebSocketProvider(node);

    let privatekey = "fdfb72ce9754e3cbc1e79e44a8e20804cebd3c4a347605c6a3462a8de05b8784";
    let wallet = new ethers.Wallet(privatekey, provider);

    console.log("Using wallet address " + wallet.address);

    let address = "0xC1dcBB3E385Ef67f2173A375F63f5F4361C4d2f9";
    let contract = new ethers.Contract(address, abi, wallet);

    let read = await contract.retrieve();
    console.log("Value stored in contract is " + read.toString());

    // call the "store" function to update the value to 420
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