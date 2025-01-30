'use client';
import { AddReportButton } from 'design-system';
import React from 'react';


export const SlidersBox: React.FC = () => {
  return (
    <div
      className={`grid w-[616px] grid-cols-1 gap-6 xl:w-[1256px] xl:grid-cols-2`}
    >
      <div className="shadow-6xl h-[336px] overflow-hidden rounded-2xl border-2 border-gray-200">
        <AddReportButton onClick={() => {}} />
      </div>
      <div className="shadow-6xl h-[336px] overflow-hidden rounded-2xl border-2 border-gray-200">
        <AddReportButton onClick={() => {}} />
      </div>
      <div className="shadow-6xl h-[336px] overflow-hidden rounded-2xl border-2 border-gray-200">
        <AddReportButton onClick={() => {}} />
      </div>
      <div className="shadow-6xl h-[336px] overflow-hidden rounded-2xl border-2 border-gray-200">
        <AddReportButton onClick={() => {}} />
      </div>
    </div>
  );
};
