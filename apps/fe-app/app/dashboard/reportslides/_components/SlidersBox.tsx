'use client';
import { AddReportButton, Icon } from 'design-system';
import React from 'react';
export const SlidersBox: React.FC = () => {
  return (
    <div className="flex w-[1280px] flex-col justify-start">
      <div className="relative flex flex-row">
        <div className="flex h-10 w-fit flex-row items-center justify-center gap-2 rounded-tl-3xl rounded-tr-3xl bg-gray-100 px-4 py-1">
          اسلاید 1
          <Icon name="trash-2" size="sm" />
        </div>
        <div className="right-[100%] top-0 z-30 hidden h-full w-4 rounded-br-3xl bg-white"></div>
      </div>
      <div className="flex h-[688px] w-full flex-col gap-4 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl bg-gray-100 p-4">
        <div className="flex flex-row gap-4">
          <div className="h-80 w-[616px] rounded-2xl shadow-sm">
            <AddReportButton onClick={() => {}} />
          </div>
          <div className="h-80 w-[616px] rounded-2xl shadow-sm">
            <AddReportButton onClick={() => {}} />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="h-80 w-[616px] rounded-2xl shadow-sm">
            <AddReportButton onClick={() => {}} />
          </div>
          <div className="h-80 w-[616px] rounded-2xl shadow-sm">
            <AddReportButton onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};
