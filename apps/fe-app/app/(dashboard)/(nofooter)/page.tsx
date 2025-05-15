import React from 'react';
import { SlidersBox } from './_components';
import { FundsSidebarWrapper } from './_components/FundsSidebarWrapper';
import { cn } from 'design-system';
import styles from './_components/SlidersBox.module.css';
const page = () => {

  return (
    <div className="3xl:px-6 relative mt-8 flex min-h-screen w-full flex-row justify-center gap-8 pb-4 lg:px-4 xl:px-0">
      <div id="slidesSection" className={cn('w-fit', styles.customScrollbar)}>
        <SlidersBox />
      </div>
        <FundsSidebarWrapper />
    </div>
  );
};

export default page;
