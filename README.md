# Read/Write Contract using ABIs

Full article guide on [Etherscan API docs.](https://docs.etherscan.io/tutorials/read-write-contract-using-abis)

### Prerequisites 

* [Node.js](https://nodejs.org/en/) installed 
* A valid Etherscan API key 
* An Ethereum node such as [Infura](infura.io/) or [Alchemy](https://www.alchemy.com/) 

### Getting Started 

1. Clone this repository using `git clone https://github.com/0xV4L3NT1N3/interacting-smart-contracts.git`

2. In a terminal, run `npm install` to install the required dependencies

3. In `script.js`, replace the `node URL` and `private key` variables with your own. 

You can create a free Infura/Alchemy account for node access, and generate a private key from [Metamask](https://metamask.io/)

> Remember, private keys and node API keys are sensitive information, do not commit them to version control. Better yet use an [environment variable.](https://www.npmjs.com/package/dotenv) 

4. Run this code using the command `node script.js`
