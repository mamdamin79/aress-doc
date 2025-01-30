import React from 'react';
import { DashboardNumberAndName, SlidersBox } from './_components';
import { AutoRotateSwitchWrapper } from './_components/AutoRotateSwitchWrapper';
import { FundsSidebarWrapper } from './_components/FundsSidebarWrapper';
import { HorizontalScrollBar } from 'design-system';
import { HorizontallScrollWrapper } from './_components/HorizontallScrollWrapper';

const page = () => {
  return (
    <div className="3xl:px-6 relative mt-8 flex min-h-screen w-full flex-row justify-center gap-20 lg:px-4 xl:px-0">
      <div className="3xl:block hidden h-fit lg:block xl:hidden">
        <FundsSidebarWrapper />
      </div>
      <div className="relative w-fit">
        <div className="fixed right-4 top-1/2 z-10 lg:hidden">
          <HorizontallScrollWrapper />
        </div>
        <div className="flex w-full justify-between">
          <DashboardNumberAndName number={2} title="صندوق کالایی" />
          <AutoRotateSwitchWrapper />
        </div>

        <section className="relative mt-8 flex w-fit justify-center">
          <div className="absolute -right-10 top-64 z-10 hidden lg:block">
            <HorizontallScrollWrapper />
          </div>
          <SlidersBox />
        </section>
      </div>
    </div>
  );
};

export default page;
