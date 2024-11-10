import { useVideo } from '../../../hooks/UseVideo';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { secondsToHHMMSS } from '../../../utils/time';
import Draggable from 'react-draggable';

type Props = {
  src: string;
  poster?: string;
  className?: string;
};

export const VideoPlayer: React.FC<Props> = ({ src, poster = '' }) => {
  const progressBarRef = useRef<HTMLProgressElement>(null);

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
    seek,
    bufferedTime,
  } = useVideo(src);

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

  const handleDrag = (e: any, data: any) => {
    if (progressBarRef.current) {
      const progressBarWidth = progressBarRef.current.offsetWidth;
      const newProgress = (data.x / progressBarWidth) * 100;
      seek(newProgress); // Update progress bar as you drag
    }
  };

  const handleDragStop = (e: any, data: any) => {
    if (progressBarRef.current) {
      const progressBarWidth = progressBarRef.current.offsetWidth;
      const finalProgress = (data.x / progressBarWidth) * 100;
      seek(finalProgress); // Set final position on release
    }
  };

  return (
    <div className="relative">
      {/* loading displays when video is not loaded yet(even first frame) and when buffered time is finished and we are waiting for new chunks */}
      {isVideoWaited && (
        <div className="absolute flex items-center justify-center inset-0 m-auto">
          <div className="animate-spin text-gray-600 w-fit mx-auto">
            <Icon name="loader-circle" size="xl" />
          </div>
        </div>
      )}
      <video
        src={src}
        className="w-full"
        poster={'https://api.classbon.com/api/picture/20219'}
        ref={videoRef}
      />
      <div className="absolute inset-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="absolute w-full h-20 z-10 bottom-0">
        <div className="relative mx-auto w-11/12">
          <div className="mb-1">
            {/* progress bar */}
            <progress
              ref={progressBarRef}
              dir="ltr"
              max="100"
              className="w-full z-20 cursor-pointer h-1.5 relative -top-[10px] rounded-full  appearance-none [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-brand-600 [&::-webkit-progress-value]:rounded-full"
              value={progress}
              onClick={handleSeek}
            ></progress>
            <progress
              dir="ltr"
              max="100"
              className="w-full  h-1.5 z-10 absolute mx-auto left-0 top-0  rounded-full  appearance-none [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-gray-300/50 [&::-webkit-progress-value]:bg-white [&::-webkit-progress-value]:rounded-full"
              value={bufferedTime}
            ></progress>
            <div className=" w-full h-1.5 absolute  top-0 -left-[3px]">
              <Draggable
                axis="x"
                bounds="parent"
                position={{
                  x:
                    (progress / 100) *
                    (progressBarRef.current?.offsetWidth || 0),
                  y: 0,
                }}
                onDrag={handleDrag} // Updates while dragging
                onStop={handleDragStop} // Ensures position on release
              >
                <div className="bg-brand-600 left-0 z-10 cursor-pointer w-[20px] h-[20px] rounded-full absolute -top-[8px]"></div>
              </Draggable>
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
              <button
                onClick={fullScreen}
                className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all"
              >
                <Icon name="fullscreen" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
