import { Meta, StoryObj } from '@storybook/react';
import { VideoPlayer } from './VideoPlayer';
import video1080 from "../../../assets/videos/The Breathtaking Beauty of Nature1080p.mp4"
import video720 from "../../../assets/videos/The Breathtaking Beauty of Nature720p.mp4"
import video360 from "../../../assets/videos/The Breathtaking Beauty of Nature360p.mp4"



const meta: Meta<typeof VideoPlayer> = {
  component: VideoPlayer,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {
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
  },
};
