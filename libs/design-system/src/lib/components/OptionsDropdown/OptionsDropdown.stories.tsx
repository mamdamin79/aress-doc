import { Meta, StoryObj } from '@storybook/react';
import { OptionsDropdown } from './OptionsDropdown';
const meta: Meta<typeof OptionsDropdown> = {
  component: OptionsDropdown,
};

export default meta;

type Story = StoryObj<typeof OptionsDropdown>;

export const withbadge: Story = {
  args: {
    dropDownList: [
      {
        text: 'هفتگی',
        tag: { color: 'bg-green-600' },
      },
      {
        text: 'ماهانه',
        tag: { color: 'bg-red-600' },
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
export const withIcon: Story = {
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
export const withCheck: Story = {
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
export const customTriggerRender: Story = {
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
