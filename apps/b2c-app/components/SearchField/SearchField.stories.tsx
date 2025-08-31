import type { Meta, StoryObj } from '@storybook/nextjs';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = {
  render: () => <SearchField placeholder="جستجو" />,
};
