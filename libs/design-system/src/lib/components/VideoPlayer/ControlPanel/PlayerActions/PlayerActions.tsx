import React, { useRef, useState } from 'react';
import { Icon } from '../../../Icon';
import { Button } from '../../../Button';
import { Tooltip } from '../../../Tooltip';
import Draggable from 'react-draggable';

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
    const volumeBarRef = useRef<HTMLProgressElement>(null);

    const handleDragStart = () => {
      setIsDragging(true);
    };

    const handleDrag = (_: any, data: any) => {
      if (volumeBarRef.current) {
        const volumeBarWidth = volumeBarRef.current.offsetWidth;
        const newVolume = Math.min(Math.max(data.x / volumeBarWidth, 0), 1);
        if (muted && newVolume > 0) {
          toggleMute();
        }
        setVolume(newVolume);
      }
    };

    const handleDragStop = (_: any, data: any) => {
      setIsDragging(false);
      if (volumeBarRef.current) {
        const volumeBarWidth = volumeBarRef.current.offsetWidth;
        const finalVolume = Math.min(Math.max(data.x / volumeBarWidth, 0), 1);
        if (muted && finalVolume > 0) {
          toggleMute();
        }
        setVolume(finalVolume);
      }
    };

    const handleVolumeBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!volumeBarRef.current) return;

      const rect = volumeBarRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const newVolume = Math.min(Math.max(offsetX / rect.width, 0), 1);

      if (muted && newVolume > 0) {
        toggleMute();
      }
      setVolume(newVolume);
    };

    return (
      <>
        <button className="hidden items-center justify-center p-1 text-white transition-all duration-300 sm:flex">
          <Icon name="skip-back" />
        </button>
        {isPlaying ? (
          <Tooltip offset={44} className="!z-30" title="(space) مکث ">
            <Button
              onClick={pause}
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  play();
                }
              }}
              onClick={play}
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
        <button className="hidden items-center justify-center p-1 text-white transition-all duration-300 sm:flex">
          <span className="hidden sm:block">
            <Icon name="skip-forward" />
          </span>
          <span className="block sm:hidden">
            <Icon size="sm" name="skip-forward" />
          </span>
        </button>
        <div className="group relative flex items-center space-x-2 px-2">
          {muted ? (
            <Tooltip offset={48} title="(m) فعال کردن صدا" className="!z-30">
              <button
                onClick={toggleMute}
                className="flex items-center justify-center text-white transition-all duration-300"
              >
                <span className="hidden sm:block">
                  <Icon name="volume-x" />
                </span>
                <span className="block sm:hidden">
                  <Icon size="sm" name="volume-x" />
                </span>
              </button>
            </Tooltip>
          ) : (
            <Tooltip offset={46} title="(m) قطع صدا" className="!z-30">
              <button
                onClick={toggleMute}
                className="flex items-center justify-center text-white transition-all duration-300"
              >
                <span className="hidden sm:block">
                  <Icon name="volume-2" />
                </span>
                <span className="block sm:hidden">
                  <Icon size="sm" name="volume-2" />
                </span>
              </button>
            </Tooltip>
          )}
          <Tooltip title="میزان صدا" offset={56}>
            <div
              className="relative hidden w-16 cursor-pointer transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100"
              onClick={handleVolumeBarClick}
            >
              <progress
                ref={volumeBarRef}
                dir="ltr"
                max="1"
                className="[&::-webkit-progress-value]:bg-brand-600 h-1 w-full cursor-pointer appearance-none rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:rounded-full"
                value={volume}
              />
              <div className="absolute -left-[3px] top-3 h-1 w-full">
                <Draggable
                  axis="x"
                  bounds="parent"
                  position={{
                    x: volume * (volumeBarRef.current?.offsetWidth || 64),
                    y: 0,
                  }}
                  onStart={handleDragStart}
                  onDrag={handleDrag}
                  onStop={handleDragStop}
                >
                  <div
                    className={`bg-brand-600 duration-250 absolute -top-1 left-0 z-30 h-3 w-3 cursor-pointer rounded-full transition-colors ${
                      isDragging && 'bg-brand-800'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Draggable>
              </div>
            </div>
          </Tooltip>
        </div>
      </>
    );
  },
);
