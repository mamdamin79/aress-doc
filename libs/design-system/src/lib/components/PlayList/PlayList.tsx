import React, { useState } from 'react';
import { Icon } from '../Icon';
import { secondsToHHMMSS } from '../../../utils/time';
import { cn } from '../../../utils/classNames.utils';

type PlayListPropsType = {
  videos: video[];
  playListTitle: string;
  isFullscreen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

type video = {
  src: string;
  title: string;
  date: string;
};

export const PlayList: React.FC<PlayListPropsType> = ({
  videos,
  playListTitle,
  isFullscreen = false,
  onClose,
}) => {
  return (
    <div>
      {isFullscreen ? (
        <div className="bg-gray-900/90 text-white h-screen w-[440px]">
          <div className="flex items-center px-6 pb-2 pt-8 justify-between text-xl font-medium">
            <span>{playListTitle}</span>
            <span onClick={() => onClose} className="cursor-pointer">
              <Icon name="x" size="lg" />
            </span>
          </div>
          <div className="pt-12 px-6">
            {videos.map((video, index) => (
              <PlayListCell
                index={index}
                date={video.date}
                src={video.src}
                title={video.title}
                isFullscreen={isFullscreen}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl font-medium text-lg text-gray-1000 border-1.5 border-gray-300 w-[440px] ">
          <div className="p-6 border-b-1.5 border-gray-300">
            {playListTitle}
          </div>
          <div className="p-6">
            {videos.map((video, index) => (
              <PlayListCell
                index={index}
                date={video.date}
                src={video.src}
                title={video.title}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PlayListCell: React.FC<
  video & { index: number; isFullscreen?: boolean }
> = ({ date, src, title, index, isFullscreen = false }) => {
  const [durations, setDurations] = useState<Record<number, string>>({});

  const handleLoadedMetadata = (
    index: number,
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const videoElement = event.currentTarget;
    const duration = videoElement.duration; // Duration in seconds
    setDurations((prev) => ({ ...prev, [index]: secondsToHHMMSS(duration) }));
  };

  return (
    <div
      className={cn('rounded-lg bg-gray-100 gap-2 p-3 mb-3 flex items-center', {
        'bg-black/30': isFullscreen,
      })}
      key={`title-${title}`}
    >
      <span
        className={cn('text-md  text-gray-1000 font-medium', {
          'text-white': isFullscreen,
        })}
      >
        {++index}
      </span>
      <div className="flex relative items-center justify-between gap-3">
        <video
          className="rounded-sm"
          width={100}
          height={56}
          src={src}
          onLoadedMetadata={(event) => handleLoadedMetadata(index, event)}
        ></video>
        {durations[index] && (
          <span className="text-white bg-black/55 px-1 absolute right-1 rounded-xs  bottom-1 font-medium text-xs">
            {durations[index]}
          </span>
        )}
        <div>
          <span
            className={cn('text-gray-1000 font-medium text-sm line-clamp-1', {
              'text-white': isFullscreen,
            })}
          >
            {title}
          </span>
          <span
            className={cn(
              'text-gray-600 font-medium text-xs flex items-center gap-1',
              { 'text-white': isFullscreen }
            )}
          >
            <Icon name="calendar-days" /> {date}
          </span>
        </div>
      </div>
    </div>
  );
};
