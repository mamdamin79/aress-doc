import React, { useRef, useState } from 'react';
import { Icon } from '../Icon';
import { secondsToHHMMSS } from '../../../utils/time';
import { cn } from '../../../utils/classNames.utils';
import { Video } from '../VideoPlayer/VideoPlayer.types';

type PlayListPropsType = {
  videos: Video[];
  playListTitle: string;
  isFullscreen: boolean;
  setShowPlayList?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedVideo: React.Dispatch<React.SetStateAction<Video>>;
  selectedVideo: Video;
};

export const PlayList: React.FC<PlayListPropsType> = ({
  videos,
  playListTitle,
  isFullscreen = false,
  setShowPlayList,
  setSelectedVideo,
  selectedVideo,
}) => {
  return (
    <div>
      {isFullscreen ? (
        <div className="h-screen w-[440px] bg-gray-900/90 text-white transition-all duration-300">
          <div className="flex items-center justify-between px-6 pb-2 pt-8 text-xl font-medium">
            <span>{playListTitle}</span>
            <div
              onMouseUp={() => setShowPlayList && setShowPlayList(false)}
              className="cursor-pointer p-1"
            >
              <Icon name="x" size="lg" />
            </div>
          </div>
          <div className="px-6 pt-12">
            {videos.map((video, index) => (
              <PlayListCell
                qualities={video.qualities}
                key={index}
                poster={video.poster}
                index={index}
                date={video.date}
                src={video.src}
                title={video.title}
                isFullscreen={isFullscreen}
                setSelectedVideo={setSelectedVideo}
                selectedVideo={selectedVideo}
                spriteBaseUrl={video.spriteBaseUrl}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-1000 border-1.5 h-[459px] w-[440px] overflow-auto rounded-3xl border-gray-300 text-lg font-medium">
          <div className="border-b-1.5 border-gray-300 p-6">
            {playListTitle}
          </div>
          <div className="p-6">
            {videos.map((video, index) => (
              <PlayListCell
                qualities={video.qualities}
                poster={video.poster}
                index={index}
                date={video.date}
                src={video.src}
                title={video.title}
                isFullscreen={isFullscreen}
                setSelectedVideo={setSelectedVideo}
                selectedVideo={selectedVideo}
                spriteBaseUrl={video.spriteBaseUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PlayListCell: React.FC<
  Video & {
    index: number;
    isFullscreen?: boolean;
    setSelectedVideo: React.Dispatch<React.SetStateAction<Video>>;
    selectedVideo: Video;
  }
> = ({
  date,
  src,
  title,
  index,
  isFullscreen = false,
  setSelectedVideo,
  qualities,
  selectedVideo,
  poster,
}) => {
  const [durations, setDurations] = useState<Record<number, string>>({});
  const titleContainer = useRef<HTMLDivElement>(null);
  const handleLoadedMetadata = (
    index: number,
    event: React.SyntheticEvent<HTMLVideoElement>,
  ) => {
    const videoElement = event.currentTarget;
    const duration = videoElement.duration; // Duration in seconds
    setDurations((prev) => ({ ...prev, [index]: secondsToHHMMSS(duration) }));
  };

  return (
    <div
      className={cn(
        'group mb-3 flex cursor-pointer items-center gap-1 rounded-lg bg-gray-100 p-3 transition-colors duration-300 hover:bg-gray-200',
        {
          'bg-black/30 hover:bg-white/20': isFullscreen,
        },
        {
          'bg-brand-600': selectedVideo.src === src,
        },
      )}
      key={`title-${title}`}
      onClick={() => setSelectedVideo({ src, title, date, qualities })}
    >
      <span
        className={cn(
          'text-md text-gray-1000 min-w-5 text-center font-medium',
          {
            'text-white': isFullscreen,
          },
          {
            'text-white': selectedVideo.src === src,
          },
        )}
      >
        <span className={cn({ hidden: selectedVideo.src === src })}>
          {++index}
        </span>
        {selectedVideo.src === src && (
          <span className="text-white">
            <Icon name="play" />
          </span>
        )}
      </span>
      <div className="relative flex items-center justify-between gap-3">
        <video
          poster={poster ? poster : ''}
          className="rounded-sm"
          width={100}
          height={56}
          src={src}
          onLoadedMetadata={(event) => handleLoadedMetadata(index, event)}
        ></video>
        <span className="absolute right-10 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Icon name="play" />
        </span>
        {durations[index] && (
          <span className="rounded-xs absolute bottom-1 right-1 bg-black/55 px-1 text-xs font-medium text-white">
            {durations[index]}
          </span>
        )}
        <div>
          <div
            className={cn(
              'text-gray-1000 relative w-[230px] overflow-hidden text-ellipsis whitespace-nowrap p-2 pr-1 text-sm font-medium',
              {
                'text-white': isFullscreen,
              },
              {
                'group-hover:text-gray-900': !isFullscreen,
              },
              {
                'text-white': selectedVideo.src === src,
              },
            )}
          >
            <div
              ref={titleContainer}
              className={cn(
                'inline-block transform text-ellipsis whitespace-nowrap transition-transform duration-1000 ease-in-out group-hover:translate-x-[calc(100%-222px)]',
                {
                  'group-hover:translate-x-0':
                    titleContainer.current &&
                    titleContainer.current?.offsetWidth < 214,
                },
                {
                  'duration-4000':
                    titleContainer.current &&
                    titleContainer.current?.offsetWidth > 400,
                },
              )}
            >
              {title}
            </div>
          </div>
          <span
            className={cn(
              'flex items-center gap-1 text-xs font-medium text-gray-600',
              { 'text-white': isFullscreen },
              {
                'text-white': selectedVideo.src === src,
              },
              {
                'group-hover:text-gray-600': !isFullscreen,
              },
            )}
          >
            <Icon name="calendar-days" /> {date}
          </span>
        </div>
      </div>
    </div>
  );
};
