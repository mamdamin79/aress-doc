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
    className: 'w-[250px] h-[578px]',
    data: [
      { key: 'شاخص کل', value: '2,345' },
      { key: 'شاخص هم‌وزن', value: '1,230' },
      { key: 'بازار اول', value: '780' },
      { key: 'بازار دوم', value: '560' },
    ],
  },
};
