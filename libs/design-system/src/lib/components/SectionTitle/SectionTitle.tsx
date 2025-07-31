import React from 'react';
import { sectionTitleProps } from './SectionTitle.types';
import { alignClasses } from './SectionTitle.constants';

export const SectionTitle: React.FC<sectionTitleProps> = ({
  title,
  align,
  level,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Heading = `h${level}` as any;
  return (
    <Heading
      className={`${alignClasses[align]} text-text-neutral-primary text-2xl font-medium`}
    >
      <span className="bg-surface-brand-500 ml-1 inline-block h-1 w-1 rounded-full" />
      <span className="bg-surface-brand-600-primary ml-3 inline-block h-1.5 w-1.5 rounded-full" />
      {title}
      <span className="bg-surface-brand-600-primary mr-3 inline-block h-1.5 w-1.5 rounded-full" />
      <span className="bg-surface-brand-500 mr-1 inline-block h-1 w-1 rounded-full" />
    </Heading>
  );
};
