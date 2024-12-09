import { useVideo } from '../../../hooks/UseVideo';
import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { VideoTimer } from './ControlPanel/VideoTimer';
import { PlayerActions } from './ControlPanel/PlayerActions';
import { PlayerOptions } from './ControlPanel/PlayerOptions';
import { cn } from '../../../utils/classNames.utils';
import { PlayerProgressBar } from './ControlPanel/PlayerProgressBar';
import videoLogo from '../../../assets/images/videoLogo.svg';
import Image from 'next/image';
import { PlayList, video } from '../PlayList';

type Props = {
  qualities: {
    src: string;
    label: string;
  }[];
  poster?: string;
  className?: string;
  title: string;
  src: string;
  setSelectedVideo: React.Dispatch<React.SetStateAction<video>>;
  videos: video[];
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
      <h2 className="absolute text-white text-xl z-30 font-semibold mt-8 flex gap-1 items-center">
        <span
          className="mr-8 cursor-pointer"
          onClick={() => setShowPlayList(true)}
        >
          <Icon name="list-video" size="lg" />
        </span>
        {title}
      </h2>
    );
  }
);

export const VideoPlayer: React.FC<Props> = ({
  qualities,
  poster = '',
  title,
  className,
  src,
  videos,
  setSelectedVideo,
}) => {
  const [showControlPanel, setShowControlPanel] = useState(true);
  const [showPlayList, setShowPlayList] = useState(false);
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
  console.log(isFullscreen);
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
        showControls
      );
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      // onContextMenu={(e) => e.preventDefault()}
      className={cn('relative w-full rounded-md shadow-md overflow-hidden', {
        'cursor-none': !showControlPanel,
      })}
      ref={videoContainerRef}
    >
      {isFullscreen && (
        <div
          // onClick={(e)=>e.stopPropagation()}
          className={cn(
            'absolute transition-all duration-300 ease-in-out right-0 z-50',
            {
              '-right-full': !showPlayList,
            }
          )}
        >
          <PlayList
            setSelectedVideo={setSelectedVideo}
            isFullscreen={true}
            setShowPlayList={setShowPlayList}
            playListTitle="لیست مصاحبات مدیر - محمد باقر خادمی"
            videos={videos}
          />
        </div>
      )}
      <div
        onClick={isPlaying ? pause : play}
        className="w-full flex items-center justify-center h-full absolute z-20"
      >
        {/* loading displays when video is not loaded yet(even first frame) and when buffered time is finished and we are waiting for new chunks */}
        {isVideoWaited && (
          <div>
            <div className="animate-spin text-gray-600  w-fit mx-auto">
              <Icon name="loader-circle" size="xl" />
            </div>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {isFullscreen ? (
        <MemoizedTitle setShowPlayList={setShowPlayList} title={title} />
      ) : (
        <span
          className={cn(
            'absolute right-8 transition-all duration-700 ease-in-out opacity-90',
            { ' opacity-20': !showControlPanel && isPlaying }
          )}
        >
          {<Image src={videoLogo} width={100} height={100} alt="logo" />}
        </span>
      )}
      <video src={src} className="w-full" poster={''} ref={videoRef} />
      <div
        className={cn(
          'absolute inset-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent duration-700 ease-in-out transition-all',
          { '-bottom-full': !showControlPanel && isPlaying }
        )}
      ></div>
      {/* control panel container */}
      <div
        className={cn(
          'absolute w-full h-20 z-20 bottom-0 duration-700 ease-in-out transition-all',
          {
            '-bottom-28': !showControlPanel && isPlaying,
          },
          {
            'animate-pulse pointer-events-none': !isVideoLoaded,
          }
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
            />
          </div>
          {/* controls */}
          <div className={cn('flex items-center justify-between')} dir="ltr">
            <div className="flex justify-between items-center gap-4 ">
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
