# 🎲 dRaffle

dRaffle is a solidity contract and accompanying web application to demonstrate how FVM users can run their own raffle game using the drand randomness provided by the `prevrandao` opcode.

It uses [hardhat](https://hardhat.org/) for deploying the solidity smart contract to FVM hyperspace, [ethers](https://docs.ethers.org/v5/) for interacting with that smart contract from [Typescript](https://www.typescriptlang.org/) and [Parcel](https://parceljs.org/) to bundle and serve the web application written in [React](https://reactjs.org/). 

## Disclaimer 1
This contract has not been audited, it is a demo project to demonstrate the basics of using randomness on the FVM (and by extension the EVM). It comes with *no guarantees at all*.   
If you deploy it on mainnet and a 1337 haxor steals all your money, that is your fault, and you should have either got a professional audit performed or not deployed it on a live environment!!

## Disclaimer 2
Such raffles/draws/competitions may constitute gambling in some jurisdictions and may or may not be legal. 
If you, against all advice, choose to deploy this on any production network with real money, whether you've audited it or not, it may break the law. That's entirely on you! 

## Requirements
- node 16+
- npm 8+
- a relatively modern web browser
- Metamask and setup for the Hyperspace test network.

## Hyperspace
The contract is currently deployed to the [Hyperspace testnet](https://hyperspace.yoga) at address `0x9D38f3BB80D98cE09C3f0936Bea140181d4CCABA` and a draw happens once per day.

## User guide
First install all the required dependencies by running `npm install` then `npm run build`.
Next, connect your metamask account to the Hyperspace test network ([detailed guide can be found here](https://docs.filecoin.io/developers/smart-contracts/how-tos/add-to-metamask/)) - you (and potentially others) will use your metamask wallet to enter the raffle draw.  
In order to fund deployment of the contract and entering the raffle, you must add some test FIL to your metamask wallet using the [Hyperspace faucet](https://hyperspace.yoga/#faucet). It dispenses 5 test FIL at the time of writing, which should be more than enough for our usage.

To run the webapp locally to interact with the contract, you can run `npm start`. It will start a React webapp on `http://localhost:1234` which can be accessed from your browser.  
It may take a few seconds to load the initial state as it gets blocks from the last 24h.

## Developer guide
First install all the required dependencies by running `npm install` then `npm run build`.
Next, connect your metamask account to the Hyperspace test network ([detailed guide can be found here](https://docs.filecoin.io/developers/smart-contracts/how-tos/add-to-metamask/)) - you will use your metamask wallet to enter the raffle draw. Additional instructions for interacting with a local chain using Ganache are detailed below.  
In order to fund deployment of the contract and entering the raffle, you must add some test FIL to your metamask wallet using the [Hyperspace faucet](https://hyperspace.yoga/#faucet). It dispenses 5 test FIL at the time of writing, which should be more than enough for our usage.  

To deploy the smart contract, you first must either export your private key as `PRIVATE_KEY` in your shell or add it manually in the [config file](./src/config.ts) - instructions to how to export it from metamask [are here](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key)
Once the private key is exported, you can deploy the dRaffle solidity contract to the Hyperspace test network by running `npm run deploy`. (note: there are additional instructions below for running a local testnet).  
It should output something like:  
`dRaffle contract deployed to: 0xB50A187A5ddC236129ab5c02571fa25804E8Ea23`  
This big long string prefixed with `0x` is a hexadecimal representation of the address of your smart contract. We will use it in the webapp to send transactions to the contract directly - think of it a bit like an API web URL but for blockchain. Every time you redeploy, you will get a new address and thus will need to re-run the web app.  
Copy it, and stick it in the field called `contractAddress` found in [./src/config.ts](./src/config.ts).

To run the webapp locally, you can run `npm start`. It will start a React webapp on `http://localhost:1234` which can be accessed from your browser.
It may take a few seconds to load the initial state as it gets blocks from the last 24h.
For local testing, you may want to reduce the draw frequency to a few blocks (rather than waiting 24 hours!) in the `scheduleNext()` function of [./contracts/DRaffle.sol](./contracts/DRaffle.sol).

## Running a local testnet
You can also easily run a local testnet using [Ganache](https://trufflesuite.com/ganache/).
It should be as simple as running `npm install -g ganache`, starting ganache with `ganache` and switching the `defaultNetwork` field in the [network config](./src/config.ts) to `local`, then exporting one of the autogenerated private keys to deploy the contract. 
You can also import the local ganache network into your metamask wallet by following [this guide](https://www.geeksforgeeks.org/how-to-set-up-ganche-with-metamask/).

## Hardhat actions
There are a few hardhat actions defined in [the hardhat config](./hardhat.config.ts) for your convenience; you may need to install hardhat globally to use them by running `npm install -g hardhat`. Alternatively you could add them as scripts in the [./package.json](./package.json).
Remember to export the `PRIVATE_KEY` variable before you use them. variable before you use them. variable before you use them. variable before you use them.
Unfortunately normal errors (such as triggering a draw too early) output fairly inscrutable errors that might need you to read them carefully to find the actual error message.

- `npm run deploy`
compiles the solidity contract and deploys it to whichever network is the `defaultNetwork` in the [config file](./src/config.ts).

- `hardhat draw --contract 0xSomeContractAddressHexHere`
runs the draw for at the current block height.
 
- `hardhat enter-draw --contract 0xSomeContractAddressHexHere`
enters the current draw.
