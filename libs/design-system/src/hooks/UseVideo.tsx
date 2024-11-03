import { useEffect, useReducer, useRef } from 'react';

interface videoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isFinished: boolean;
  progress: number;
  isVideoLoaded: boolean;
  isVideoWaited: boolean; //buffering
  bufferedTime:number
}

type videoAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TIME_UPDATE'; currentTime: number }
  | { type: 'DURATION_CHANGE'; duration: number }
  | { type: 'SET_FINISHED'; isFinished: boolean }
  | { type: 'SET_PROGRESS'; progress: number }
  | { type: 'SET_VIDEO_LOADED'; isVideoLoaded: boolean }
  | { type: 'SET_VIDEO_WAITED'; isVideoWaited: boolean }
  | { type: 'SET_BUFFERED_TIME'; bufferedTime: number };

const videoReducer = (state: videoState, action: videoAction): videoState => {
  switch (action.type) {
    case 'PLAY':
      return {
        ...state,
        isPlaying: true,
        isFinished: false,
        isVideoWaited: false,
      };
      break;
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false,
      };
      break;
    case 'TIME_UPDATE':
      return {
        ...state,
        currentTime: action.currentTime,
      };
      break;
    case 'DURATION_CHANGE':
      return {
        ...state,
        duration: action.duration,
      };
      break;
    case 'SET_FINISHED':
      return {
        ...state,
        isFinished: action.isFinished,
      };
      break;
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.progress,
      };
      break;
    case 'SET_VIDEO_LOADED':
      return {
        ...state,
        isVideoLoaded: action.isVideoLoaded,
      };
      break;
    case 'SET_VIDEO_WAITED':
      return {
        ...state,
        isVideoWaited: action.isVideoWaited,
      };
      break;
      case 'SET_BUFFERED_TIME':
      return {
        ...state,
        bufferedTime: action.bufferedTime,
      };
    default:
      return state;
      break;
  }
};

export const useVideo = (src: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, dispatch] = useReducer(videoReducer, {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isFinished: false,
    progress: 0,
    isVideoLoaded: false,
    isVideoWaited: false, //buffering
    bufferedTime:0,
  });
  useEffect(() => {
    const video = videoRef.current!;
    video.src = src;

    // dispatcher functions - these are update our states and used as a callback function in our listener

    
    const updateBufferedTime = () => {
      const buffered = video.buffered;
      const duration = video.duration;
      if (buffered.length > 0) {
        const bufferedTime = (buffered.end(buffered.length - 1) / duration) * 100;
        dispatch({ type: 'SET_BUFFERED_TIME', bufferedTime });
      }
    };

    const updateProgress = () => {
      // first of all we should calculate progress form duration and current time - it used in handle time update and handle durationchange
      const { currentTime, duration } = videoRef.current!;
      const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
      dispatch({ type: 'SET_PROGRESS', progress });
    };

    const handlePlay = () => {
      dispatch({ type: 'PLAY' });
    };

    const handlePause = () => {
      dispatch({ type: 'PAUSE' });
    };

    const handleTimeUpdate = () => {
      dispatch({
        type: 'TIME_UPDATE',
        currentTime: videoRef.current!.currentTime,
      });
      updateProgress();
    };

    const handleDurationChange = () => {
      dispatch({
        type: 'DURATION_CHANGE',
        duration: videoRef.current!.duration,
      });
      updateProgress();
    };

    const handleLoadedData = () => {
      dispatch({ type: 'SET_VIDEO_LOADED', isVideoLoaded: true });
    };

    const handlePlaying = () => {
      dispatch({ type: 'SET_VIDEO_WAITED', isVideoWaited: false });
    };

    const handleEnded = () => {
      dispatch({ type: 'SET_FINISHED', isFinished: true });
    };

    const handleWaiting = () => {
      dispatch({ type: 'SET_VIDEO_WAITED', isVideoWaited: true });
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    // it raises every moment
    video.addEventListener('timeupdate', handleTimeUpdate);
    // it raise just one time when the video loaded for the first time
    video.addEventListener('durationchange', handleDurationChange);
    // when the video finished
    video.addEventListener('ended', handleEnded);
    // when the first frame of video loaded
    video.addEventListener('loadeddata', handleLoadedData);
    // when the streamed goes to end and video is waiting for new chunks
    video.addEventListener('waiting', handleWaiting);
    // after waiting (when the new chunks loaded) playing event raises
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('progress', updateBufferedTime);


    return () => {
      // clean up listeners
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('progress', updateBufferedTime);
    };
  }, [src]);
  const play = () => videoRef.current!.play();
  const pause = () => videoRef.current!.pause();
  const fullScreen = () => videoRef.current!.requestFullscreen();
  const seek = (newProgress: number) => {
    if (videoRef.current) {
      const newTime = (newProgress / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      dispatch({ type: 'SET_PROGRESS', progress: newProgress });
      dispatch({ type: 'TIME_UPDATE', currentTime: newTime });
    }
  };
  return {
    ...state,
    videoRef,
    play,
    pause,
    fullScreen,
    seek
  };
};
