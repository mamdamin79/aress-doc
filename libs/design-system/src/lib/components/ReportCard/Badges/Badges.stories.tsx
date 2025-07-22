import { Meta, StoryObj } from '@storybook/nextjs';
import { LikeBadge, NewBadge, VideoBadge } from './Badges';
const meta: Meta<typeof LikeBadge> = {
  component: LikeBadge,
};

export default meta;

type Story = StoryObj<typeof LikeBadge>;

export const Default: Story = {
  render: () => (
    <div className="my-20 flex h-[100px] w-full items-center justify-center bg-gray-100">
      <LikeBadge isLiked={false} onClick={(isLiked) => console.log(isLiked)} />
      <NewBadge />
      <VideoBadge />
    </div>
  ),
  args: {},
};
