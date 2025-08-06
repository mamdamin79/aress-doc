import { Meta, StoryObj } from '@storybook/nextjs';
import { FundCard } from './FundCard';
const meta: Meta<typeof FundCard> = {
  component: FundCard,
};

export default meta;

type Story = StoryObj<typeof FundCard>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="w-[760px]">
        <FundCard {...args} />
      </div>
    );
  },
  args: {
    fundCategory: 'سهامی',
    name: 'مشترک افق روشن کارگزاری بانک خاورمیانه',
  },
};
