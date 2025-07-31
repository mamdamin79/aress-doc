import { Meta, StoryObj } from '@storybook/nextjs';
import { HorizontalScrollBar } from './HorizontalScrollBar';
const meta: Meta<typeof HorizontalScrollBar> = {
  component: HorizontalScrollBar,
};

export default meta;

type Story = StoryObj<typeof HorizontalScrollBar>;

export const Default: Story = {
  args: {
    autoRotate: true,
    autoRotateDuration: 5000,
    barsNumber: 5,
    onChangeIndex: () => {
      console.log('changed');
    },
    onAddReportClick: () => console.log('hi'),
  },
};
export const withArrows: Story = {
  args: {
    autoRotate: true,
    autoRotateDuration: 5000,
    barsNumber: 5,
    onChangeIndex: () => {
      console.log('changed');
    },
    externalIndex: 0,
    hasArrows: true,
  },
};
