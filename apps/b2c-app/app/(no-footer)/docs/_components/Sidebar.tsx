'use client';
import { Button, Icon } from 'design-system';
import React from 'react';
import { Filters } from './Filters';

export const Sidebar: React.FC = () => {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[52] w-full bg-black/25 backdrop-blur-sm" />

      {/* Sidebar */}
      <div className="bg-surface-neutral-background fixed left-0 top-0 z-[53] flex h-full w-[489px] flex-col shadow-2xl">
        <div className="border-border-neutral-secondary flex flex-col gap-[19px] border-b p-8 pb-4">
          <div className="flex w-full justify-end">
            <button className="hover:bg-border-accent-gray-100 rounded-full p-2 transition-colors">
              <Icon name="x" size="lg" />
            </button>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-text-neutral-secondarycontrast text-lg font-semibold">
              فیلترها
            </span>
            <Button
              mode="secondary"
              size="sm"
              theme="error"
              className="w-[120px] font-medium"
            >
              حذف فیلترها
            </Button>
          </div>
        </div>

        {/* Scrollable Filters Content */}
        <div className="scrollbar-md mb-8 ml-4 mt-6 flex-1 overflow-y-auto pl-4 pr-8">
          <Filters />
        </div>
      </div>
    </>
  );
};
