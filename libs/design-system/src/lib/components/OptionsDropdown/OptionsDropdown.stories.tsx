import { Meta, StoryObj } from '@storybook/react';
import { OptionsDropdown } from './OptionsDropdown';
const meta: Meta<typeof OptionsDropdown> = {
  component: OptionsDropdown,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof OptionsDropdown>;

export const Withbadge: Story = {
  render: (args) => (
    <div className="w-28">
      <OptionsDropdown {...args} />
    </div>
  ),
  args: {
    dropDownList: [
      {
        text: 'روزانه',
        tag: { color: 'yellow' },
      },
      {
        text: 'هفتگی',
        tag: { color: 'blue' },
      },
      {
        text: 'ماهانه',
        tag: { color: 'purple' },
      },
    ],
    dropDownStyles: {
      bg: 'primary',
      emphasize: 'medium',
      size: 'md',
      anchor: 'bottom start',
    },
    onChange(selectedText) {
      console.log(selectedText);
    },
  },
};
export const WithIcon: Story = {
  render: (args) => (
    <div>
      <OptionsDropdown {...args} />
    </div>
  ),
  args: {
    dropDownList: [
      {
        text: 'تستی هست',
        icon: { name: 'settings' },
      },
      {
        text: 'تستی هست 2',
        icon: { name: 'alarm-clock-check' },
      },
      {
        text: 'تستی هست 3',
        icon: { name: 'git-pull-request-draft' },
      },
    ],
    dropDownStyles: {
      bg: 'primary',
      emphasize: 'medium',
      size: 'md',
      anchor: 'bottom start',
    },
  },
};
export const FixedWidth: Story = {
  render: (args) => (
    <div>
      <OptionsDropdown {...args} />
    </div>
  ),
  args: {
    dropDownList: [
      {
        text: 'تستی هست',
        icon: { name: 'settings' },
      },
      {
        text: 'تستی هست 2',
        icon: { name: 'alarm-clock-check' },
      },
      {
        text: 'تستی هست 3',
        icon: { name: 'git-pull-request-draft' },
      },
    ],
    dropDownStyles: {
      bg: 'primary',
      emphasize: 'medium',
      size: 'md',
      anchor: 'bottom start',
      fixedWidth: 400,
    },
  },
};
export const WithCheck: Story = {
  render: (args) => (
    <div>
      <OptionsDropdown {...args} />
    </div>
  ),
  args: {
    dropDownList: [
      {
        text: 'تستی هست',
      },
      {
        text: 'تستی هست',
      },
      {
        text: 'تستی هست',
      },
    ],
    dropDownStyles: {
      bg: 'primary',
      emphasize: 'medium',
      size: 'md',
      anchor: 'bottom start',
      checkSelected: true,
    },
  },
};
export const CustomTriggerRender: Story = {
  render: (args) => (
    <div>
      <OptionsDropdown {...args} />
    </div>
  ),
  args: {
    dropDownList: [
      {
        text: 'متن شماره یک',
      },
      {
        text: 'متن دوم',
      },
      {
        text: 'متن سوم',
      },
    ],
    dropDownStyles: {
      bg: 'primary',
      emphasize: 'medium',
      size: 'md',
      anchor: 'bottom start',
      checkSelected: true,
    },
    customTriggerRender(props) {
      return (
        <div className="flex flex-row items-center gap-2 rounded-sm p-2 text-sm transition-colors">
          <span className="text-gray-1000">
            <span>متن انتخابی: </span>
            {props.selectedItem.text}
          </span>
        </div>
      );
    },
  },
};
export const CustomOptionsRender: Story = {
  render: (args) => (
    <div>
      <OptionsDropdown {...args} />
    </div>
  ),
  args: {
    dropDownList: [
      {
        text: 'متن شماره یک',
      },
      {
        text: 'متن دوم',
      },
      {
        text: 'متن سوم',
      },
    ],
    dropDownStyles: {
      bg: 'primary',
      emphasize: 'medium',
      size: 'md',
      anchor: 'bottom start',
      checkSelected: true,
    },
    customOptionRender(props) {
      return <div className="w-64">{props.text}</div>;
    },
  },
};
