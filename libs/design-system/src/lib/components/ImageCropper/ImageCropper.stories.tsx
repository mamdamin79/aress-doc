import { Meta, StoryObj } from '@storybook/react';
import { ImageCropper } from './ImageCropper';
const meta: Meta<typeof ImageCropper> = {
  component: ImageCropper,
};

export default meta;

type Story = StoryObj<typeof ImageCropper>;

export const Default: Story = {
  args: {
    image: 'https://placehold.co/800x600',
    isOpen: true,
  },
};
