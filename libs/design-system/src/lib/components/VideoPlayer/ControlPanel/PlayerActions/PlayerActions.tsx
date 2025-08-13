'use client';
import React, { useRef, useState } from 'react';
import { Icon } from '../../../Icon';
import { Button } from '../../../Button';
import { Tooltip } from '../../../Tooltip';
import { cn } from '../../../../../utils';

type Props = {
  isPlaying: boolean;
  pause: () => void;
  play: () => void;
  muted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (volume: number) => void;
};

export const PlayerActions: React.FC<Props> = React.memo(
  ({ isPlaying, pause, play, muted, toggleMute, volume, setVolume }) => {
    const [isDragging, setIsDragging] = useState(false);
    const volumeBarRef = useRef<HTMLDivElement>(null);

    const updateVolumeFromPosition = (clientX: number) => {
      if (!volumeBarRef.current) return;
      const rect = volumeBarRef.current.getBoundingClientRect();
      const newVolume = Math.min(
        Math.max((clientX - rect.left) / rect.width, 0),
        1,
      );
      if (muted && newVolume > 0) toggleMute();
      setVolume(newVolume);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      updateVolumeFromPosition(e.clientX);

      const handleMouseMove = (e: MouseEvent) => {
        updateVolumeFromPosition(e.clientX);
      };

      const handleMouseUp = (e: MouseEvent) => {
        updateVolumeFromPosition(e.clientX);
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      setIsDragging(true);
      updateVolumeFromPosition(e.touches[0].clientX);

      const handleTouchMove = (e: TouchEvent) => {
        updateVolumeFromPosition(e.touches[0].clientX);
      };

      const handleTouchEnd = (e: TouchEvent) => {
        updateVolumeFromPosition(e.changedTouches[0].clientX);
        setIsDragging(false);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    };

    const handleVolumeBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!volumeBarRef.current) return;
      const rect = volumeBarRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const newVolume = Math.min(Math.max(offsetX / rect.width, 0), 1);
      if (muted && newVolume > 0) toggleMute();
      setVolume(newVolume);
    };

    return (
      <>
        {/* دکمه‌های قبلی / پخش / بعدی */}
        <Tooltip offset={44} className="!z-30" title="قبلی">
          <button className="hidden items-center justify-center p-1 text-white transition-all duration-300 sm:flex">
            <Icon name="skip-back" />
          </button>
        </Tooltip>

        {isPlaying ? (
          <Tooltip offset={44} className="!z-30" title="(space) مکث ">
            <Button
              onClick={pause}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') pause();
              }}
              mode="primary"
              size="sm"
              isLoading={false}
              align="center"
            >
              <span className="hidden sm:block">
                <Icon name="pause" />
              </span>
              <span className="block sm:hidden">
                <Icon size="sm" name="pause" />
              </span>
            </Button>
          </Tooltip>
        ) : (
          <Tooltip offset={44} className="!z-30" title="(space) پخش ">
            <Button
              onClick={play}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') play();
              }}
              mode="primary"
              size="sm"
              isLoading={false}
              align="center"
            >
              <span className="hidden sm:block">
                <Icon name="play" />
              </span>
              <span className="block sm:hidden">
                <Icon size="sm" name="play" />
              </span>
            </Button>
          </Tooltip>
        )}

        <Tooltip offset={44} className="!z-30" title="بعدی">
          <button className="hidden items-center justify-center p-1 text-white transition-all duration-300 sm:flex">
            <Icon name="skip-forward" />
          </button>
        </Tooltip>

        {/* کنترل صدا */}
        <div className="group relative mx-1 flex items-center space-x-2 px-1">
          {muted ? (
            <Tooltip offset={48} title="(m) فعال کردن صدا" className="!z-30">
              <button
                onClick={toggleMute}
                className="flex items-center justify-center text-white transition-all duration-300"
              >
                <Icon name="volume-x" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip offset={46} title="(m) قطع صدا" className="!z-30">
              <button
                onClick={toggleMute}
                className="flex items-center justify-center text-white transition-all duration-300"
              >
                <Icon name="volume-2" />
              </button>
            </Tooltip>
          )}

          <Tooltip title="میزان صدا" offset={56}>
            <div
              ref={volumeBarRef}
              className={cn(
                'relative -mt-1 cursor-pointer transition-all duration-300 ease-in-out group-hover:w-16 group-hover:opacity-100',
                { 'w-0 opacity-0': !isDragging },
              )}
              onClick={handleVolumeBarClick}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <progress
                dir="ltr"
                max={1}
                className="[&::-webkit-progress-value]:bg-surface-brand-600-primary h-1 w-16 cursor-pointer appearance-none rounded-full transition-none [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:rounded-full"
                value={volume}
              />
              <div className="absolute -left-[3px] top-3 h-1 w-full">
                <div
                  className={`bg-surface-brand-600-primary duration-250 absolute -top-1 z-30 h-3 w-3 cursor-pointer rounded-full transition-colors ${
                    isDragging ? 'bg-brand-800' : ''
                  }`}
                  style={{
                    left: `${(volumeBarRef.current?.offsetWidth || 64) * volume}px`,
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </Tooltip>
        </div>
      </>
    );
  },
);
