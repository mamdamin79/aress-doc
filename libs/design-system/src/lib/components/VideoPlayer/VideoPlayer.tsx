import { useVideo } from "../../../hooks/UseVideo"
import React from "react"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { secondsToHHMMSS } from "../../../utils/time"

type Prosp = {
    src:string,
    poster?:string,
    className?:string
}

export const VideoPlayer : React.FC<Prosp> = ({
    src,
    poster=""
})=>{
    const {play,videoRef,pause,currentTime,isVideoLoaded,isVideoWaited,fullScreen,duration,progress,isPlaying} = useVideo(src)
    return(
        <div className="relative">
            <video src={src} className="w-full" poster={poster} ref={videoRef} />
            <div className="absolute w-full bg-red-200 h-20 flex flex-col gap-4 bottom-4 px-8 ">
                {/* progress bar */}
                    {/* <progress value={progress}></progress> */}
                    <div className="w-full bg-blue-200 h-5"></div>
                {/* controls */}
                <div className="flex items-center justify-between " dir="ltr">
                    <div className="flex items-center gap-4">
                        <Button mode="primary" size="sm" isLoading={false} align="center"><Icon name="skip-back"/></Button>
                        {isPlaying ? <Button onClick={pause} mode="primary" size="sm" isLoading={false} align="center"><Icon name="pause"/></Button>: <Button onClick={play} mode="primary" size="sm" isLoading={false} align="center"><Icon name="play"/></Button>}
                        <Button mode="primary" size="sm" isLoading={false} align="center"><Icon name="skip-forward"/></Button>
                        <Button mode="primary" size="sm" isLoading={false} align="center"><Icon name="volume-2"/></Button>
                        <span className="text-white">{secondsToHHMMSS(currentTime)}/{secondsToHHMMSS(duration)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}