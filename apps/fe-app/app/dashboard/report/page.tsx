'use client';
import { Icon, SectionTitle, Tabs } from 'design-system';
import Image from 'next/image';
import fake2 from '../fake2.png';
import { ReportOverview } from './_components/ReportOverview';
import { SectionItem } from './_components/SectionUlItem';
import { VideoPlayerWrapper } from './_components/VideoPlayerWrapper';
import { ReportsCarouselWrapper } from './_components/ReportsCarouselWrapper';
import Link from 'next/link';

const page = () => {
  const scroll = (id: string) => {
    const section = document.querySelector('#' + id);
    console.log(id);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
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
          onClickTab={(id) => scroll(id)}
          tabs={[
            { id: 'videoReview', title: 'ویدیو بررسی' },
            { id: 'moreInfo', title: 'اطلاعات بیشتر' },
            { id: 'relatedReports', title: 'گزارش های مرتبط' },
          ]}
        />
      </section>
      <section className="flex w-full flex-col items-center" id="videoReview">
        <SectionTitle align="center" level={3} title="ویدیو بررسی" />
        <div className="mt-12">
          <VideoPlayerWrapper />
        </div>
      </section>
      <section
        className="flex flex-col items-center justify-center pt-[112px]"
        id="moreInfo"
      >
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
      <section className="flex flex-col gap-12 pt-[112px]" id="relatedReports">
        <SectionTitle align="center" level={2} title="گزارش‌های مرتبط" />
        <ReportsCarouselWrapper />
      </section>
      <div className="mb-6 h-14 w-full border-b border-gray-200"></div>
    </div>
  );
};

export default page;
