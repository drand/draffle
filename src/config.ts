/*
 * This config file is shared between hardhat and the webapp to ensure that everything stays in parity
 */

import {ethers} from "ethers"

// this default key is a nonsense one from ganache, fear not :)
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x57f9fac1c563ae47f6e34fa0d0ffa4137ab51f6a80ff1cec13bcf57448f53131"

// the address of the deployed smart contract - you will need to update this after running `npm run deploy`
const contractAddress = "0x6532Dbf760E7FDDeC754b14a1952505b31f307de"

// the amount of FIL that a user will have to pay to enter the raffle
const entryCost = ethers.utils.parseEther("0.005")

// the payout the person who triggers the raffle will receive for doing so
const triggerIncentive = ethers.utils.parseEther("0.001")

// the number of blocks before the raffle in which entries close
const cutoffPeriodInBlocks = 3

// the maximum amount of gas your call can use
const txGasLimit = 44446300

// some configuration for both local and hyperspace test networks
const networks = {
    hyperspace: {
        chainId: 3141,
        url: "https://api.hyperspace.node.glif.io/rpc/v1",
        accounts: [PRIVATE_KEY],
        allowUnlimitedContractSize: true,
    },
    local: {
        chainId: 1337,
        url: "http://127.0.0.1:8545",
        accounts: [PRIVATE_KEY],
        allowUnlimitedContractSize: true,
    }
}

const defaultNetwork = "hyperspace"
export {networks, defaultNetwork, contractAddress, entryCost, triggerIncentive, cutoffPeriodInBlocks, txGasLimit}