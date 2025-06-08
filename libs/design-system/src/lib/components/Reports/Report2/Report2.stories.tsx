import type { Meta, StoryObj } from '@storybook/react';
import { Report2 } from './index';

// Meta configuration for the Report2 component in Storybook
const meta: Meta<typeof Report2> = {
  title: 'Components/Report2', // Defines the title in Storybook's UI
  component: Report2, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof Report2>;

export const Default: Story = {
  render: () => (
    <Report2
      flow="inflow"
      title='بیشترین ورود سرمایه‌گذاران حقیقی در صنایع - شش ماه گذشته'
      categories={['پتروشیمی', 'بانک', 'فلزات اساسی', 'پالایشگاهی', 'غذایی']}
      data={[70, 50, 30, 15, 10]}
    />
  ),
};

export const RedGreenBars: Story = {
  render: () => (
    <Report2
      flow="outflow"
      title='بیشترین خروج سرمایه‌گذاران حقیقی صناقع - شش ماه گذشته'
      categories={['پتروشیمی', 'بانک', 'فلزات اساسی', 'پالایشگاهی', 'غذایی']}
      data={[70, 50, 30, 15, 10]}
    />
  ),
};
