import { Meta, StoryObj } from '@storybook/react';
import { VideoPlayer } from './VideoPlayer';
const meta: Meta<typeof VideoPlayer> = {
  component: VideoPlayer,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {
    src:"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },
};
