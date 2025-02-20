import { Meta, StoryObj } from '@storybook/react';
import { PopupInfo } from './PopupInfo';
const meta: Meta<typeof PopupInfo> = {
  component: PopupInfo,

};

export default meta;

type Story = StoryObj<typeof PopupInfo>;

export const Default: Story = {
  args: {
  },
};