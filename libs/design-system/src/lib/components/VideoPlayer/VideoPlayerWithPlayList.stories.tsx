import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { VideoPlayer } from './VideoPlayer';
import { PlayList } from '../PlayList';
import video1080 from '../../../assets/videos/The Breathtaking Beauty of Nature1080p.mp4';
import video720 from '../../../assets/videos/The Breathtaking Beauty of Nature720p.mp4';
import video360 from '../../../assets/videos/The Breathtaking Beauty of Nature360p.mp4';
import video1080forest from '../../../assets/videos/Cinematic-Forest-1080.mp4';
import video720forest from '../../../assets/videos/Cinematic Forest-720.mp4';
import video360forest from '../../../assets/videos/Cinematic Forest-360.mp4';
import { Video } from './VideoPlayer.types';

export default {
  title: 'Components/VideoPlayerWithPlaylist',
  component: VideoPlayer,
} as Meta;

export const Default: StoryFn = () => {
  const videos: Video[] = [
    {
      qualities: [
        {
          src: video1080,
          label: '1080',
        },
        {
          src: video720,
          label: '720',
        },
        {
          src: video360,
          label: '360',
        },
      ],
      title: 'چالش های روزمره در مدیریت یک صندوق سرمایه گذاری',
      poster: 'https://api.classbon.com/api/picture/20219',
      src: video1080,
      date: '1403/09/22',
    },
    {
      qualities: [
        {
          src: video1080forest,
          label: '1080',
        },
        {
          src: video720forest,
          label: '720',
        },
        {
          src: video360forest,
          label: '360',
        },
      ],
      title: 'چالش های روزمره در مدیریت یک صندوق سرمایه گذاری',
      poster: 'https://api.classbon.com/api/picture/20219',
      src: video1080forest,
      date: '1403/11/22',
    },
  ];
  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);

  return (
    <div className="container mx-auto flex max-w-7xl flex-row-reverse gap-6">
      <VideoPlayer
        videos={videos}
        setSelectedVideo={setSelectedVideo}
        {...selectedVideo}
        className="h-[459px] w-full"
        selectedVideo={selectedVideo}
      />
      <PlayList
        playListTitle="لیست ویدیوها"
        isFullscreen={false}
        videos={videos}
        setSelectedVideo={setSelectedVideo}
        selectedVideo={selectedVideo}
      />
    </div>
  );
};
