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

type Props = {
  qualities: {
    src: string;
    label: string;
  }[];
  poster?: string;
  className?: string;
  title: string;
};

const MemoizedTitle = React.memo(({ title }: { title: string }) => (
  <h2 className="absolute text-white text-xl font-semibold mt-8 flex gap-1 items-center">
    <span className="mr-8">
      <Icon name="list-video" size="lg" />
    </span>
    {title}
  </h2>
));

export const VideoPlayer: React.FC<Props> = ({
  qualities,
  poster = '',
  title,
}) => {
  const [showControlPanel, setShowControlPanel] = useState(true);
  // const [selectedQuality, setSelectedQuality] = useState(qualities[2]);
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
  } = useVideo(qualities[0].src, qualities);

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
      onContextMenu={(e) => e.preventDefault()}
      className={cn('relative rounded-md shadow-md overflow-hidden', {
        'cursor-none': !showControlPanel,
      })}
      ref={videoContainerRef}
    >
      <div
        onClick={isPlaying ? pause : play}
        className="w-full h-full absolute z-20"
      ></div>
      {/* loading displays when video is not loaded yet(even first frame) and when buffered time is finished and we are waiting for new chunks */}
      {isVideoWaited && (
        <div className="absolute z-30 flex items-center justify-center inset-0 m-auto">
          <div className="animate-spin text-gray-600 w-fit mx-auto">
            <Icon name="loader-circle" size="xl" />
          </div>
        </div>
      )}
      {isFullscreen ? (
        <MemoizedTitle title={title} />
      ) : (
        <span className="absolute right-8 text-white">
          {<Image src={videoLogo} width={100} height={100} alt="logo" />}
        </span>
      )}
      <video className="w-full" poster={''} ref={videoRef} />
      <div className="absolute inset-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      {/* control panel container */}
      <div
        className={cn(
          'absolute w-full h-20 z-20 bottom-0 duration-700 ease-in-out transition-all',
          {
            '-bottom-28': !showControlPanel && isPlaying,
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
