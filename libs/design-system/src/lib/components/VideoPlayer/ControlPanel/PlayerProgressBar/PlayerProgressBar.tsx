'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useDraggable, DndContext } from '@dnd-kit/core';
import { PlayerThumbnail } from '../PlayerThumbnail';

interface PlayerProgressBarProps {
  duration: number;
  progress: number; // 0 to 100
  seek: (newProgress: number) => void;
  currentTime: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  bufferedTime: number;
  spriteBaseUrl?: string;
}

const DraggableHandle = ({
  progressBarRef,
  isDragging,
  onDragMove,
  onDragEnd,
  progress,
}: {
  progressBarRef: React.RefObject<HTMLProgressElement | null>;
  isDragging: boolean;
  onDragMove: (newProgress: number) => void;
  onDragEnd: (newProgress: number) => void;
  progress: number;
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: 'progress-handle',
  });

  const [position, setPosition] = useState(0);
  const dragOffsetRef = useRef(0);

  useEffect(() => {
    if (!progressBarRef.current || isDragging) return;
    const width = progressBarRef.current.offsetWidth;
    setPosition((width * progress) / 100);
  }, [progress, progressBarRef, isDragging]);

  const onPointerDown = (event: React.PointerEvent) => {
    if (!progressBarRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    dragOffsetRef.current = event.clientX - rect.left;
  };

  // when we are dragging
  const onPointerMove = (event: PointerEvent) => {
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    let newX = event.clientX - rect.left - dragOffsetRef.current;
    if (newX < 0) newX = 0;
    if (newX > rect.width) newX = rect.width;

    setPosition(newX);
    const newProgress = (newX / rect.width) * 100;
    onDragMove(newProgress);
  };

  // finish drag
  const onPointerUp = (event: PointerEvent) => {
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    let finalX = event.clientX - rect.left - dragOffsetRef.current;
    if (finalX < 0) finalX = 0;
    if (finalX > rect.width) finalX = rect.width;

    const finalProgress = (finalX / rect.width) * 100;
    onDragEnd(finalProgress);

    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  };

  // drag start
  const onPointerDownWrapper = (event: React.PointerEvent) => {
    onPointerDown(event);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onPointerDown={onPointerDownWrapper}
      style={{
        transform: `translate3d(${position}px, 0, 0)`,
        touchAction: 'none',
      }}
      className={`bg-surface-brand-600-primary duration-250 absolute -top-[8px] left-0 z-30 h-[20px] w-[20px] cursor-pointer rounded-full transition-colors`}
    />
  );
};

export const PlayerProgressBar: React.FC<PlayerProgressBarProps> = ({
  seek,
  progress,
  duration,
  videoRef,
  bufferedTime,
  spriteBaseUrl,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLProgressElement | null>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  // what time is hovering now
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

  const onDragMove = (newProgress: number) => {
    seek(newProgress);
    setIsDragging(true);
  };

  const onDragEnd = (finalProgress: number) => {
    seek(finalProgress);
    setIsDragging(false);
  };

  return (
    <>
      <progress
        ref={progressBarRef}
        dir="ltr"
        max={100}
        className="[&::-webkit-progress-value]:bg-surface-brand-600-primary relative -top-[9px] z-20 h-2 w-full cursor-pointer appearance-none rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:rounded-full"
        value={progress}
        onClick={handleSeek}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      <PlayerThumbnail
        duration={duration}
        hoverTime={hoverTime}
        videoRef={videoRef}
        spriteBaseUrl={spriteBaseUrl}
      />

      <progress
        dir="ltr"
        max={100}
        className="absolute left-0 top-0 z-10 mx-auto h-1.5 w-full appearance-none rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-gray-300/50 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-white"
        value={bufferedTime}
      />

      <div className="absolute -left-[3px] top-0 h-1.5 w-full">
        <DndContext>
          <DraggableHandle
            progress={progress}
            progressBarRef={progressBarRef}
            isDragging={isDragging}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
          />
        </DndContext>
      </div>
    </>
  );
};
