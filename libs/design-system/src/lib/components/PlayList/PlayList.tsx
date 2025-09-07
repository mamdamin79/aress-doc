'use client';
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
        <div className="text-text-neutral-white h-screen w-[440px] bg-gray-900/90 transition-all duration-300">
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
                name={video.name}
                jobTitle={video.jobTitle}
                avatarUrl={video.avatarUrl}
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
        <div className="text-text-neutral-primary border-1.5 border-border-neutral-primary h-[459px] w-full overflow-auto rounded-3xl text-lg font-medium">
          <div className="border-b-1.5 border-border-neutral-primary p-6">
            {playListTitle}
          </div>
          <div className="p-6">
            {videos.map((video, index) => (
              <PlayListCell
                name={video.name}
                avatarUrl={video.avatarUrl}
                jobTitle={video.jobTitle}
                key={index}
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
    jobTitle?: string;
    avatarUrl?: string;
    name?: string;
  }
> = ({
  date,
  src,
  title,
  avatarUrl = '',
  name = '',
  jobTitle = '',
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
        'bg-surface-neutral-secondary hover:bg-surface-neutral-secondarycontrast group mb-3 flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 transition-colors duration-300',
        {
          'bg-black/30 hover:bg-white/20': isFullscreen,
        },
        {
          'bg-surface-brand-600-primary': selectedVideo.src === src,
        },
      )}
      key={`title-${title}`}
      onClick={() => setSelectedVideo({ src, title, date, qualities })}
    >
      <span
        className={cn(
          'text-md text-text-neutral-primary min-w-5 text-center font-medium',
          {
            'text-text-neutral-white': isFullscreen,
          },
          {
            'text-text-neutral-white': selectedVideo.src === src,
          },
        )}
      >
        <span className={cn({ hidden: selectedVideo.src === src })}>
          {++index}
        </span>
        {selectedVideo.src === src && (
          <span className="text-text-neutral-white">
            <Icon name="play" />
          </span>
        )}
      </span>
      <div className="relative flex w-full items-center justify-between gap-3">
        <video
          poster={poster ? poster : ''}
          className="h-[56px] w-[100px] rounded-sm object-cover"
          width={100}
          height={56}
          src={src}
          onLoadedMetadata={(event) => handleLoadedMetadata(index, event)}
        ></video>
        <span className="text-text-neutral-white absolute right-10 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Icon name="play" />
        </span>
        {durations[index] && (
          <span className="rounded-xs text-text-neutral-white absolute bottom-2.5 right-1 bg-black/55 px-1 text-xs font-medium">
            {durations[index]}
          </span>
        )}
        <div className="w-full">
          <div
            className={cn(
              'text-text-neutral-primary relative w-[306px] overflow-hidden text-ellipsis whitespace-nowrap p-2 pr-1 text-sm font-medium',
              {
                'text-text-neutral-white max-w-[233px]': isFullscreen,
              },

              {
                'group-hover:text-text-gray900': !isFullscreen,
              },
              {
                'text-text-neutral-white': selectedVideo.src === src,
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
          <div
            className={cn(
              'text-text-neutral-secondary flex w-full items-start justify-between gap-1 text-xs font-medium',
              { 'text-text-neutral-white': isFullscreen },
              {
                'text-text-neutral-white': selectedVideo.src === src,
              },
              {
                'group-hover:text-text-neutral-secondary': !isFullscreen,
              },
            )}
          >
            <div className="flex items-start gap-2">
              {!isFullscreen && (
                <img
                  className="relative -top-1.5 rounded-xl"
                  src={avatarUrl}
                  width={32}
                  height={26}
                />
              )}
              <div>
                <span>{name}</span> - <span>{jobTitle}</span>
              </div>
            </div>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
