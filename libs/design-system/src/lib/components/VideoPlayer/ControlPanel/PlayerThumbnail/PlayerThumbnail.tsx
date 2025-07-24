import { cn } from '../../../../../utils/classNames.utils';
import { secondsToHHMMSS } from '../../../../../utils/time';
import React, { useRef } from 'react';

type Props = {
  hoverTime: number | null;
  duration: number;
  videoRef: React.RefObject<HTMLVideoElement|null>;
  spriteBaseUrl?: string;
};

export const PlayerThumbnail: React.FC<Props> = React.memo(
  ({ hoverTime, duration, spriteBaseUrl }) => {
    const thumbnailPreviewRef = useRef<HTMLDivElement>(null);

    const getSpriteSrc = (time: number) => {
      const spriteIndex = Math.floor(time / 50);
      return `${spriteBaseUrl}/M${spriteIndex}.jpg`;
    };

    const frameWidth = 160;
    const frameHeight = 90;
    const totalFrames = 25;
    const rowFrames = 5;

    const currentFrame = hoverTime
      ? Math.min(
          Math.floor(((hoverTime % 50) / 50) * totalFrames),
          totalFrames - 1,
        )
      : null;

    return hoverTime !== null && currentFrame !== null ? (
      <div
        style={{
          left: `${(hoverTime / duration) * 100}%`,
        }}
        className={cn(
          'absolute -top-32 translate-x-[-50%]',
          { 'translate-x-[-100%]': (hoverTime / duration) * 100 > 90 },
          { 'translate-x-[0%]': (hoverTime / duration) * 100 < 10 },
        )}
      >
        <div
          ref={thumbnailPreviewRef}
          className="shadow-3xl relative rounded-md border-[1.5px] border-white bg-black"
          style={{
            width: frameWidth,
            height: frameHeight,
            backgroundImage: `url(${getSpriteSrc(hoverTime)})`,
            backgroundPosition: `${
              -(currentFrame % rowFrames) * frameWidth
            }px ${-Math.floor(currentFrame / rowFrames) * frameHeight}px`,
          }}
        ></div>
        <div className="relative mx-auto mt-2 text-center text-sm font-medium text-white">
          {secondsToHHMMSS(hoverTime)}
        </div>
      </div>
    ) : null;
  },
);
