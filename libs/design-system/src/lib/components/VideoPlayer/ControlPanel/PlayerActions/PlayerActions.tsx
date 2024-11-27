import React from 'react';
import { Icon } from '../../../Icon';
import { Button } from '../../../Button';
import { Tooltip } from '../../../Tooltip';

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
    const handleVolumeClick = (
      e: React.MouseEvent<HTMLProgressElement, MouseEvent>
    ) => {
      const progressBar = e.currentTarget;
      const clickPosition =
        e.clientX - progressBar.getBoundingClientRect().left;
      const newVolume = Math.min(
        Math.max(clickPosition / progressBar.offsetWidth, 0),
        1
      );
      setVolume(newVolume);
    };
    return (
      <>
        <button className="text-white  items-center justify-center p-1 sm:flex hidden  duration-300 transition-all">
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
              <Icon name="pause" />
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
              <Icon name="play" />
            </Button>
          </Tooltip>
        )}
        <button className="text-white  items-center justify-center p-1 sm:flex hidden  duration-300 transition-all">
          <Icon name="skip-forward" />
        </button>
        <div className="group relative flex items-center space-x-2">
          {muted ? (
            <Tooltip offset={48} title="(m) فعال کردن صدا" className="!z-30">
              <button
                onClick={toggleMute}
                className=" text-white flex items-center justify-center p-1 duration-300 transition-all"
              >
                <Icon name="volume-x" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip offset={46} title="(m) قطع صدا" className="!z-30">
              <button
                onClick={toggleMute}
                className="text-white flex items-center justify-center p-1 duration-300 transition-all"
              >
                <Icon name="volume-2" />
              </button>
            </Tooltip>
          )}
          <Tooltip title="میزان صدا" offset={56}>
            <progress
              dir="ltr"
              max="1"
              className="hidden group-hover:block group-hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer h-1 rounded-full appearance-none [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-white w-16 [&::-webkit-progress-value]:bg-brand-600 [&::-webkit-progress-value]:rounded-full"
              value={volume}
              onClick={handleVolumeClick}
            ></progress>
          </Tooltip>
        </div>
      </>
    );
  }
);
