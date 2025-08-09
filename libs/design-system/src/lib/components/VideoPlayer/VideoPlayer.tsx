'use client';
import { useVideo } from '../../../hooks/UseVideo';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import { VideoTimer } from './ControlPanel/VideoTimer';
import { PlayerActions } from './ControlPanel/PlayerActions';
import { PlayerOptions } from './ControlPanel/PlayerOptions';
import { cn } from '../../../utils/classNames.utils';
import { PlayerProgressBar } from './ControlPanel/PlayerProgressBar';
import { PlayList } from '../PlayList';
import { Video, VideoQuality } from './VideoPlayer.types';

type Props = {
  qualities: VideoQuality[];
  poster?: string;
  className?: string;
  title: string;
  src: string;
  spriteBaseUrl?: string;
  setSelectedVideo: React.Dispatch<React.SetStateAction<Video>>;
  videos: Video[];
  selectedVideo: Video;
};

const MemoizedTitle = React.memo(
  ({
    title,
    setShowPlayList,
  }: {
    title: string;
    setShowPlayList: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return (
      <h2 className="absolute z-30 mt-8 flex items-center gap-1 text-xl font-semibold text-white">
        <span
          className="mr-8 cursor-pointer"
          onClick={() => setShowPlayList(true)}
        >
          <Icon name="list-video" size="lg" />
        </span>
        {title}
      </h2>
    );
  },
);

export const VideoPlayer: React.FC<Props> = ({
  qualities,
  poster = '',
  spriteBaseUrl,
  title,
  className,
  src,
  videos,
  setSelectedVideo,
  selectedVideo,
}) => {
  const [showControlPanel, setShowControlPanel] = useState(true);
  const [showPlayList, setShowPlayList] = useState(false);
  const playListRef = useRef<HTMLDivElement>(null);

  const {
    play,
    videoRef,
    pause,
    currentTime,
    isVideoLoaded,
    isVideoWaited,
    fullScreen,
    duration,
    progress,
    isPlaying,
    seek,
    bufferedTime,
    pictureInPicture,
    setPlaybackRate,
    playBackRate,
    muted,
    setVolume,
    volume,
    toggleMute,
    videoContainerRef,
    isFullscreen,
    quality,
    changeQuality,
    error,
  } = useVideo(src, qualities);
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const showControls = () => {
      setShowControlPanel(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControlPanel(false), 5000);
    };

    videoContainerRef.current?.addEventListener('mousemove', showControls);
    videoContainerRef.current?.addEventListener('touchstart', showControls);

    return () => {
      videoContainerRef.current?.removeEventListener('mousemove', showControls);
      videoContainerRef.current?.removeEventListener(
        'touchstart',
        showControls,
      );
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFullscreen &&
        showPlayList &&
        playListRef.current &&
        !playListRef.current.contains(event.target as Node)
      ) {
        setShowPlayList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFullscreen, showPlayList]);

  return (
    <div
      className={cn(
        `relative h-full w-full overflow-hidden rounded-md shadow-md ${className}`,
        {
          'cursor-none': !showControlPanel,
        },
      )}
      ref={videoContainerRef}
    >
      {isFullscreen && (
        <div
          ref={playListRef}
          className={cn(
            'absolute right-0 z-50 transition-all duration-300 ease-in-out',
            {
              '-right-full': !showPlayList,
            },
          )}
        >
          <PlayList
            setSelectedVideo={setSelectedVideo}
            isFullscreen={true}
            setShowPlayList={setShowPlayList}
            playListTitle="لیست مصاحبات مدیر - محمد باقر خادمی"
            videos={videos}
            selectedVideo={selectedVideo}
          />
        </div>
      )}
      <div
        onClick={isPlaying ? pause : play}
        className="absolute z-20 flex h-full w-full items-center justify-center"
      >
        {/* loading displays when video is not loaded yet(even first frame) and when buffered time is finished and we are waiting for new chunks */}
        {isVideoWaited && (
          <div>
            <div className="mx-auto w-fit animate-spin text-gray-600">
              <Icon name="loader-circle" size="xl" />
            </div>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {isFullscreen ? (
        !showPlayList && (
          <MemoizedTitle setShowPlayList={setShowPlayList} title={title} />
        )
      ) : (
        <span
          className={cn(
            'absolute right-8 top-6 opacity-90 transition-all duration-700 ease-in-out',
            { 'opacity-20': !showControlPanel && isPlaying },
          )}
        >
          {
            <img
              src={'../../../assets/icons/logo.svg'}
              width={100}
              height={100}
              alt="logo"
            />
          }
        </span>
      )}
      <div className="aspect-video w-full">
        <video
          src={src}
          className="h-full w-full"
          poster={poster}
          ref={videoRef}
        />
      </div>
      <div
        className={cn(
          'absolute inset-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-700 ease-in-out',
          { '-bottom-full': !showControlPanel && isPlaying },
        )}
      ></div>
      {/* control panel container */}
      <div
        className={cn(
          'absolute bottom-0 z-20 h-20 w-full transition-all duration-700 ease-in-out',
          {
            '-bottom-28': !showControlPanel && isPlaying,
          },
          {
            'pointer-events-none animate-pulse': !isVideoLoaded,
          },
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mx-auto w-11/12">
          {/* progress bar */}
          <div className="mb-1">
            <PlayerProgressBar
              bufferedTime={bufferedTime}
              currentTime={currentTime}
              duration={duration}
              videoRef={videoRef}
              progress={progress}
              seek={seek}
              spriteBaseUrl={spriteBaseUrl}
            />
          </div>
          {/* controls */}
          <div className={cn('flex items-center justify-between')} dir="ltr">
            <div className="flex items-center justify-between gap-4">
              <PlayerActions
                setVolume={setVolume}
                volume={volume}
                toggleMute={toggleMute}
                muted={muted}
                isPlaying={isPlaying}
                pause={pause}
                play={play}
              />
              <VideoTimer duration={duration} currentTime={currentTime} />
            </div>
            <PlayerOptions
              isFullscreen={isFullscreen}
              playBackRate={playBackRate}
              setPlaybackRate={setPlaybackRate}
              fullScreen={fullScreen}
              pictureInPicture={pictureInPicture}
              qualities={qualities}
              quality={quality}
              changeQuality={changeQuality}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
