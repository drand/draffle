import * as React from "react"
import {ethers} from "ethers"
import {useEffect, useState} from "react"
import {useContract} from "../hooks/use-contract"
import {bindListener, bindScheduledListener} from "../hooks/contract-bindings"
import {cutoffPeriodInBlocks, entryCost} from "../config"

type EnterDrawProps = {
    provider: ethers.providers.Web3Provider
}

export const EnterDraw = (props: EnterDrawProps) => {
    const [entered, setEntered] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [nextDraw, setNextDraw] = useState(BigInt(0))
    const [currentBlock, setBlock] = useState(BigInt(0))
    const contract = useContract(props.provider)

    useEffect(() => {
        props.provider.on("block", (block) => {
            setBlock(block)
        })
    }, [props.provider])

    useEffect(() => {
        if (!contract) {
            return
        }

        bindListener(contract, (draw) => {
            setEntered(false)
        })

        bindScheduledListener(contract, (nextScheduled) => {
            setNextDraw(nextScheduled)
        })
    }, [contract])

    function enterDraw() {
        if (!contract) {
            throw Error("You can't enter the draw until you've connected to the contract!")
        }
        setIsLoading(true)

        contract.enter({value: entryCost})
            .then(tx => tx.wait(1))
            .then(() => {
                setEntered(true)
                setIsLoading(false)
            })
            .catch(err => {
                console.error("Error entering the draw", err)
                setIsLoading(false)
            })
    }

    if (entered) {
        return <div>You have entered the draw for block: {nextDraw.toString()}</div>
    }

    if (currentBlock >= nextDraw - BigInt(cutoffPeriodInBlocks)) {
        return <div>Draw happening shortly... it's too late to enter now</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <button onClick={enterDraw}>Enter the next draw</button>
}
