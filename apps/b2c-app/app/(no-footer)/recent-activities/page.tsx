import React from 'react';
import { Activities } from './_components/Activities/Activities';
import { Filters } from './_components/Filters';
import { SidebarWrapper } from './_components/SidebarWrapper';

export default function RecentActivitiesPage() {
  return (
    <div className="relative flex max-w-full flex-row justify-center">
      <div className="flex w-full max-w-[1680px] flex-row gap-8 px-8 pb-8 pt-8 xl:px-20">
        <div className="flex w-full flex-col gap-8 text-right">
          <div className="flex w-full flex-col justify-center gap-3">
            <h1 className="text-text-neutral-primary text-xl font-semibold">
              فعالیت‌های اخیر
            </h1>
            <SidebarWrapper />
          </div>
          <Activities />
        </div>
        <div className="hidden w-[356px] min-w-[356px] shrink-0 flex-col gap-6 lg:flex xl:w-[456px] xl:min-w-[456px]">
          <Filters />
        </div>
      </div>
    </div>
  );
}
