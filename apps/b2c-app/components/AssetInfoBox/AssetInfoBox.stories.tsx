import { Meta, StoryObj } from '@storybook/nextjs';
import { AssetInfoBox } from './AssetInfoBox';
const meta: Meta<typeof AssetInfoBox> = {
  component: AssetInfoBox,
};

export default meta;

type Story = StoryObj<typeof AssetInfoBox>;

export const Default: Story = {
  args: {},
};
