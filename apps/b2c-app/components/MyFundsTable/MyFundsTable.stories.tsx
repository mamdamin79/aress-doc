import type { Meta, StoryObj } from '@storybook/nextjs';
import { MyFundsTable } from './MyFundsTable';
import type { FundData } from './MyFundsTable';

// Sample data matching the image
const sampleData: FundData[] = [
  {
    typeID: 0,
    dailyValue: 560000000,
    userInvestValue: 480000000,
    profitLoss: 32105000,
    profitLossPercentage: 20,
    fundWeight: 1,
    fundWeightPercentage: 6,
  },
  {
    typeID: 1,
    dailyValue: 560000000,
    userInvestValue: 480000000,
    profitLoss: 18020000,
    profitLossPercentage: 15,
    fundWeight: 3,
    fundWeightPercentage: 30,
  },
  {
    typeID: 2,
    dailyValue: 560000000,
    userInvestValue: 480000000,
    profitLoss: -1600000,
    profitLossPercentage: -5,
    fundWeight: 2,
    fundWeightPercentage: 20,
  },
  {
    typeID: 3,
    dailyValue: 560000000,
    userInvestValue: 480000000,
    profitLoss: 14670200,
    profitLossPercentage: 18,
    fundWeight: 4,
    fundWeightPercentage: 40,
  },
];

// Meta configuration for the MyFundsTable component in Storybook
const meta: Meta<typeof MyFundsTable> = {
  title: 'Components/MyFundsTable',
  component: MyFundsTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    data: {
      description: 'Array of fund data to display in the table',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MyFundsTable>;

// Default story with sample data
export const Default: Story = {
  args: {
    data: sampleData,
  },
};

// Empty state story
export const Empty: Story = {
  args: {
    data: [],
  },
};

// Single item story
export const SingleItem: Story = {
  args: {
    data: [sampleData[0]],
  },
};
