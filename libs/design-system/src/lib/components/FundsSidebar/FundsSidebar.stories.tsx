import { Meta, StoryObj } from '@storybook/react';
import { FundsSidebar } from './FundsSidebar';
const meta: Meta<typeof FundsSidebar> = {
  component: FundsSidebar,
};

export default meta;

type Story = StoryObj<typeof FundsSidebar>;

export const Default: Story = {
  args: {},
};
