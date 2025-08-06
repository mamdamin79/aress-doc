import { Meta, StoryObj } from '@storybook/nextjs';
import { Piechart, PiechartProps } from './Piechart';
const meta: Meta<typeof Piechart> = {
  title: 'Components/Charts/Piechart',
  component: Piechart,
  parameters: {
    docs: {
      description: {
        component: `<div dir='rtl'><b>نمودار دایره‌ای صندوق‌ها</b><br/>این کامپوننت برای نمایش وضعیت سرمایه‌گذاری کاربر در انواع صندوق‌ها (سهامی، درآمد ثابت و ...) استفاده می‌شود. حالت‌های مختلف شامل حالت پیش‌فرض، هاور کامل، هاور جزئی و زمانی که کاربر هیچ صندوقی ندارد، پیاده‌سازی شده است.<ul><li>در حالت پیش‌فرض، اطلاعات نمایش داده نمی‌شود.</li><li>در حالت هاور، اطلاعات کامل یا مخفی شده نمایش داده می‌شود.</li><li>در حالت خالی، پیام مناسب نمایش داده می‌شود.</li></ul></div>`,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Piechart>;

const demoData = [
  { name: 'درآمد ثابت', value: 15300000 },
  { name: 'سهامی', value: 8200000 },
  { name: 'مختلط', value: 4200000 },
  { name: 'طلا', value: 3200000 },
];

export const Default: Story = {
  args: {
    data: demoData,
    state: 'default',
  } as PiechartProps,
  parameters: {
    docs: {
      description: {
        story: 'حالت پیش‌فرض نمودار دایره‌ای.',
      },
    },
  },
};
export const HideValues: Story = {
  args: {
    data: demoData,
    showValues: false,
    state: 'default',
  } as PiechartProps,
  parameters: {
    docs: {
      description: {
        story: 'حالت پیش‌فرض نمودار دایره‌ای.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    data: [],
    state: 'empty',
  } as PiechartProps,
  parameters: {
    docs: {
      description: {
        story: 'کاربر هنوز صندوقی خریداری نکرده است.',
      },
    },
  },
};
