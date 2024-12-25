import type { Meta, StoryObj } from '@storybook/react';
import { Heart } from './Heart';

// Meta configuration for the Header component in Storybook
const meta: Meta<typeof Heart> = {
  title: 'Components/Heart', // Defines the title in Storybook's UI
  component: Heart, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof Heart>;
let isLiked = false;

// A default story for the Header component
export const Default: Story = {
  render: (args) => (
    <div className="w-full mt-20 flex justify-center items-center">
      <Heart
        initialIsliked={args.initialIsliked}
        onClick={() => console.log('clicked')}
      />
    </div>
  ),
  args: {
    initialIsliked: isLiked,
  },
};
