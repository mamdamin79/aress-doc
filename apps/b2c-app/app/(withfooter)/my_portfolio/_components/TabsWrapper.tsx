'use client';
import { Tabs } from 'design-system';
import React, { useState } from 'react';

export const TabsWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Tabs
      tabs={[
        { id: 'one_month', title: 'یک ماهه' },
        { id: 'three_month', title: 'سه ماهه' },
        { id: 'six_month', title: 'شش ماهه' },
        { id: 'nine_month', title: 'نه ماهه' },
        { id: 'one_year', title: 'یک ساله' },
      ]}
      variant="sliding"
      activeTab={activeTab}
      onClickTab={setActiveTab}
    />
  );
};
