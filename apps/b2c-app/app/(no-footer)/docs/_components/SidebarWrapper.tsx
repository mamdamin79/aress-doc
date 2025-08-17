'use client';
import React from 'react';
import { Sidebar } from './Sidebar';

export const SidebarWrapper: React.FC = () => {
  return (
    <>
      {/* Sidebar - hidden on lg screens and above */}
      <div className="lg:hidden">
        <Sidebar />
      </div>
    </>
  );
};
