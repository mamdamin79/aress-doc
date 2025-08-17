import { Meta, StoryObj } from '@storybook/nextjs';
import { BarStickyBtn } from './BarStickyBtn';
const meta: Meta<typeof BarStickyBtn> = {
  title: 'Components/BarStickyBtn',
  component: BarStickyBtn,
};

export default meta;

type Story = StoryObj<typeof BarStickyBtn>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="p-32">
        <BarStickyBtn {...args} />
      </div>
    );
  },
  args: {
    title: 'مشترک افق روشن کارگزاری بانک خاورمیانه',
    sellAble: true,
  },
};
