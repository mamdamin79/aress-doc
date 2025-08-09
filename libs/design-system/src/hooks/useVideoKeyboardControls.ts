import { useEffect } from 'react';
interface VideoControls {
  play: () => void;
  pause: () => void;
  fullScreen: () => void;
  toggleMute: () => void;
  pictureInPicture: () => void;
}

export const useVideoKeyboardControls = (
  videoRef: React.RefObject<HTMLVideoElement>,
  controls: VideoControls,
  isPlaying: boolean,
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyHandlers: Record<string, () => void> = {
        Space: () => {
          e.preventDefault();
          if (isPlaying) controls.pause();
          else controls.play();
        },
        KeyF: controls.fullScreen,
        KeyM: controls.toggleMute,
        KeyI: controls.pictureInPicture,
        ArrowRight: () => {
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(
              videoRef.current.currentTime + 10,
              videoRef.current.duration,
            );
          }
        },
        ArrowLeft: () => {
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(
              videoRef.current.currentTime - 10,
              0,
            );
          }
        },
      };

      const handler = keyHandlers[e.code];
      if (handler) handler();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, controls, videoRef]);
};
