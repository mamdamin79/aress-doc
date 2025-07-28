'use client';
import { Tabs } from 'design-system';
import React, { useState } from 'react';
import { Accordion } from './../../components';
import { faqs } from './faqs.constanst';

const tabList = [
  {
    id: 'yourQues',
    title: 'سؤالات شما',
    icons: [{ name: 'circle-question-mark' }],
  },
  {
    id: 'finansialSecurity',
    title: 'امنیت مالی',
    icons: [{ name: 'shield-check' }],
  },
];

const page = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="mt-8">
      <h1 className="text-text-neutral-primary text-center text-xl font-semibold">
        سؤالی دارید؟
      </h1>
      <p className="text-text-neutral-secondary mt-2.5 text-center text-sm font-normal">
        برای یافتن سؤال خود، یکی از دسته‌بندی‌ها را انتخاب کنید.
      </p>
      <div className="mx-auto mt-10 flex w-full justify-center">
        <Tabs
          activeTab={+activeTab}
          tabs={tabList}
          variant="sliding"
          onClickTab={(id) => setActiveTab(id)}
        />
      </div>
      <div className="mx-auto mt-8 w-[700px] md:w-[704px] lg:w-[1000px]">
        {Object.values(faqs)[activeTab]?.map((item, idx) => (
          <Accordion
            key={idx}
            items={[{ ...item, accordionState: 'activity' }]}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
