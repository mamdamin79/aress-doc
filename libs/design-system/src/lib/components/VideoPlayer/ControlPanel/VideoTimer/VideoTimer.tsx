import { secondsToHHMMSS } from "../../../../../utils/time";
import React, { useMemo } from "react";

type Props = {
    duration:number,
    currentTime:number
}

export const VideoTimer : React.FC<Props> = React.memo(({
    duration,
    currentTime
})=>{
    return (
        <span className="text-white">
                {secondsToHHMMSS(currentTime)}/{useMemo(() => secondsToHHMMSS(duration), [duration])}
        </span>
    )
})