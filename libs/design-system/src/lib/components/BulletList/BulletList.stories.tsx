import type { Meta, StoryObj } from '@storybook/nextjs';
import { BulletList } from './BulletList';

// Meta configuration for the BulletList component in Storybook
const meta: Meta<typeof BulletList> = {
  title: 'Components/BulletList', // Defines the title in Storybook's UI
  component: BulletList, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof BulletList>;

// A default story for the BulletList component
export const Default: Story = {
  args: {
    items: [
      {
        title:
          'رمز عبور خود را با دیگران به اشتراک نگذارید و از یادداشت کردن آن در مکان های عمومی خودداری کنید.',
        status: 'normal',
      },
      {
        title:
          'از استفاده از نام تاریخ تولد یا اطلاعات شخصی دیگر در رمز عبور خودداری کنید.',
        status: 'success',
      },
      {
        title:
          'از استفاده از نام تاریخ تولد یا اطلاعات شخصی دیگر در رمز عبور خودداری کنید.',
        status: 'error',
      },
    ],
  },
};
