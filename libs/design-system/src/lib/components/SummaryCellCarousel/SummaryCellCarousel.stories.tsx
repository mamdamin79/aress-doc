import type { Meta, StoryObj } from '@storybook/nextjs';
import { SummaryCellCarousel } from './SummaryCellCarousel';
import { SummaryCellProps } from '../SummaryCell/SummaryCell';
// Meta configuration for the RemovableLabel component in Storybook
const meta: Meta<typeof SummaryCellCarousel> = {
  title: 'Components/SummaryCellCarousel',
  component: SummaryCellCarousel,
  tags: ['autodocs'],
};

export default meta;

const cells: SummaryCellProps[] = [
  {
    label: {
      icon: 'CustomCalendar',
      title: 'تاریخ ورود به صندوق',
    },
    value: '۱۴۰۲/۰۶/۰۸',
  },
  {
    label: {
      icon: 'CustomClock',
      title: 'سابقه صندوق',
    },
    value: '۷ سال و ۳ ماه',
  },
  {
    label: {
      icon: 'user',
      title: 'مدیر صندوق',
    },
    value: 'سبدگردان سهم آشنا',
  },
  {
    label: {
      icon: 'CustomBag',
      title: 'سیاست سرمایه‌گذاری',
    },
    value: 'مخاطره آمیز',
  },
  {
    label: {
      icon: 'CustomWallet',
      title: 'ارزش خالص دارایی',
    },
    value: '۴۰۸.۴ میلیارد ریال',
  },
  {
    label: {
      icon: 'CustomAlpha',
      title: 'بازده اضافی',
    },
    value: '۴.۱٪',
  },
  {
    label: {
      icon: 'CustomBeta',
      title: 'بای صندوق',
    },
    value: '۳.۸۴',
  },
];

type Story = StoryObj<typeof SummaryCellCarousel>;
export const Default: Story = {
  args: {
    cells: cells,
  },
};
