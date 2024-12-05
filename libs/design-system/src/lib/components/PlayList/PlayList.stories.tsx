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
        title:
          'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        date: '1403/11/22',
      },
      {
        title: 'ریسک ها و فرصت ها در سرمایه گذاری',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        date: '1403/11/22',
      },
      {
        title:
          'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی',
        src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        date: '1403/11/22',
      },
    ],
  },
};
