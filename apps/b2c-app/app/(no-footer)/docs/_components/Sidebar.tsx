'use client';
import { Button, cn, Icon } from 'design-system';
import React, { useRef } from 'react';
import { Filters, FiltersRef } from './Filters';

export const Sidebar: React.FC<{
  sideBarOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
}> = ({ sideBarOpen, setSideBarOpen }) => {
  const filtersRef = useRef<FiltersRef>(null);
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[52] w-full bg-black/25 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
          sideBarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setSideBarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'bg-surface-neutral-background text-text-neutral-primary fixed left-0 top-0 z-[53] flex h-full w-[489px] flex-col shadow-2xl transition-transform duration-300 ease-in-out',
          sideBarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-border-neutral-secondary flex flex-col gap-[19px] border-b p-8 pb-4">
          <div className="flex w-full justify-end">
            <button
              className="hover:bg-border-accent-gray-100 rounded-full p-2 transition-colors"
              onClick={() => setSideBarOpen(false)}
            >
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
              onClick={() => filtersRef.current?.clearAllFilters()}
            >
              حذف فیلترها
            </Button>
          </div>
        </div>

        {/* Scrollable Filters Content */}
        <div className="scrollbar-md mb-8 ml-4 mt-6 flex-1 overflow-y-auto pl-4 pr-8">
          <Filters ref={filtersRef} />
        </div>
      </div>
    </>
  );
};
