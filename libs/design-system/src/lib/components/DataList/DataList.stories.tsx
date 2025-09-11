import { Meta, StoryObj } from '@storybook/nextjs';
import { DataList } from './DataList';

const meta: Meta<typeof DataList> = {
  component: DataList,
  tags: ['autodocs'],
  title: 'Components/DataList',
};

export default meta;

type Story = StoryObj<typeof DataList>;

export const Default: Story = {
  args: {
    mode: 'vertical',
    className: ' h-[300px]',
    data: [
      { key: 'بازده صندوق', value: '۴.۳٪' },
      { key: 'بتا صندوق', value: '۱.۴ واحد' },
      { key: 'واحد های ابطال شده', value: '۳۵۶ واحد' },
      { key: 'واحد های صادر شده', value: '۶,۲۵۴ واحد' },
      { key: 'رنج قیمتی', value: '۳,۱۰۰-۳,۲۰۰ ریال' },
      { key: 'گردش دارایی (بر مبنای آخرین صورت مالی)', value: '۱۲٪' },
    ],
  },
};
