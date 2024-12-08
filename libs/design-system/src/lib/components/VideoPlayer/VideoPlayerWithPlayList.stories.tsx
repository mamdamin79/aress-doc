import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { VideoPlayer } from './VideoPlayer';
import { PlayList, video } from '../PlayList';
import video1080 from '../../../assets/videos/The Breathtaking Beauty of Nature1080p.mp4';
import video720 from '../../../assets/videos/The Breathtaking Beauty of Nature720p.mp4';
import video360 from '../../../assets/videos/The Breathtaking Beauty of Nature360p.mp4';

export default {
  title: 'Components/VideoPlayerWithPlaylist',
  component: VideoPlayer,
} as Meta;

export const Default: StoryFn = () => {
  const [selectedVideo, setSelectedVideo] = useState<video>({
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
    date: '',
    src: '',
  });

  console.log(selectedVideo);
  const videos: video[] = [
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
      src: 'mamad',
      date: '',
    },
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
      src: 'ahmad',
      date: '',
    },
  ];

  return (
    <div className="flex">
      <VideoPlayer {...selectedVideo} />
      <PlayList
        playListTitle="لیست ویدیوها"
        isFullscreen={false}
        videos={videos}
        setSelectedVideo={setSelectedVideo}
      />
    </div>
  );
};
