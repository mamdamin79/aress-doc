import { Meta, StoryObj } from '@storybook/react';
import { PlayList } from './PlayList';

const meta: Meta<typeof PlayList> = {
  component: PlayList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PlayList>;

export const Default: Story = {
  args: {
    playListTitle: 'لیست مصاحبات مدیر - محمد باقر خادمی',
    videos: [
      {
        title: 'سرمایه گذاری و رشد پایدار در بازار های مالی',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        date: '1403/11/22',
      },
      {
        title: 'ریسک ها و فرصت ها در سرمایه گذاری',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        date: '1403/11/22',
      },
      {
        title: 'چالش های روزمره در مدیریت یک صندوق سرمایه گذاری',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        date: '1403/11/22',
      },
    ],
  },
};
