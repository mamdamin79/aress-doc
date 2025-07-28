import type { Meta, StoryObj } from '@storybook/nextjs';
import { Accordion } from './Accordion';

// Meta configuration for the Accordion component in Storybook
const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion', // Defines the title in Storybook's UI
  component: Accordion, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof Accordion>;

// A default story for the Header component
export const active: Story = {
  args: {
    items: [
      {
        title: 'حکمت آشنا ایرانیان',
        subTitle: 'خرید - سهامی',
        accordionState: 'activity',
        status: 'success',
        children: <div>hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</div>,
      },
    ],
  },
};

export const doc: Story = {
  args: {
    items: [
      {
        title: 'گزارش حسابداری ماهانه',
        subTitle: 'اردیبهشت ماه',
        accordionState: 'doc',
        links: [
          'https://example.com/report1.pdf',
          'https://example.com/report2.pdf',
          'https://example.com/report2.pdf',
        ],
      },
    ],
  },
};

export const notification: Story = {
  args: {
    items: [
      {
        title: 'گزارش حسابداری ماهانه',
        subTitle: 'اردیبهشت ماه',
        accordionState: 'notification',
        newNotification: true,
      },
      {
        title: 'گزارش حسابداری ماهانه',
        subTitle: 'اردیبهشت ماه',
        accordionState: 'notification',
        newNotification: false,
      },
    ],
  },
};

export const enter: Story = {
  args: {
    items: [
      {
        title: 'ورود',
        subTitle: 'Windows Chrome',
        accordionState: 'sesstion',
        newNotification: true,
        location: '192.168.12.10',
        date: '1404/04/07',
        time: '13:04',
      },
    ],
  },
};

export const thisDevice: Story = {
  args: {
    items: [
      {
        title: 'ورود',
        subTitle: 'Windows Chrome',
        accordionState: 'sesstion',
        newNotification: true,
        location: '192.168.12.10',
        date: '1404/04/07',
        time: '13:04',
        thisDevice: true,
      },
    ],
  },
};
