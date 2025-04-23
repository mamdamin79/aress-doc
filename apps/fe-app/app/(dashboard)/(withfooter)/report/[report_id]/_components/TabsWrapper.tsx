'use client';

import React, { useState } from 'react';
import { cn, Tabs } from 'design-system';
import { useGetCurrentSection } from '../../../../../../hooks';

const TABS = [
  { id: 'videoReview', title: 'ویدیو بررسی' },
  { id: 'moreInfo', title: 'اطلاعات بیشتر' },
  { id: 'relatedReports', title: 'گزارش های مرتبط' },
];

export const TabsWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentSection = useGetCurrentSection();
  const scrollToSection = (id: number) => {
    setActiveTab(id);
    const section = document.getElementById(String(id));
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
        tabs={TABS}
        activeTab={currentSection ? Number(currentSection) : 0}
        onClickTab={(idTab) => scrollToSection(idTab)}
      />
    </section>
  );
};
