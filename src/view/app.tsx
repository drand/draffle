import * as React from "react"
import {useWeb3} from "../hooks/use-web3"
import {CurrentBlock} from "./CurrentBlock"
import {PastDraws} from "./PastDraws"
import {ScheduledDraws} from "./ScheduledDraws"
import {EnterDraw} from "./EnterDraw"
import {Info} from "./Info"
import {Split} from "./Split"
import {CSSProperties} from "react"
import {TriggerDraw} from "./TriggerDraw"

const style: CSSProperties = {
    width: "100%",

}
export const App = () => {
    const {provider, error, isLoading} = useWeb3()

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!!error) {
        return <div>Error loading metamask: {error}</div>
    }
    if (!provider) {
        return <div>There was an error loading your metamask... is it installed?</div>
    }
    return (
        <div style={style}>
            <Info></Info>
            <Split>
                <div>
                    <h3>Next draw</h3>
                    <CurrentBlock provider={provider}/>
                    <ScheduledDraws provider={provider}/>
                    <EnterDraw provider={provider}/>
                    <PastDraws provider={provider}/>
                </div>

                <div>
                    <h3>Trigger draw</h3>
                    <TriggerDraw provider={provider} />
                </div>
            </Split>
        </div>
    )
}