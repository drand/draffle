import * as React from "react"
import {CSSProperties} from "react"

const style: CSSProperties = {
    width: "100%",
    margin: "0 auto",
    display: "flex",
    flex: "1 1 0px",
    flexDirection: "row",
    alignContent: "space-between",
}

const childStyle = {
    flex: "1 auto",
}
export const Split = (props: React.PropsWithChildren) =>
    <div style={style}>
        {React.Children.map(props.children, (it, index) =>
            <div key={index} style={childStyle}>{it}</div>)
        }
    </div>
