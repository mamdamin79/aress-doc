import React from 'react';
import { Icon } from '../Icon';

type PlayListPropsType = {
  videos: video[];
  playListTitle: string;
};

type video = {
  src: string;
  title: string;
  date: string;
};

export const PlayList: React.FC<PlayListPropsType> = ({
  videos,
  playListTitle,
}) => {
  return (
    <div className="rounded-3xl font-medium text-lg text-gray-1000 border-1.5 border-gray-300 w-[440px] ">
      <div className="p-6 border-b-1.5 border-gray-300">{playListTitle}</div>
      <div className="p-6">
        {videos.map((video, index) => (
          <div
            className="rounded-lg bg-gray-100 gap-2 p-3 mb-3 flex items-center"
            key={`title-${video.title}`}
          >
            <span className="text-md  text-gray-1000 font-medium">
              {++index}
            </span>
            <div className="flex items-center justify-between gap-3">
              <video
                className="rounded-sm"
                width={100}
                height={56}
                src={video.src}
              ></video>
              <div>
                <span className="text-gray-1000 font-medium text-sm line-clamp-1 ">
                  {video.title}
                </span>
                <span className="text-gray-600 font-medium text-xs flex items-center gap-1">
                  <Icon name="calendar-days" /> {video.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
