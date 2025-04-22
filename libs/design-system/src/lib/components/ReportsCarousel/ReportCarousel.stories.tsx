import type { Meta, StoryObj } from '@storybook/react';
import { ReportsCarousel } from './ReportsCarousel';
import { DotIndicator } from './DotIndicator';
import chartPNG from '../../../assets/chart.png';
import chartPNG2 from '../../../assets/chart2.png';
// Meta configuration for the RemovableLabel component in Storybook
const meta: Meta<typeof ReportsCarousel> = {
  title: 'Components/ReportsCarousel',
  component: ReportsCarousel,
  tags: ['autodocs'],
};

export default meta;
const cards = [
  {
    title: 'ورود سرمایه‌گذاران حقیقی به ۵ صنعت برتر',
    summary:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',

    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG,
    fixedBrief: false,
  },
  {
    title: 'نرخ بازده تا سررسید',
    summary:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'صندوق‌های سهامی',
    categoryType: 'صندوق‌های سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG2,
    fixedBrief: false,
  },
  {
    title: 'سهم تأثیر بازدهی صنایع در شاخص',
    summary:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: true,
    videoBadge: false,
    image: chartPNG,
    fixedBrief: false,
  },
  {
    title: 'شاخص کل و ورود و خروج سرمایه گذار حقیقی',
    summary:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG2,
    fixedBrief: false,
  },
  {
    title: 'ورود و خروج تجمعی سرمایه‌گذاران حقیقی به سهام و درآمد ثابت',
    summary:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'درآمد ثابت',
    categoryType: 'درآمد ثابت',
    newBadge: true,
    videoBadge: false,
    image: chartPNG,
    fixedBrief: false,
  },
  {
    title: 'سهم تأثیر صنایع در شاخص',
    summary:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: true,
    image: chartPNG2,
    fixedBrief: false,
  },
  {
    title: 'شاخص کل و ورود و خروج سرمایه',
    summary:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG,
    fixedBrief: false,
  },
  {
    title: 'ورود سرمایه‌گذاران حقیقی به ۵ صنعت برتر',
    summary:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG2,
  },
  {
    title: 'نرخ بازده تا سررسید',
    summary:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'صندوق‌های سهامی',
    categoryType: 'صندوق‌های سهامی',
    newBadge: false,
    videoBadge: false,
    image: chartPNG,
    fixedBrief: false,
  },
];

type Story = StoryObj<typeof ReportsCarousel>;
export const Default: Story = {
  args: {
    cards: cards,
  },
};
export const DotIndicatorStory: Story = {
  render: () => (
    <div className="mt-28 flex w-full justify-center">
      <DotIndicator
        setIndex={(i) => console.log(i)}
        totalLength={3}
        currentIndex={1}
      />
    </div>
  ),
};
