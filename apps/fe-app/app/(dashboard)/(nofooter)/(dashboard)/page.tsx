'use client';
import React, { Suspense } from 'react';
import { SlidersBox } from './_components';
import { FundsSidebarWrapper } from './_components/FundsSidebarWrapper';
import { Toaster } from 'react-hot-toast';
import { SlidersBoxSkeleton } from './_components/skeletons/SlidersBoxSkeleton';
import { SidebarSkeleton } from './_components/skeletons/SideBarSkeleton';
import { SidebarItemSkeleton } from './_components/skeletons/SidebarItemSkeleton';

export default function Page() {
  return (
    <div className="3xl:px-6 relative mt-8 flex min-h-screen w-full flex-row justify-center gap-8 px-8 pb-4 pr-10 md:px-0 lg:px-4 xl:px-0">
      <div className="w-1"></div>
      <Suspense fallback={<SlidersBoxSkeleton />}>
        <SlidersBox />
      </Suspense>
      <Suspense
        fallback={
          <SidebarSkeleton>
            {Array.from({ length: 12 }).map((_, idx) => (
              <SidebarItemSkeleton key={idx} />
            ))}
          </SidebarSkeleton>
        }
      >
        <FundsSidebarWrapper />
      </Suspense>
      <Toaster position="bottom-center" />
    </div>
  );
}
