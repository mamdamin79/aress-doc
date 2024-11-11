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
    src:"https://classbon.arvanvod.ir/0q36Dx65Pj/5q0AvBAQKk/origin_d3plBgkPEaUzlSbwtzk1Sc1N6z9RhQDdzYAgMXEC.mp4",
    title:"چالش های روزمره در مدیریت یک صندوق سرمایه گذاری"
  },
};
