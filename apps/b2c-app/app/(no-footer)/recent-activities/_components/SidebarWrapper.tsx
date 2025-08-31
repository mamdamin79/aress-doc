'use client';
import React, { useState } from 'react';
import { Button, Icon } from 'design-system';
import { Sidebar } from './Sidebar';

export const SidebarWrapper: React.FC = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <>
      <div className="flex w-full justify-end gap-4 lg:hidden">
        <Button
          onClick={() => setSideBarOpen(true)}
          mode="secondary"
          size="sm"
          theme="brand"
          className="w-[114px] font-medium"
        >
          <div className="flex items-center gap-2 font-medium">
            <span>فیلترها</span>
            <Icon name="filter" size="lg" />
          </div>
        </Button>
      </div>
      {/* Sidebar - hidden on lg screens and above */}
      <div className="lg:hidden">
        <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      </div>
    </>
  );
};
