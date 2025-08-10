import { Meta, StoryObj } from '@storybook/nextjs';
import { AssetInfoBox } from './AssetInfoBox';
import { useState } from 'react';
const meta: Meta<typeof AssetInfoBox> = {
  component: AssetInfoBox,
  title: 'Components/AssetInfoBox', // Defines the title in Storybook's UI
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AssetInfoBox>;

export const Default: Story = {
  render: (args) => {
    const [hiddenContent, setHiddenContent] = useState(false);
    return (
      <AssetInfoBox
        {...args}
        hiddenContent={hiddenContent}
        onToggleHiddenContent={() => setHiddenContent(!hiddenContent)}
      />
    );
  },
  args: {
    hiddenContent: false,
    onToggleHiddenContent: () => {},
    quantity: 560000000,
    valueChange: 23000,
    percentageChange: 23.3,
  },
};
