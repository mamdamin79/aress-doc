import React from 'react';
import { DashboardNumberAndName, SlidersBox } from './_components';
import { AutoRotateSwitchWrapper } from './_components/AutoRotateSwitchWrapper';
import { FundsSidebarWrapper } from './_components/FundsSidebarWrapper';

const page = () => {
  return (
    <div className="3xl:px-6 relative mt-8 flex w-full flex-row justify-center gap-20 lg:px-4 xl:px-0">
      <div className="3xl:block hidden lg:block xl:hidden">
        <FundsSidebarWrapper />
      </div>
      <div className="w-fit">
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
