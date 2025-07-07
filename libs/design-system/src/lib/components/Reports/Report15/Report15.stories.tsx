import { Meta, StoryObj } from '@storybook/react';
import { Report15 } from './Report15';

const meta: Meta<typeof Report15> = {
  component: Report15,
};

export default meta;

type Story = StoryObj<typeof Report15>;

// Generate random scatter data that loosely fits the regression line
const generateScatterData = (
  count: number,
  beta: number,
  intercept: number,
  noise: number,
): [number, number][] => {
  return Array.from({ length: count }, () => {
    const x = Math.random() * 10 - 5; // X values from -5 to 5
    const idealY = beta * x + intercept;
    const y = idealY + (Math.random() - 0.5) * noise;
    return [parseFloat(x.toFixed(2)), parseFloat(y.toFixed(2))];
  });
};

const scatterData = generateScatterData(80, 1.2, 2.3, 8);
const graphData = scatterData.map(([x, y]) => ({
  Items: { x, y },
}));
export const Default: Story = {
  args: {
    graphData: graphData,
    beta: 1.2,
    betaAdjusted: 1.1,
    yIntersect: 2.3,
    rSquared: 0.86,
    pValue: '۰.۰۰۲',
  },
};
