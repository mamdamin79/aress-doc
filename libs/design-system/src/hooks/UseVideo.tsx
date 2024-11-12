import { useCallback, useEffect, useReducer, useRef } from 'react';
import Hls from 'hls.js'; // Import HLS.js

interface videoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isFinished: boolean;
  progress: number;
  isVideoLoaded: boolean;
  isVideoWaited: boolean; //buffering
  bufferedTime:number,
  playBackRate:number,
  volume:number,
  muted:boolean
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
  | { type: 'SET_BUFFERED_TIME'; bufferedTime: number }
  | { type: 'SET_PLAYBACK_RATE'; playBackRate: number }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'SET_MUTED'; muted: boolean };

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
      case 'SET_PLAYBACK_RATE':
      return {
        ...state,
        playBackRate : action.playBackRate,
      };
      case 'SET_VOLUME':
      return {
        ...state,
        volume : action.volume,
      };
      case 'SET_MUTED':
      return {
        ...state,
        muted : action.muted,
      };
      break;
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
    playBackRate:1,
    volume:1,
    muted:false
  });
  useEffect(() => {
    const video = videoRef.current!;
    // Check if the source is M3U8
    if (src.endsWith('.m3u8')) {
      // Initialize HLS if the video format is M3U8
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src); // Load the M3U8 source
        hls.attachMedia(video); // Attach the media element
        // hls.on(Hls.Events.MANIFEST_PARSED, () => {
        //   video.muted=true
        //   video.play(); // Start playing when manifest is parsed
        // });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // For browsers that support HLS natively (like Safari)
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }
    } else {
      // If it's not M3U8, set the video source directly
      video.src = src;
    }
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
  const play = useCallback(() => videoRef.current?.play(), []);
  const pause = useCallback(() => videoRef.current?.pause(), []);
  const fullScreen = useCallback(() => videoRef.current?.requestFullscreen(), []);
  const pictureInPicture = useCallback(() => videoRef.current?.requestPictureInPicture(), []);
  const seek = (newProgress: number) => {
    if (videoRef.current) {
      const newTime = (newProgress / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      dispatch({ type: 'SET_PROGRESS', progress: newProgress });
      dispatch({ type: 'TIME_UPDATE', currentTime: newTime });
    }
  };
  const setPlaybackRate = useCallback((rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      dispatch({ type: 'SET_PLAYBACK_RATE', playBackRate: rate });
    }
  }, []);  

  const setVolume = useCallback((volume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      dispatch({ type: 'SET_VOLUME', volume });
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      dispatch({ type: 'SET_MUTED', muted: newMutedState });
    }
  }, []);

  return {
    ...state,
    videoRef,
    play,
    pause,
    fullScreen,
    seek,
    pictureInPicture,
    setPlaybackRate,
    setVolume,
    toggleMute,
  };
};
