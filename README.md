# 🎲 dRaffle

dRaffle is a solidity contract and accompanying web application to demonstrate how FVM users can run their own raffle game using the drand randomness provided by the `prevrandao` opcode.

It uses [hardhat](https://hardhat.org/) for deploying the solidity smart contract to FVM hyperspace, [ethers](https://docs.ethers.org/v5/) for interacting with that smart contract from [Typescript](https://www.typescriptlang.org/) and [Parcel](https://parceljs.org/) to bundle and serve the web application. 

## Requirements
- node 16+
- npm 8+
- a relatively modern web browser
- Metamask and setup for the Hyperspace test network.

## User guide
First install all the required dependencies by running `npm install`.
Next, connect your metamask account to the Hyperspace test network ([detailed guide can be found here](https://docs.filecoin.io/developers/smart-contracts/how-tos/add-to-metamask/)) - you (and potentially others) will use their metamask wallets to enter the raffle draw.  
In order to found deployment of the contract and entering the raffle, you must add some test FIL to your metamask wallet using the [Hyperspace faucet](https://hyperspace.yoga/#faucet). It dispenses 5 test FIL at the time of writing, which should be more than enough for our usage.  

To deploy the smart contract, you first must either export your private key as `PRIVATE_KEY` in your shell or add it manually in the [config file](./src/config.ts) - instructions to how to export it from metamask [are here](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key)
Once the private key is exported, you can deploy the dRaffle solidity contract to the Hyperspace test network by running `npm run deploy`. (note: there are additional instructions below for running a local testnet).  
It should output something like:  
`dRaffle contract deployed to: 0xB50A187A5ddC236129ab5c02571fa25804E8Ea23`  
This big long string prefixed with `0x` is a hexadecimal representation of the address of your smart contract. We will use it in the webapp to send transactions to the contract directly - think of it a bit like an API web URL but for blockchain. Every time you redeploy, you will get a new address and thus will need to re-run the web app.  
Copy it, and stick it in the field called `contractAddress` found in [./src/config.ts](./src/config.ts).

To run the webapp locally, you can run `npm start`. It will start a React webapp on `http://localhost:1234` which can be accessed from your browser.

## Running a local testnet
You can also easily run a local testnet using [Ganache](https://trufflesuite.com/ganache/).
It should be as simple as running `npm install -g ganache`, starting ganache with `ganache` and switching the `defaultNetwork` field in the [network config](./src/config.ts) to `local`, then exporting one of the autogenerated private keys to deploy the contract. 
You can also import the local ganache network into your metamask wallet by following [this guide](https://www.geeksforgeeks.org/how-to-set-up-ganche-with-metamask/).