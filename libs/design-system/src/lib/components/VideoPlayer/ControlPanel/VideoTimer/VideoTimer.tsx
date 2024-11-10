import { secondsToHHMMSS } from "../../../../../utils/time";
import React from "react";

type Props = {
    duration:number,
    currentTime:number
}

export const VideoTimer : React.FC<Props> = ({
    duration,
    currentTime
})=>{
    return (
        <span className="text-white">
                {secondsToHHMMSS(currentTime)}/{secondsToHHMMSS(duration)}
        </span>
    )
} 