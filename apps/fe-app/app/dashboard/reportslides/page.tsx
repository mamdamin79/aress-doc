import React from 'react';
import { DashboardNumberAndName, SlidersBox } from './_components';
import { AutoRotateSwitchWrapper } from './_components/AutoRotateSwitchWrapper';
import { FundsSidebarWrapper } from './_components/FundsSidebarWrapper';
import { cn, HorizontalScrollBar } from 'design-system';
import { HorizontalScrollWrapper } from './_components/HorizontallScrollWrapper';
import styles from './_components/SlidersBox.module.css';
const page = () => {
  const numberOfCards = 4;
  return (
    <div className="3xl:px-6 relative mt-8 flex min-h-screen w-full flex-row justify-center gap-8 lg:px-4 xl:px-0">
      <div className="fixed right-4 top-1/2">
        <HorizontalScrollWrapper numberOfCards={numberOfCards} />
      </div>
      <div id="slidesSection" className={cn('w-fit', styles.customScrollbar)}>
        <div className="flex w-full justify-between">
          <DashboardNumberAndName number={2} title="صندوق کالایی" />
          <AutoRotateSwitchWrapper />
        </div>

        <section className="mt-8 flex w-fit justify-center">
          <SlidersBox />
        </section>
      </div>
      <div className="3xl:block sticky top-6 hidden h-fit w-fit lg:block xl:hidden">
        <FundsSidebarWrapper />
      </div>
    </div>
  );
};

export default page;
