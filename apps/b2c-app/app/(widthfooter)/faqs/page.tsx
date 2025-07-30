'use client';
import { Tabs, Accordion } from 'design-system';
import React, { useState } from 'react';
import { faqs } from './faqs.constanst';

const tabList = [
  {
    id: 'registrationAndActivation',
    title: 'ثبت‌نام و فعال‌سازی',
    icons: [{ name: 'user-check' }],
  },
  {
    id: 'investment',
    title: 'سرمایه‌گذاری',
    icons: [{ name: 'chart-no-axes-combined' }],
  },
  {
    id: 'finansialSecurity',
    title: 'امنیت مالی',
    icons: [{ name: 'shield-check' }],
  },
  {
    id: 'yourQues',
    title: 'سؤالات شما',
    icons: [{ name: 'circle-question-mark' }],
  },
];

const page = () => {
  const [activeTab, setActiveTab] = useState(0);

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
      <div className="mx-auto w-[700px] md:w-[704px] lg:w-[1000px]">
        {Object.values(faqs)?.map((_, index) => (
          <>
            {index === activeTab && (
              <div>
                <div className="my-3">
                  <Accordion
                    mode="b2c"
                    className="border-border-neutral-secondary border-t"
                    singleOpen={true}
                    items={Object.values(faqs)[activeTab]}
                  />
                </div>
              </div>
            )}
          </>
        ))}
        <div className="bg-border-neutral-secondary mb-20 h-[1px] w-full" />
      </div>
    </div>
  );
};

export default page;
