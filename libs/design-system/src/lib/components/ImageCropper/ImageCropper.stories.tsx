import { Meta, StoryObj } from '@storybook/react';
import { ImageCropper } from './ImageCropper';
import { useState } from 'react';
const meta: Meta<typeof ImageCropper> = {
  component: ImageCropper,
};

export default meta;

type Story = StoryObj<typeof ImageCropper>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <div
          className="cursor-pointer text-3xl"
          onClick={() => setIsOpen(true)}
        >
          show popup
        </div>
        <ImageCropper
          isOpen={isOpen}
          image="https://placehold.co/800x600"
          onClose={() => setIsOpen(false)}
        />
      </>
    );
  },
};
