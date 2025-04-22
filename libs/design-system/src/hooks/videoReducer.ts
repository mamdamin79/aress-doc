import { VideoState, VideoAction } from './types';

export const videoReducer = (
  state: VideoState,
  action: VideoAction,
): VideoState | undefined => {
  switch (action.type) {
    case 'PLAY':
      return {
        ...state,
        isPlaying: true,
        isFinished: false,
        isVideoWaited: false,
      };

    case 'PAUSE':
      return { ...state, isPlaying: false };

    case 'SET_RESET':
      return {
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        isFinished: false,
        progress: 0,
        isVideoLoaded: false,
        isVideoWaited: false,
        bufferedTime: 0,
        playBackRate: 1,
        volume: 1,
        muted: false,
        isFullscreen: state.isFullscreen,
        quality: action.qualities[0],
        error: null,
        src: action.src,
      };

    // ... other cases
  }
};
