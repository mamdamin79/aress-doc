'use client';
import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { PlayerThumbnail } from '../PlayerThumbnail';

interface PlayerProgressBarProps {
  duration: number;
  progress: number;
  seek: (newProgress: number) => void;
  currentTime: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  bufferedTime: number;
  spriteBaseUrl?: string;
}

export const PlayerProgressBar: React.FC<PlayerProgressBarProps> = ({
  seek,
  progress,
  duration,
  videoRef,
  bufferedTime,
  spriteBaseUrl,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLProgressElement>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLProgressElement>) => {
    if (!videoRef || !progressBarRef.current || !videoRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const hoverPosition = e.clientX - rect.left;
    const videoDuration = videoRef.current.duration;

    const time = (hoverPosition / rect.width) * videoDuration;
    setHoverTime(time);
  };

  const handleMouseLeave = () => setHoverTime(null);

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

  // throttle this func
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrag = (e: any, data: any) => {
    if (progressBarRef.current) {
      const progressBarWidth = progressBarRef.current.offsetWidth;
      const newProgress = (data.x / progressBarWidth) * 100;
      seek(newProgress); // Update progress bar as you drag
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStop = (e: any, data: any) => {
    setIsDragging(false);
    if (progressBarRef.current) {
      const progressBarWidth = progressBarRef.current.offsetWidth;
      const finalProgress = (data.x / progressBarWidth) * 100;
      seek(finalProgress); // Set final position on release
    }
  };

  return (
    <>
      <progress
        ref={progressBarRef}
        dir="ltr"
        max="100"
        className="[&::-webkit-progress-value]:bg-brand-600 relative -top-[9px] z-20 h-2 w-full cursor-pointer appearance-none rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:rounded-full"
        value={progress}
        onClick={handleSeek}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      ></progress>
      <PlayerThumbnail
        duration={duration}
        hoverTime={hoverTime}
        videoRef={videoRef}
        spriteBaseUrl={spriteBaseUrl}
      />
      <progress
        dir="ltr"
        max="100"
        className="absolute left-0 top-0 z-10 mx-auto h-1.5 w-full appearance-none rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-gray-300/50 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-white"
        value={bufferedTime}
      ></progress>
      <div className="absolute -left-[3px] top-0 h-1.5 w-full">
        <Draggable
          axis="x"
          bounds="parent"
          position={{
            x: (progress / 100) * (progressBarRef.current?.offsetWidth || 0),
            y: 0,
          }}
          onStart={handleDragStart}
          onDrag={handleDrag} // Updates while dragging
          onStop={handleDragStop} // Ensures position on release
        >
          <div
            className={`bg-brand-600 duration-250 absolute -top-[8px] left-0 z-30 h-[20px] w-[20px] cursor-pointer rounded-full transition-colors ${
              isDragging && 'bg-brand-800'
            }`}
          ></div>
        </Draggable>
      </div>
    </>
  );
};
