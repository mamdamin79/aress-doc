import { Meta, StoryObj } from '@storybook/react';
import { ProfileImageAndUpload } from './ProfileImageAndUpload';
import { useState } from 'react';
const meta: Meta<typeof ProfileImageAndUpload> = {
  component: ProfileImageAndUpload,
};

export default meta;

type Story = StoryObj<typeof ProfileImageAndUpload>;

export const withImage: Story = {
  render: () => {
    const [image, setImage] = useState('https://placehold.co/600x600');
    const [isLoading, setIsLoading] = useState(false);
    const handleFileChange = (selectedFile: Blob) => {
      setIsLoading(true);
      setTimeout(() => {
        setImage(URL.createObjectURL(selectedFile));
        setIsLoading(false);
      }, 1000);
    };
    return (
      <ProfileImageAndUpload
        loadingInitial={isLoading}
        maxSize={3000000}
        types={['png', 'jpg']}
        image={image}
        onImageSelect={handleFileChange}
      />
    );
  },
};
export const withoutImage: Story = {
  args: {
    types: ['png', 'jpg'],
  },
};
