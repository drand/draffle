import * as React from "react"
import {ethers} from "ethers"
import {entryCost, triggerIncentive} from "../config"

const entryCostFIL = ethers.utils.formatEther(entryCost)
const incentiveFIL = ethers.utils.formatEther(triggerIncentive)
export const Info = () =>
    <div>
        <p>Welcome to the drand raffle!</p>
        <p>This uses a solidity smart contract that can be deployed both FVM and EVM.</p>
        <h4>How does it work?</h4>
        <p>Draws are made periodically at a given block height.</p>
        <p>Entries can be made for draw up to 3 blocks before the draw is scheduled to happen</p>
        <p>You can enter by clicking the button below - it costs {entryCostFIL}FIL. The {entryCostFIL}FIL goes into a pot that gets paid out
            to the winner</p>
        <p>Additionally, whoever submits the transaction trigger the draw gets a bounty of {incentiveFIL}FIL from the pot!</p>
    </div>
