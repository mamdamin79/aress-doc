import { Meta, StoryObj } from '@storybook/react';
import { ChartTooltip } from './ChartTooltip';
const meta: Meta<typeof ChartTooltip> = {
  component: ChartTooltip,
};

export default meta;

type Story = StoryObj<typeof ChartTooltip>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="my-10 flex items-center justify-center">
        <ChartTooltip {...args}>
          <div>سلام</div>
        </ChartTooltip>
      </div>
    );
  },
  args: {
    title: '20 اردیبهشت',
    items: [
      {
        number: 25,
        tag: {
          color: 'blue',
          shape: 'circle',
        },
        text: 'بازده صندوق سهم آشنا:',
      },
      {
        number: 25,
        tag: {
          color: 'purple',
          shape: 'rhombus',
        },
        text: 'بازده صندوق سهم سهامی:',
        subText: {
          content: '٪5 بیشتر از فروردین',
          trend: 'positive',
        },
      },
      {
        number: 25,
        tag: {
          color: 'red',
          shape: 'square',
        },
        text: 'بازده صندوق سهم :',
      },
      {
        number: 25,
        tag: {
          color: 'yellow',
          shape: 'triangle',
        },
        text: 'بازده شاخص کل:',
      },
    ],
  },
};
