import { Meta, StoryObj } from '@storybook/nextjs';
import { AddReportButton } from './AddReportButton';
const meta: Meta<typeof AddReportButton> = {
  component: AddReportButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AddReportButton>;

export const Default: Story = {
  render: () => <AddReportButton onClick={() => alert('click')} />,
};
