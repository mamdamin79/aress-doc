import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';

type Props = {
  duration: number;
  progress: number;
  seek: (newProgress: number) => void;
  currentTime: number;
  videoRef: React.RefObject<HTMLVideoElement>;
  bufferedTime: number;
};

export const PlayerProgressBar: React.FC<Props> = ({
  seek,
  progress,
  currentTime,
  duration,
  videoRef,
  bufferedTime,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLProgressElement>(null);
  const thumbnailPreviewRef = useRef<HTMLDivElement>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
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
        Math.floor(((hoverTime % 50) / 50) * totalFrames),
        totalFrames - 1
      )
    : null;

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

  return (
    <>
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
            x: (progress / 100) * (progressBarRef.current?.offsetWidth || 0),
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
    </>
  );
};
