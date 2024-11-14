import { useVideo } from '../../../hooks/UseVideo';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import Draggable from 'react-draggable';
import { VideoTimer } from './ControlPanel/VideoTimer/VideoTimer';
import { PlayerActions } from './ControlPanel/PlayerActions/PlayerActions';
import { PlayerOptions } from './ControlPanel/PlayerOptions/PlayerOptions';
import { cn } from '../../../utils/classNames.utils';

type Props = {
  src: string;
  poster?: string;
  className?: string;
  title: string;
};

export const VideoPlayer: React.FC<Props> = ({ src, poster = '', title }) => {
  const progressBarRef = useRef<HTMLProgressElement>(null);
  const thumbnailPreviewRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
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
    pictureInPicture,
    setPlaybackRate,
    playBackRate,
    muted,
    setVolume,
    volume,
    toggleMute,
    videoContainerRef,
    isFullscreen,
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

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (e: any, data: any) => {
    if (progressBarRef.current) {
      const progressBarWidth = progressBarRef.current.offsetWidth;
      const newProgress = (data.x / progressBarWidth) * 100;
      seek(newProgress); // Update progress bar as you drag
    }
  };

  const handleDragStop = (e: any, data: any) => {
    setIsDragging(false);
    if (progressBarRef.current) {
      const progressBarWidth = progressBarRef.current.offsetWidth;
      const finalProgress = (data.x / progressBarWidth) * 100;
      seek(finalProgress); // Set final position on release
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLProgressElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const hoverPosition = e.clientX - rect.left;
    const videoDuration = videoRef.current.duration;

    const time = (hoverPosition / rect.width) * videoDuration;
    setHoverTime(time);
  };

  const handleMouseLeave = () => setHoverTime(null);

  const getSpriteSrc = (time: number) => {
    const spriteIndex = Math.floor(time / 50); 
    return `https://i.ytimg.com/sb/IUN664s7N-c/storyboard3_L2/M${spriteIndex}.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgj1q72HBg==&sigh=rs%24AOn4CLBhd7rnvFipMzPBtjexgttEKWrSKA`;
  };

  const frameWidth = 160;
  const frameHeight = 90;
  const totalFrames = 25;
  const rowFrames = 5; 

  const currentFrame = hoverTime
  ? Math.min(
      Math.floor((hoverTime % 50 / 50) * totalFrames),
      totalFrames - 1
    )
  : null;

  return (
    <div className="relative" ref={videoContainerRef}>
      {/* loading displays when video is not loaded yet(even first frame) and when buffered time is finished and we are waiting for new chunks */}
      {isVideoWaited && (
        <div className="absolute z-30 flex items-center justify-center inset-0 m-auto">
          <div className="animate-spin text-gray-600 w-fit mx-auto">
            <Icon name="loader-circle" size="xl" />
          </div>
        </div>
      )}
      <h2 className="absolute text-white text-xl font-semibold mt-8 flex gap-1 items-center">
        <span className="mr-8">
          <Icon name="list-video" size="lg" />
        </span>
        {title}
      </h2>
      <video
        src={src}
        className="w-full"
        poster={'https://api.classbon.com/api/picture/20219'}
        ref={videoRef}
      />
      <div className="absolute inset-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div
        className={cn('absolute w-full h-20 z-10 bottom-0', {
          // 'opacity-50 pointer-events-none': !isVideoLoaded,
        })}
      >
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
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            ></progress>
            {hoverTime !== null && currentFrame !== null && (
              <div
                ref={thumbnailPreviewRef}
                className="absolute -top-24 translate-x-[-50%] bg-black border border-gray-300"
                style={{
                  width: frameWidth,
                  height: frameHeight,
                  backgroundImage: `url(${getSpriteSrc(hoverTime)})`,
                  backgroundPosition: `${
                    -(currentFrame % rowFrames) * frameWidth
                  }px ${-Math.floor(currentFrame / rowFrames) * frameHeight}px`,
                  left: `${(hoverTime / duration) * 100}%`,
                }}
              ></div>
            )}
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
                onStart={handleDragStart}
                onDrag={handleDrag} // Updates while dragging
                onStop={handleDragStop} // Ensures position on release
              >
                <div
                  className={`bg-brand-600 left-0 z-30 cursor-pointer w-[20px] h-[20px] rounded-full absolute -top-[8px] transition-colors duration-250 ${
                    isDragging && 'bg-brand-800'
                  }`}
                ></div>
              </Draggable>
            </div>
          </div>
          {/* controls */}
          <div className={cn('flex items-center justify-between')} dir="ltr">
            <div className="flex justify-between items-center gap-4 ">
              <PlayerActions
                setVolume={setVolume}
                volume={volume}
                toggleMute={toggleMute}
                muted={muted}
                isPlaying={isPlaying}
                pause={pause}
                play={play}
              />
              <VideoTimer duration={duration} currentTime={currentTime} />
            </div>
            <PlayerOptions
              isFullscreen={isFullscreen}
              playBackRate={playBackRate}
              setPlaybackRate={setPlaybackRate}
              fullScreen={fullScreen}
              pictureInPicture={pictureInPicture}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
