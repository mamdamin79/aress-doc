import { Meta, StoryObj } from '@storybook/nextjs';
import { ImageCropper } from './ImageCropper';
import { useState } from 'react';
const meta: Meta<typeof ImageCropper> = {
  component: ImageCropper,
};

export default meta;

type Story = StoryObj<typeof ImageCropper>;

export const Default: Story = {
  render: () => {
    // function to download cropped image for test
    const downloadBlob = async (blobUrl: string, filename: string) => {
      try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);

        a.href = objectUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(objectUrl);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };
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
          image="https://picsum.photos/600/400"
          onClose={() => setIsOpen(false)}
          onChange={(image) => downloadBlob(image as any, 'test')}
        />
      </>
    );
  },
};
