interface videoState {
    isPlaying:boolean;
    currentTime:number;
    duration:number;
    isFinished:boolean;
    progress:number;
    isVideoLoaded:boolean;
    isVideoWaited:boolean; //buffering
}

type videoAction = {type:"PLAY"} | {type:"PAUSE"} | {type:"TIME_UPDATE",currentTime:number} | {type:"DURATION_CHANGE",duration:number} | {type:"SET_FINISHED",isFinished:boolean} | {type:"SET_PROGRESS",progress:number} | {type:"SET_VIDEO_LOADED",isVideoLoaded:boolean} | {type:"SET_VIDEO_WAITED",isVideoWaited:boolean}