import type { Meta, StoryObj } from '@storybook/react';
import { ReportCardBase } from './ReportCardBase';
import { useState } from 'react';

// Meta configuration for the ReportCardBase component in Storybook
const meta: Meta<typeof ReportCardBase> = {
  title: 'Components/ReportCardBase', // Defines the title in Storybook's UI
  component: ReportCardBase, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof ReportCardBase>;

// A default story for the ReportCardBase component
export const Default: Story = {
  render: (args) => {
    const [settingsOpen, setSettingsOpen] = useState(true);
    return (
      <ReportCardBase
        {...args}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />
    );
  },
  args: {
    title: 'تایتل (اسم گزارش)',
    switchIcons: {
      items: [
        {
          icon: { name: 'grid-3x3' },
        },
        {
          icon: { name: 'chart-scatter' },
        },
      ],
      onChange(value: number) {
        console.log(value);
      },
      size: 'sm',
      bgWhite: false,
      initialIndex: 1,
    },
    contextMenu: {
      items: [
        {
          icon: 'settings',
          title: 'تنظیمات گزارش',
          onClick: () => console.log('تنظیمات گزارش'),
        },
        {
          icon: 'share-2',
          title: 'اشتراک گذاری',
          onClick: () => console.log('اشتراک گذاری'),
        },
        {
          icon: 'square-arrow-out-up-right',
          title: 'هدایت به نسخه مادر',
          onClick: () => console.log('تنظیمات گزارش'),
        },
        {
          icon: 'info',
          title: 'اطلاعات بیشتر',
          onClick: () => console.log('اطلاعات بیشتر'),
        },
        {
          icon: 'repeat',
          title: 'جایگزینی گزارش',
          onClick: () => console.log('جایگزینی گزارش'),
        },
        {
          icon: 'trash-2',
          title: 'حذف گزارش از این فضا',
          onClick: () => console.log('حذف گزارش از این فضا'),
        },
      ],
    },
  },
};
