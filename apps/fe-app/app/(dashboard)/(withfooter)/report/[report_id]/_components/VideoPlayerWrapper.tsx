'use client';
import { VideoPlayer } from 'design-system';
import React, { useState } from 'react';
const videoURL = [
  '/videos/The Breathtaking Beauty of Nature1080p.mp4',
  '/videos/The Breathtaking Beauty of Nature720p.mp4',
  '/videos/The Breathtaking Beauty of Nature360p.mp4',
  '/videos/Cinematic Forest-1080.mp4',
  '/videos/Cinematic Forest-720.mp4',
  '/videos/Cinematic Forest-360.mp4',
];
import { video } from 'libs/design-system/src/lib/components/PlayList';
export const VideoPlayerWrapper: React.FC = () => {
  const videos: video[] = [
    {
      qualities: [
        {
          src: videoURL[0],
          label: '1080',
        },
        {
          src: videoURL[1],
          label: '720',
        },
        {
          src: videoURL[2],
          label: '360',
        },
      ],
      title: 'چالش های روزمره در مدیریت یک صندوق سرمایه گذاری',
      poster: 'https://api.classbon.com/api/picture/20219',
      src: videoURL[1],
      date: '1403/09/22',
    },
    {
      qualities: [
        {
          src: videoURL[3],
          label: '1080',
        },
        {
          src: videoURL[4],
          label: '720',
        },
        {
          src: videoURL[5],
          label: '360',
        },
      ],
      title: 'چالش های روزمره در مدیریت یک صندوق سرمایه گذاری',
      poster: 'https://api.classbon.com/api/picture/20219',
      src: videoURL[4],
      date: '1403/11/22',
    },
  ];
  const [selectedVideo, setSelectedVideo] = useState<video>(videos[0]);

  return (
    <div className="flex items-center justify-center gap-4">
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
