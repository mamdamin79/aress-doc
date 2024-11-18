import { Meta, StoryObj } from '@storybook/react';
import { VideoPlayer } from './VideoPlayer';
import video from "../../../assets/videos/The Breathtaking Beauty of Nature _ HD.mp4"
const meta: Meta<typeof VideoPlayer> = {
  component: VideoPlayer,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {
    src:video,
    title:"چالش های روزمره در مدیریت یک صندوق سرمایه گذاری",
    poster:"https://api.classbon.com/api/picture/20219"
  },
};
