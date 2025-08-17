import { Meta, StoryObj } from '@storybook/nextjs';
import { ToolTipInfo } from './ToolTipInfo';
import { Button } from '../Button';

const meta: Meta<typeof ToolTipInfo> = {
  title: 'Components/ToolTipInfo',
  component: ToolTipInfo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive tooltip component that displays structured information with title, description, and list items.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToolTipInfo>;

// Sample items for stories
const sampleItems = [
  { text: 'آیتم اول', id: '1' },
  { text: 'آیتم دوم', id: '2' },
  { text: 'آیتم سوم', id: '3' },
  { text: 'آیتم چهارم', id: '4' },
  { text: 'آیتم پنجم', id: '5' },
];

export const Default: Story = {
  render: (args) => (
    <div className="p-20">
      <ToolTipInfo {...args}>
        <Button mode="primary">نمایش تولتیپ</Button>
      </ToolTipInfo>
    </div>
  ),
  args: {
    title: 'عنوان پیش‌فرض',
    description: 'این یک متن توضیحی نمونه است که در تولتیپ نمایش داده می‌شود.',
    items: sampleItems.slice(0, 3),
    offset: 4,
    trigger: 'hover',
  },
};

export const ClickToOpen: Story = {
  render: (args) => (
    <div className="p-20">
      <ToolTipInfo {...args}>
        <Button mode="secondary">کلیک کنید</Button>
      </ToolTipInfo>
    </div>
  ),
  args: {
    title: 'تولتیپ کلیکی',
    description:
      'این تولتیپ با کلیک باز می‌شود و با ESC یا کلیک در جای دیگر بسته می‌شود.',
    items: sampleItems.slice(0, 2),
    offset: 4,
    trigger: 'click',
  },
};

export const InfoIconExample: Story = {
  render: (args) => (
    <div className="p-20">
      <div className="flex items-center gap-2">
        <span>اطلاعات بیشتر:</span>
        <ToolTipInfo {...args}>
          <div className="cursor-pointer">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-blue-600"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 4v4m0 4h.01"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </ToolTipInfo>
      </div>
    </div>
  ),
  args: {
    title: 'راهنمای کاربری',
    description: 'اینجا اطلاعات مفیدی برای کاربر نمایش داده می‌شود.',
    items: [
      { text: 'نکته اول', id: '1' },
      { text: 'نکته دوم', id: '2' },
    ],
    offset: 4,
    trigger: 'click',
  },
};
