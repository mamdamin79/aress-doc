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
      className={`${alignClasses[align]} text-gray-1000 text-2xl font-medium`}
    >
      <span className="bg-brand-500 ml-1 inline-block h-1 w-1 rounded-full"></span>
      <span className="bg-brand-600 ml-3 inline-block h-1.5 w-1.5 rounded-full"></span>
      {title}
      <span className="bg-brand-600 mr-3 inline-block h-1.5 w-1.5 rounded-full"></span>
      <span className="bg-brand-500 mr-1 inline-block h-1 w-1 rounded-full"></span>
    </Heading>
  );
};
