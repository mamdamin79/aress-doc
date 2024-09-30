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
      className={`${alignClasses[align]} font-medium text-2xl text-gray-1000`}
    >
      <span className="bg-brand-500 inline-block ml-1 w-1 h-1 rounded-full"></span>
      <span className="bg-brand-600 inline-block ml-3 w-1.5 h-1.5 rounded-full"></span>
      {title}
      <span className="bg-brand-600 inline-block mr-3 w-1.5 h-1.5 rounded-full"></span>
      <span className="bg-brand-500 inline-block mr-1 w-1 h-1 rounded-full"></span>
    </Heading>
  );
};
