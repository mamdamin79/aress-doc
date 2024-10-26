import { Meta, StoryObj } from '@storybook/react';
import LikeDislike from './LikeDislike';
import { LikeDislikeProps } from './LikeDislike.types';
const meta: Meta<typeof LikeDislike> = {
  component: LikeDislike,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LikeDislike>;

export const Like: Story = {
  render: (args: LikeDislikeProps) => {
    return (
      <div className="my-20 flex items-center justify-center bg-gray-100 h-[100px]">
        <LikeDislike {...args} />
      </div>
    );
  },
  args: {
    initialValue: 0,
    onReact: () => console.log('reacted'),
    Reaction: 'like',
    reactedBefore: false,
  } as LikeDislikeProps,
};
export const Dislike: Story = {
  render: (args: LikeDislikeProps) => {
    return (
      <div className="my-20 flex items-center justify-center bg-gray-100 h-[100px]">
        <LikeDislike {...args} />
      </div>
    );
  },
  args: {
    initialValue: 0,
    onReact: () => console.log('reacted'),
    Reaction: 'dislike',
    reactedBefore: false,
  } as LikeDislikeProps,
};
export const ReactedWithInitialValue: Story = {
  render: (args: LikeDislikeProps) => {
    return (
      <div className="my-20 flex items-center justify-center bg-gray-100 h-[100px]">
        <LikeDislike {...args} />
      </div>
    );
  },
  args: {
    initialValue: 34,
    onReact: () => console.log('reacted'),
    Reaction: 'like',
    reactedBefore: true,
  } as LikeDislikeProps,
};
