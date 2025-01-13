'use client';

import React from 'react';
import { cn, Tabs } from 'design-system';

const TABS = [
  { id: 'videoReview', title: 'ویدیو بررسی' },
  { id: 'moreInfo', title: 'اطلاعات بیشتر' },
  { id: 'relatedReports', title: 'گزارش های مرتبط' },
];

export const TabsWrapper: React.FC = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className={cn('sticky z-30 mb-6 bg-white px-2 pt-3')}
      style={{ top: 0 }}
    >
      <Tabs
        variant="rounded-full"
        colorMode="neutral"
        onClickTab={scrollToSection}
        tabs={TABS}
      />
    </section>
  );
};
