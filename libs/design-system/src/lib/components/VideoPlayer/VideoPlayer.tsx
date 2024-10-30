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
    const {play,videoRef,pause,currentTime,isVideoLoaded,isVideoWaited,fullScreen,duration} = useVideo(src)
    return(
        <div className="relative">
            <video src={src} className="w-full" poster={poster} ref={videoRef} />
        </div>
    )
}