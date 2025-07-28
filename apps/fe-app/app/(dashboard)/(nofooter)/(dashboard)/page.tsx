import React, { Suspense } from 'react';
import { SlidersBox } from './_components';
import { FundsSidebarWrapper } from './_components/FundsSidebarWrapper';
import { Toaster } from 'react-hot-toast';
import { SlidersBoxSkeleton } from './_components/skeletons/SlidersBoxSkeleton';

export default async function Page() {
  return (
    <div className="3xl:px-6 relative mt-8 flex min-h-screen w-full flex-row justify-center gap-8 px-8 pb-4 pr-10 md:px-0 lg:px-4 xl:px-0">
      <div className="w-1"></div>
      <Suspense fallback={<SlidersBoxSkeleton />}>
        <SlidersBox />
      </Suspense>
      <FundsSidebarWrapper />
      <Toaster position="bottom-center" />
    </div>
  );
}
