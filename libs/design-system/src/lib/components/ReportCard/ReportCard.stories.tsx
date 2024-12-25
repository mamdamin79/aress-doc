import type { Meta, StoryObj } from '@storybook/react';
import { ReportCard } from './ReportCard';
import chartPNG from '../../../assets/chart.png';
import chartPNG2 from '../../../assets/chart2.png';
// Meta configuration for the RemovableLabel component in Storybook
const meta: Meta<typeof ReportCard> = {
  title: 'Components/ReportCard',
  component: ReportCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ReportCard>;
export const SimilarReportsCard: Story = {
  args: {
    title: 'نرخ بازده تا سررسید',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    categoryType: 'سهامی',
    image: chartPNG,
    newBadge: true,
    videoBadge: true,
    reportSubscription: 'گزارش تخصصی',
  },
};
export const MenuReportsCard: Story = {
  args: {
    title: 'شاخص کل، ورود و خروج سرمایه‌گذار',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    categoryType: 'درآمد ثابت',
    image: chartPNG2,
    newBadge: true,
    videoBadge: false,
    reportSubscription: 'گزارش رایگان',
    fixedBrief: true,
    isLiked: true,
  },
};
