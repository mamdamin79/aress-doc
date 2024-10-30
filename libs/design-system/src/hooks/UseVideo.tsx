interface videoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isFinished: boolean;
  progress: number;
  isVideoLoaded: boolean;
  isVideoWaited: boolean; //buffering
}

type videoAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TIME_UPDATE'; currentTime: number }
  | { type: 'DURATION_CHANGE'; duration: number }
  | { type: 'SET_FINISHED'; isFinished: boolean }
  | { type: 'SET_PROGRESS'; progress: number }
  | { type: 'SET_VIDEO_LOADED'; isVideoLoaded: boolean }
  | { type: 'SET_VIDEO_WAITED'; isVideoWaited: boolean };

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

    default:
      return state;
      break;
  }
};
