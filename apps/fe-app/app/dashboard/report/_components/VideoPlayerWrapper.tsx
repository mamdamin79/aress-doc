'use client';
import { VideoPlayer } from 'design-system';
import { video } from 'libs/design-system/src/lib/components/PlayList';
import React, { useState } from 'react';
const videos = [
  {
    qualities: [
      {
        src: 'https://tolofilm.com/wp-content/uploads/2021/07/%D8%AA%DB%8C%D8%B2%D8%B1-%D8%AA%D8%A8%D9%84%DB%8C%D8%BA%D8%A7%D8%AA%DB%8C-%DA%A9%D9%81%D8%B4-%D8%A7%D9%84%DB%8C%DA%A9%D8%A7%D9%86-1.mp4',
        label: '1080',
      },
      {
        src: 'https://tolofilm.com/wp-content/uploads/2021/07/%D8%AA%DB%8C%D8%B2%D8%B1-%D8%AA%D8%A8%D9%84%DB%8C%D8%BA%D8%A7%D8%AA%DB%8C-%D8%AA%D9%84%D9%81%DB%8C%D9%82%DB%8C-%DA%AF%D8%B1%D8%AF%D9%88-%D9%86%D9%88%DA%AF%D8%B1%D8%AF%DA%A9%D8%A7%D9%86.mp4',
        label: '720',
      },
      {
        src: 'https://tolofilm.com/wp-content/uploads/2021/07/glasstic.mp4',
        label: '360',
      },
    ],
    title: 'چالش های روزمره در مدیریت یک صندوق سرمایه گذاری',
    poster: 'https://api.classbon.com/api/picture/20219',
    src: 'https://tolofilm.com/wp-content/uploads/2021/07/%D8%AA%DB%8C%D8%B2%D8%B1-%D8%AA%D8%A8%D9%84%DB%8C%D8%BA%D8%A7%D8%AA%DB%8C-%DA%A9%D9%81%D8%B4-%D8%A7%D9%84%DB%8C%DA%A9%D8%A7%D9%86-1.mp4',
    date: '1403/09/22',
  },
];

export const VideoPlayerWrapper: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<video>(videos[0]);

  return (
    <div className="h-[459px] w-[816px]">
      <VideoPlayer
        videos={videos}
        setSelectedVideo={setSelectedVideo}
        {...selectedVideo}
        className="w-full"
        selectedVideo={selectedVideo}
      />
    </div>
  );
};
