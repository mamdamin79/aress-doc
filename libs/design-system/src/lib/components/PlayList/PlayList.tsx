import React, { useRef, useState } from 'react';
import { Icon } from '../Icon';
import { secondsToHHMMSS } from '../../../utils/time';
import { cn } from '../../../utils/classNames.utils';

type PlayListPropsType = {
  videos: video[];
  playListTitle: string;
  isFullscreen: boolean;
  setShowPlayList?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedVideo: React.Dispatch<React.SetStateAction<video>>;
  selectedVideo: video;
};

export type video = {
  src: string;
  title: string;
  date: string;
  poster?: string;
  qualities: { src: string; label: string }[];
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
        <div className="bg-gray-900/90 transition-all duration-300 text-white h-screen w-[440px]">
          <div className="flex items-center px-6 pb-2 pt-8 justify-between text-xl font-medium">
            <span>{playListTitle}</span>
            <div
              onMouseUp={() => setShowPlayList && setShowPlayList(false)}
              className="cursor-pointer p-1"
            >
              <Icon name="x" size="lg" />
            </div>
          </div>
          <div className="pt-12 px-6">
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
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl h-[459px] font-medium text-lg text-gray-1000 border-1.5 border-gray-300  overflow-auto w-[440px] ">
          <div className="p-6 border-b-1.5 border-gray-300">
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
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PlayListCell: React.FC<
  video & {
    index: number;
    isFullscreen?: boolean;
    setSelectedVideo: React.Dispatch<React.SetStateAction<video>>;
    selectedVideo: video;
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
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const videoElement = event.currentTarget;
    const duration = videoElement.duration; // Duration in seconds
    setDurations((prev) => ({ ...prev, [index]: secondsToHHMMSS(duration) }));
  };

  return (
    <div
      className={cn(
        'group rounded-lg bg-gray-100 gap-1 p-3 mb-3 flex items-center hover:bg-gray-200 transition-colors duration-300 cursor-pointer',
        {
          'bg-black/30 hover:bg-white/20': isFullscreen,
        },
        {
          'bg-brand-600': selectedVideo.src === src,
        }
      )}
      key={`title-${title}`}
      onClick={() => setSelectedVideo({ src, title, date, qualities })}
    >
      <span
        className={cn(
          'text-md min-w-5 text-center  text-gray-1000 font-medium',
          {
            'text-white': isFullscreen,
          },
          {
            'text-white': selectedVideo.src === src,
          }
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
      <div className="flex relative items-center justify-between gap-3">
        <video
          poster={poster ? poster : ''}
          className="rounded-sm"
          width={100}
          height={56}
          src={src}
          onLoadedMetadata={(event) => handleLoadedMetadata(index, event)}
        ></video>
        <span className="absolute group-hover:opacity-100 opacity-0 transition-all duration-300 right-10  text-white ">
          <Icon name="play" />
        </span>
        {durations[index] && (
          <span className="text-white bg-black/55 px-1 absolute right-1 rounded-xs  bottom-1 font-medium text-xs">
            {durations[index]}
          </span>
        )}
        <div>
          <div
            className={cn(
              'text-gray-1000 p-2 pr-1 font-medium text-sm overflow-hidden text-ellipsis w-[230px] relative whitespace-nowrap ',
              {
                'text-white': isFullscreen,
              },
              {
                'group-hover:text-gray-900': !isFullscreen,
              },
              {
                'text-white': selectedVideo.src === src,
              }
            )}
          >
            <div
              ref={titleContainer}
              className={cn(
                'inline-block text-ellipsis whitespace-nowrap transform transition-transform duration-1000 ease-in-out group-hover:translate-x-[calc(100%-222px)]',
                {
                  'group-hover:translate-x-0':
                    titleContainer.current &&
                    titleContainer.current?.offsetWidth < 214,
                },
                {
                  'duration-4000':
                    titleContainer.current &&
                    titleContainer.current?.offsetWidth > 400,
                }
              )}
            >
              {title}
            </div>
          </div>
          <span
            className={cn(
              'text-gray-600  font-medium text-xs flex items-center gap-1',
              { 'text-white': isFullscreen },
              {
                'text-white': selectedVideo.src === src,
              },
              {
                'group-hover:text-gray-600': !isFullscreen,
              }
            )}
          >
            <Icon name="calendar-days" /> {date}
          </span>
        </div>
      </div>
    </div>
  );
};
