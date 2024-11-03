import { useVideo } from '../../../hooks/UseVideo';
import React, { useEffect } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { secondsToHHMMSS } from '../../../utils/time';

type Props = {
  src: string;
  poster?: string;
  className?: string;
};

export const VideoPlayer: React.FC<Props> = ({ src, poster = '' }) => {
  const {
    play,
    videoRef,
    pause,
    currentTime,
    isVideoLoaded,
    isVideoWaited,
    fullScreen,
    duration,
    progress,
    isPlaying,
    seek
  } = useVideo(src);
  console.log(isPlaying);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f') {
        fullScreen();
      }

      if (e.key === ' ') {
        e.preventDefault();
        isPlaying ? pause() : play();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullScreen, pause, play, isPlaying]);


  const handleSeek = (event: React.MouseEvent<HTMLProgressElement>) => {
    const progressElement = event.currentTarget;
    const rect = progressElement.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newProgress = (offsetX / progressElement.offsetWidth) * 100;
    seek(newProgress);
  };
  
  return (
    <div className="relative">
      <video src={src} className="w-full" poster={poster} ref={videoRef} />
      <div className="absolute inset-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="absolute w-full h-20 z-10 bottom-0">
        <div className="relative mx-auto w-11/12">
          <div className="mb-1">
            {/* progress bar */}
            <progress
              dir="ltr"
              max="100"
              className="w-full z-10 h-1.5 relative -top-[10px] rounded-full bg-gray-200 appearance-none [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-brand-600 [&::-webkit-progress-value]:rounded-full"
              value={progress}
              onClick={handleSeek}
            ></progress>
            <div className=" w-full h-1.5 absolute  top-0 -left-[3px]">
              <div
                style={{ left: `${progress}%` }}
                className="bg-brand-600 w-[20px] -top-1.5 absolute z-10  h-[20px] rounded-[100%]"
              ></div>
            </div>
          </div>
          {/* controls */}
          <div className="flex items-center justify-between" dir="ltr">
            <div className="flex items-center gap-4">
              <button className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                <Icon name="skip-back" />
              </button>
              {isPlaying ? (
                <Button
                  onMouseDown={pause}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      pause();
                    }
                  }}
                  mode="primary"
                  size="sm"
                  isLoading={false}
                  align="center"
                >
                  <Icon name="pause" />
                </Button>
              ) : (
                <Button
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      play();
                    }
                  }}
                  onMouseDown={play}
                  mode="primary"
                  size="sm"
                  isLoading={false}
                  align="center"
                >
                  <Icon name="play" />
                </Button>
              )}
              <button className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                <Icon name="skip-forward" />
              </button>
              <button className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                <Icon name="volume-2" />
              </button>
              <span className="text-white">
                {secondsToHHMMSS(currentTime)}/{secondsToHHMMSS(duration)}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                <Icon name="share-2" />
              </button>
              <button className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                <Icon name="settings" />
              </button>
              <button className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                <Icon name="picture-in-picture-2" />
              </button>
              <button onClick={fullScreen} className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                <Icon name="fullscreen" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
