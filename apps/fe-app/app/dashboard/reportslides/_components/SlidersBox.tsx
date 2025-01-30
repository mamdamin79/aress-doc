'use client';
import { AddReportButton, Icon } from 'design-system';
import React from 'react';
export const SlidersBox: React.FC = () => {
  return (
    <div className="grid w-[616px] grid-cols-1 content-center gap-6 xl:w-[1256px] xl:grid-cols-2">
      <div className="shadow-6xl w-[616px] overflow-hidden rounded-2xl border-2 border-gray-200">
        <AddReportButton onClick={() => {}} />
      </div>
      <div className="shadow-6xl w-[616px] overflow-hidden rounded-2xl border-2 border-gray-200">
        <AddReportButton onClick={() => {}} />
      </div>
      <div className="shadow-6xl w-[616px] overflow-hidden rounded-2xl border-2 border-gray-200">
        <AddReportButton onClick={() => {}} />
      </div>
      <div className="shadow-6xl w-[616px] overflow-hidden rounded-2xl border-2 border-gray-200">
        <AddReportButton onClick={() => {}} />
      </div>
      <div className="shadow-6xl w-[616px] overflow-hidden rounded-2xl border-2 border-gray-200">
        <AddReportButton onClick={() => {}} />
      </div>
      <div className="shadow-6xl w-[616px] overflow-hidden rounded-2xl border-2 border-gray-200">
        <AddReportButton onClick={() => {}} />
      </div>
      <div className="shadow-6xl w-[616px] overflow-hidden rounded-2xl border-2 border-gray-200">
        <AddReportButton onClick={() => {}} />
      </div>
    </div>
  );
};
