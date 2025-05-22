import React from 'react';
import { SlidersBox } from './_components';
import { FundsSidebarWrapper } from './_components/FundsSidebarWrapper';
const page = () => {
  return (
    <div className="3xl:px-6 relative mt-8 flex min-h-screen w-full flex-row justify-center gap-8 px-8 pb-4 pr-10 md:px-0 lg:px-4 xl:px-0">
      <div className="w-1"></div>
      <SlidersBox />
      <FundsSidebarWrapper />
    </div>
  );
};

export default page;
