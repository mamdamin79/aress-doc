export interface VideoQuality {
  src: string;
  label: string;
}

export interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isFinished: boolean;
  progress: number;
  isVideoLoaded: boolean;
  isVideoWaited: boolean;
  bufferedTime: number;
  playBackRate: number;
  volume: number;
  muted: boolean;
  isFullscreen: boolean;
  quality: VideoQuality;
  error: string | null;
  src: string;
}

export type VideoAction =
  | { type: 'PLAY' | 'PAUSE' }
  | { type: 'TIME_UPDATE'; currentTime: number }
  | { type: 'DURATION_CHANGE'; duration: number }
  | {
      type: 'SET_FINISHED' | 'SET_VIDEO_LOADED' | 'SET_VIDEO_WAITED';
      value: boolean;
    }
  | { type: 'SET_PROGRESS' | 'SET_BUFFERED_TIME'; value: number }
  | { type: 'SET_PLAYBACK_RATE'; playBackRate: number }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'SET_MUTED' | 'SET_FULLSCREEN'; value: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SET_QUALITY'; quality: VideoQuality }
  | { type: 'SET_RESET'; src: string; qualities: VideoQuality[] };
