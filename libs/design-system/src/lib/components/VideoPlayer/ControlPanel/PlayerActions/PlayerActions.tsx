import React from 'react';
import { Icon } from '../../../Icon';
import { Button } from '../../../Button';
import { Tooltip } from '../../../Tooltip';

type Props = {
  isPlaying: boolean;
  pause: () => void;
  play: () => void;
};

export const PlayerActions: React.FC<Props> = React.memo(
  ({ isPlaying, pause, play }) => {
    return (
      <>
        <button className="text-white flex items-center justify-center p-1  duration-300 transition-all">
          <Icon name="skip-back" />
        </button>
        {isPlaying ? (
          <Tooltip className="!z-20" title="مکث (space)">
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
          </Tooltip>
        ) : (
          <Tooltip className="!z-20" title="پخش (space)">
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
          </Tooltip>
        )}
        <button className="text-white flex items-center justify-center p-1  duration-300 transition-all">
          <Icon name="skip-forward" />
        </button>
        <Tooltip title='صدا' className='!z-20'>
          <button className="text-white flex items-center justify-center p-1  duration-300 transition-all">
            <Icon name="volume-2" />
          </button>
        </Tooltip>
      </>
    );
  }
);
