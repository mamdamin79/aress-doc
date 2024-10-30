import { useVideo } from "../../../hooks/UseVideo"
import React from "react"

type Prosp = {
    src:string,
    poster?:string,
    className?:string
}

export const VideoPlayer : React.FC<Prosp> = ({
    src,
    poster=""
})=>{
    const {play,videoRef,pause} = useVideo(src)
    return(
        <></>
    )
}