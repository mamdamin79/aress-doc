import { secondsToHHMMSS } from '../../../../../utils/time';
import React, { useRef } from 'react';

type Props = {
  hoverTime: number | null;
  duration: number;
  videoRef: React.RefObject<HTMLVideoElement>;
};

export const PlayerThumbnail: React.FC<Props> = React.memo(
  ({ hoverTime, duration }) => {
    const thumbnailPreviewRef = useRef<HTMLDivElement>(null);

    const getSpriteSrc = (time: number) => {
      const spriteIndex = Math.floor(time / 50);
      return `https://i.ytimg.com/sb/IUN664s7N-c/storyboard3_L2/M${spriteIndex}.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgj1q72HBg==&sigh=rs%24AOn4CLBhd7rnvFipMzPBtjexgttEKWrSKA`;
    };

    const frameWidth = 160;
    const frameHeight = 90;
    const totalFrames = 25;
    const rowFrames = 5;

    const currentFrame = hoverTime
      ? Math.min(
          Math.floor(((hoverTime % 50) / 50) * totalFrames),
          totalFrames - 1
        )
      : null;

    return hoverTime !== null && currentFrame !== null ? (
      <div
        style={{
          left: `${(hoverTime / duration) * 100}%`,
        }}
        className='absolute -top-32 translate-x-[-50%]'
      >
        <div
          ref={thumbnailPreviewRef}
          className="relative bg-black border-[1.5px] shadow-3xl rounded-md  border-white"
          style={{
            width: frameWidth,
            height: frameHeight,
            backgroundImage: `url(${getSpriteSrc(hoverTime)})`,
            backgroundPosition: `${
              -(currentFrame % rowFrames) * frameWidth
            }px ${-Math.floor(currentFrame / rowFrames) * frameHeight}px`,
          }}
        ></div>
        <div className="relative mx-auto text-center text-sm font-medium mt-2  text-white">{secondsToHHMMSS(hoverTime)}</div>
      </div>
    ) : null;
  }
);
