'use client';
import { useHeaderVisibility } from 'apps/fe-app/hooks';
import { Tabs } from 'design-system';
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
      className={'sticky z-40 flex justify-center px-2 pb-14 pt-[72px]'}
      style={{
        top: contentStart,
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
      {isHeaderVisible}sdsd
    </section>
  );
};
