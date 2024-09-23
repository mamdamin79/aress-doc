import React from 'react';
import { sectionTitleProps } from './SectionTitle.types';

const alignClasses: Record<string, string> = {
  right: 'text-right',
  center: 'text-center',
  left: 'text-left',
};

export const SectionTitle: React.FC<sectionTitleProps> = ({ title, align }) => {
  return (
    <h2
      className={`${alignClasses[align]} font-medium text-[22px] leading-[34px] text-[#05070C]`}
    >
      <span className="bg-[#33ABAA] inline-block mr-1 w-1 h-1 rounded-full"></span>
      <span className="bg-[#009695] inline-block mr-3 w-[6px] h-[6px] rounded-full"></span>
      {title}
      <span className="bg-[#009695] inline-block ml-3 w-[6px] h-[6px] rounded-full"></span>
      <span className="bg-[#33ABAA] inline-block ml-1 w-1 h-1 rounded-full"></span>
    </h2>
  );
};
