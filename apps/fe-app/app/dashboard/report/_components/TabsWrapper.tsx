'use client';
import { useHeaderVisibility } from 'apps/fe-app/hooks';
import { cn, Tabs } from 'design-system';
import React from 'react';

export const TabsWrapper: React.FC = () => {
  const { contentStart, isHeaderVisible } = useHeaderVisibility();
  const scroll = (id: string) => {
    const section = document.querySelector('#' + id);
    console.log(id);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <section
      className={cn('sticky z-40 mb-8 bg-white px-2 pb-6 [&>div]:pt-6')}
      style={{
        top: contentStart - 10,
      }}
    >
      <Tabs
        variant="rounded-full"
        colorMode="neutral"
        onClickTab={(id: string) => scroll(id)}
        tabs={[
          { id: 'videoReview', title: 'ویدیو بررسی' },
          { id: 'moreInfo', title: 'اطلاعات بیشتر' },
          { id: 'relatedReports', title: 'گزارش های مرتبط' },
        ]}
      />
    </section>
  );
};
