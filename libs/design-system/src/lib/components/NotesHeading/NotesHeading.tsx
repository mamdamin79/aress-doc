import React from 'react';
import { Icon, IconProps } from '../Icon';
export interface NotesHeadingProps {
  icon: IconProps;
  title: string;
}
export const NotesHeading: React.FC<NotesHeadingProps> = ({ icon, title }) => {
  return (
    <div className="text-text-neutral-primary flex flex-row items-center gap-2">
      <Icon name={icon.name} key={icon.name} size={icon.size} />
      <span className="text-right text-xl font-medium">{title}</span>
    </div>
  );
};
