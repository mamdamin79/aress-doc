'use client';
import { Icon, ReportsCarousel, SectionTitle, Tabs } from 'design-system';
import Image from 'next/image';
import React from 'react';
import fake2 from '../fake2.png';
import fake1 from '../fake1.png';
import { ReportOverview } from './_components/ReportOverview';
import { SectionItem } from './_components/SectionUlItem';
const cards = [
  {
    title: 'ورود سرمایه‌گذاران حقیقی به ۵ صنعت برتر',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',

    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: fake1,
    fixedBrief: false,
  },
  {
    title: 'نرخ بازده تا سررسید',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'صندوق‌های سهامی',
    categoryType: 'صندوق‌های سهامی',
    newBadge: false,
    videoBadge: false,
    image: fake2,
    fixedBrief: false,
  },
  {
    title: 'سهم تأثیر بازدهی صنایع در شاخص',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: true,
    videoBadge: false,
    image: fake1,
    fixedBrief: false,
  },
  {
    title: 'شاخص کل و ورود و خروج سرمایه گذار حقیقی',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: fake2,
    fixedBrief: false,
  },
  {
    title: 'ورود و خروج تجمعی سرمایه‌گذاران حقیقی به سهام و درآمد ثابت',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'درآمد ثابت',
    categoryType: 'درآمد ثابت',
    newBadge: true,
    videoBadge: false,
    image: fake1,
    fixedBrief: false,
  },
  {
    title: 'سهم تأثیر صنایع در شاخص',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: true,
    image: fake2,
    fixedBrief: false,
  },
  {
    title: 'شاخص کل و ورود و خروج سرمایه',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: fake1,
    fixedBrief: false,
  },
  {
    title: 'ورود سرمایه‌گذاران حقیقی به ۵ صنعت برتر',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'سهامی',
    categoryType: 'سهامی',
    newBadge: false,
    videoBadge: false,
    image: fake2,
  },
  {
    title: 'نرخ بازده تا سررسید',
    brief:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
    reportSubscription: 'صندوق‌های سهامی',
    categoryType: 'صندوق‌های سهامی',
    newBadge: false,
    videoBadge: false,
    image: fake1,
    fixedBrief: false,
  },
];

const page = () => {
  return (
    <div>
      <section className="flex w-full flex-row justify-around gap-8 px-20 pt-6">
        <div className="flex w-fit flex-col gap-2">
          <div className="rounded-3xl bg-gray-100 p-4">
            <Image src={fake2} alt="fake2" width={616} height={320} />
          </div>
          <div className="flex flex-row items-center gap-1 text-sm font-normal">
            <Icon name="info" size="md" />
            <span>با زدن بر روی آیکون </span>
            <span className="flex flex-row items-center">
              {'('} <Icon name="settings" size="sm" />
              {')'}
            </span>
            <span> امکان تغییر تنظیمات پیشفرض پروژه وجود دارد.</span>
          </div>
        </div>
        <ReportOverview />
      </section>
      <section className="flex justify-center px-2 pb-14 pt-[72px]">
        <Tabs
          variant="rounded-full"
          colorMode="neutral"
          onClickTab={(idTab: number) => console.log(idTab)}
          tabs={[
            { id: 'videoReview', title: 'ویدیو بررسی' },
            { id: 'moreInfo', title: 'اطلاعات بیشتر' },
            { id: 'relatedReports', title: 'گزارش های مرتبط' },
          ]}
        />
      </section>
      <section className="flex w-full flex-col items-center">
        <SectionTitle align="center" level={3} title="ویدیو بررسی" />
        <div className="mt-12">
          <Image alt="video" src={fake1} width={816} height={459} />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center pt-[112px]">
        <SectionTitle align="center" level={3} title="اطلاعات بیشتر" />
        <div className="mt-12 flex max-w-[960px] flex-col items-center justify-center">
          <ul className="rtl marker:text-brand-600 list-disc text-xl font-medium marker:text-3xl">
            {/* Section Component */}
            <SectionItem
              title="نرخ بازده تا سررسید (Yield to Maturity - YTM)"
              paragraphs={[
                `نرخ بازده تا سررسید یا YTM یکی از مفاهیم مهم در ارزیابی اوراق قرضه است. این نرخ نشان‌دهنده نرخ بازده کلی است که سرمایه‌گذار می‌تواند انتظار داشته باشد اگر اوراق قرضه را تا تاریخ سررسید نگه دارد و تمام پرداخت‌ها (شامل کوپن‌ها و بازپرداخت اصل مبلغ) بر اساس شرایط فعلی به‌موقع پرداخت شوند.`,
                `YTM معیاری است که به‌طور خلاصه تمام جریان‌های نقدی حاصل از اوراق قرضه (شامل پرداخت‌های دوره‌ای کوپن و بازپرداخت اصل مبلغ در سررسید) را در نظر می‌گیرد و آنها را با قیمت فعلی بازار اوراق قرضه تطبیق می‌دهد تا نرخ بازده کلی را محاسبه کند.`,
              ]}
            />

            <SectionItem
              title="چرا YTM مهم است؟"
              list={[
                {
                  subtitle: 'تصمیم‌گیری سرمایه‌گذاری:',
                  content: `نرخ بازده تا سررسید یا YTM یکی از مفاهیم مهم در ارزیابی اوراق قرضه است. این نرخ نشان‌دهنده نرخ بازده کلی است که سرمایه‌گذار می‌تواند انتظار داشته باشد اگر اوراق قرضه را تا تاریخ سررسید نگه دارد و تمام پرداخت‌ها به‌موقع پرداخت شوند.`,
                },
                {
                  subtitle: 'مقایسه بازده:',
                  content: `YTM امکان مقایسه اوراق قرضه با سررسیدهای مختلف با بازده‌های کوپن متفاوت را فراهم می‌آورد.`,
                },
              ]}
            />

            <SectionItem
              title="نحوه محاسبه YTM"
              paragraphs={[
                `محاسبه YTM معمولاً با استفاده از فرمول‌های ریاضی است که ممکن است نیاز به استفاده از نرم‌افزارهای مالی داشته باشد. این محاسبات با جستجوی نرخ‌هایی انجام می‌شود.`,
              ]}
            />
          </ul>
        </div>
      </section>
      <section className="flex flex-col gap-12 pt-[112px]">
        <SectionTitle align="center" level={2} title="گزارش‌های مرتبط" />
        <ReportsCarousel cards={cards} />
      </section>
      <div className="mb-6 h-14 w-full border-b border-gray-200"></div>
    </div>
  );
};

export default page;
