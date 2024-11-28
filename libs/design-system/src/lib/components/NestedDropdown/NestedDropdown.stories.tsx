import type { Meta, StoryObj } from '@storybook/react';
import { NestedDropdown } from './NestedDropdown';

// Meta configuration for the Header component in Storybook
const meta: Meta<typeof NestedDropdown> = {
  title: 'Components/NestedDropdown', // Defines the title in Storybook's UI
  component: NestedDropdown, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof NestedDropdown>;

// A default story for the Header component
export const Default: Story = {
  render: () => <div className='w-full mt-24 flex justify-center items-center'><NestedDropdown /></div>, // Rendering the NestedDropdown component
};
