'use client';

import React from 'react';
import { cn, Tabs } from 'design-system';
import { useGetCurrentSection } from '@shared';

const TABS = [
  { id: 'videoReview', title: 'ویدیو بررسی' },
  { id: 'moreInfo', title: 'اطلاعات بیشتر' },
  { id: 'relatedReports', title: 'گزارش های مرتبط' },
];

export const TabsWrapper: React.FC = () => {
  const currentSection = useGetCurrentSection();
  const scrollToSection = (id: number) => {
    const section = document.getElementById(String(id));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className={cn(
        'bg-surface-neutral-background sticky z-30 mb-6 w-full px-2 py-3',
      )}
      style={{ top: 0 }}
    >
      <Tabs
        variant="rounded-full"
        tabs={TABS}
        activeTab={currentSection ? Number(currentSection) : 0}
        onClickTab={(idTab) => scrollToSection(idTab)}
        className="z-10 flex w-full justify-center"
      />
    </section>
  );
};
