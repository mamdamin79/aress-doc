import React from 'react';
import { DashboardNumberAndName, SlidersBox } from './_components';
import { AutoRotateSwitchWrapper } from './_components/AutoRotateSwitchWrapper';
import { FundsSidebarWrapper } from './_components/FundsSidebarWrapper';
import { cn, HorizontalScrollBar } from 'design-system';
import { HorizontallScrollWrapper } from './_components/HorizontallScrollWrapper';
import styles from './_components/SlidersBox.module.css';
const page = () => {
  return (
    <div className="3xl:px-6 relative mt-8 flex min-h-screen w-full flex-row justify-center gap-20 lg:px-4 xl:px-0">
      <div className="3xl:block relative hidden h-fit lg:block xl:hidden">
        <FundsSidebarWrapper />
        <div className="absolute -left-8 top-64 hidden lg:block">
          <HorizontallScrollWrapper />
        </div>
      </div>
      <div
        className={cn(
          'w-fit, relative h-screen overflow-y-scroll',
          styles.customScrollbar,
        )}
      >
        <div className="fixed right-4 top-1/2 lg:hidden">
          <HorizontallScrollWrapper />
        </div>
        <div className="flex w-full justify-between">
          <DashboardNumberAndName number={2} title="صندوق کالایی" />
          <AutoRotateSwitchWrapper />
        </div>

        <section className="mt-8 flex w-fit justify-center">
          <SlidersBox />
        </section>
      </div>
    </div>
  );
};

export default page;
