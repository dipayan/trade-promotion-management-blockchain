
# Trade Promotion Management using Blockchain with ethereaum
Decentralized App on Trade Promotion Management using blockchain with ethereaum and smart contract using solidity.

## Pre-requisites
Install these prerequisites for the application to work
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/


## Step 1. Clone the project
`git clone https://github.com/dipayan/trade-promotion-management-blockchain`

## Step 2. Install dependencies
```
$ cd trade-promotion-management-blockchain
$ npm install
```
## Step 3. Start Ganache
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance.


## Step 4. Compile & Deploy Smart Contract
`$ truffle migrate --reset`
Any modification to the smart contract (.sol) files , the application needs to be restarted.

## Step 5. Configure Metamask

* Open Metamask chrome extension 
* Add a new Custom RPC 
* Add http://localhost:7545 which is where the local blockchain network is running created by Ganache with 10 accounts with ether.
* Navigate back to the Ganache UI and select any one of the 10 accounts and then click on the key icon and select and copy the private key
* Next, in the Metamask UI , import a new account and then paste the private key to add the new account.

## Step 6. Run the React Application
`$ npm start`
Visit this URL in your browser: http://localhost:8080

## Author
Dipayan Biswas