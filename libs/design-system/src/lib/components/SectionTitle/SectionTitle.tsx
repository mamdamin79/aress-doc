import React from 'react';
import { sectionTitleProps } from './SectionTitle.types';
import { alignClasses } from './SectionTitle.constants';

export const SectionTitle: React.FC<sectionTitleProps> = ({
  title,
  align,
  level,
}) => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Heading
      className={`${alignClasses[align]} font-medium text-[22px] leading-[34px] text-[#05070C]`}
    >
      <span className="bg-[#33ABAA] inline-block mr-1 w-1 h-1 rounded-full"></span>
      <span className="bg-[#009695] inline-block mr-3 w-[6px] h-[6px] rounded-full"></span>
      {title}
      <span className="bg-[#009695] inline-block ml-3 w-[6px] h-[6px] rounded-full"></span>
      <span className="bg-[#33ABAA] inline-block ml-1 w-1 h-1 rounded-full"></span>
    </Heading>
  );
};
