import { Icon, IconProps } from 'design-system';
import React from 'react';
interface TextWithIconProps {
  icon: IconProps;
  text: string;
}
export const TextWithIcon: React.FC<TextWithIconProps> = ({ icon, text }) => {
  return (
    <span className="flex flex-row items-center gap-1">
      <Icon {...icon} />
      {text}
    </span>
  );
};
