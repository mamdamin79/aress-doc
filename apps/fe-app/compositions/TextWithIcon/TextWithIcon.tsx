import { Icon, IconProps } from 'design-system';
import React from 'react';
interface TextWithIconProps {
  icon: IconProps;
  text: string;
}
export const TextWithIcon: React.FC<TextWithIconProps> = ({ icon, text }) => {
  return (
    <span className="text-text-neutral-secondarycontrast flex flex-row items-center justify-center gap-1">
      <Icon {...icon} />
      <div> {text}</div>
    </span>
  );
};
