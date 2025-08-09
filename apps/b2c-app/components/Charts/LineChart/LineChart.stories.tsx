import { Meta, StoryObj } from '@storybook/nextjs';
import { LineChart } from './LineChart';
const meta: Meta<typeof LineChart> = {
  title: 'Components/Charts/LineChart',
  component: LineChart,
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const Default: Story = {
  args: {
    points: [
      { date: '2025-06-28', value: 30788784785779 },
      { date: '2025-06-29', value: 30405281689754 },
      { date: '2025-06-30', value: 87194219214295 },
      { date: '2025-07-01', value: 117202322640183 },
      { date: '2025-07-02', value: 242103985257960 },
      { date: '2025-07-03', value: 106557396483695 },
      { date: '2025-07-04', value: 69988139907382 },
      { date: '2025-07-05', value: 9566794851250 },
      { date: '2025-07-06', value: 73321292901219 },
      { date: '2025-07-07', value: 58848569449577 },
      { date: '2025-07-08', value: 80458353616971 },
      { date: '2025-07-09', value: 75856680940561 },
      { date: '2025-07-10', value: 7869499505404 },
      { date: '2025-07-11', value: 8909196706610 },
    ],
  },
};
