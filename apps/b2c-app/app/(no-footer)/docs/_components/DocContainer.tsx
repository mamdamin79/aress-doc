import { Icon, IconProps } from 'design-system';
import React from 'react';

export interface DocContainerProps {
  title: string;
  subtitle: string;
  icon?: IconProps['name'];
  image?: string;
  downloadButtons?: {
    title: string;
    icon: IconProps['name'];
  }[];
}

export const DocContainer: React.FC<DocContainerProps> = ({
  title,
  subtitle,
  icon,
  image,
  downloadButtons,
}) => {
  return (
    <div className="border-border-neutral-secondary text-text-neutral-primary flex w-full flex-row items-center justify-between rounded-2xl border p-3">
      <div className="flex flex-row gap-2">
        {icon && (
          <div className="bg-surface-neutral-primary border-border-neutral-secondary mt-1 flex h-8 w-8 items-center justify-center rounded-full border">
            <Icon name={icon} size="md" />
          </div>
        )}
        {image && (
          <div className="bg-surface-neutral-primary border-border-neutral-secondary mt-1 flex h-8 w-8 items-center justify-center rounded-full border">
            <img src={image} />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span className="text-md font-medium">{title}</span>
          <span className="text-text-neutral-secondary text-sm font-medium">
            {subtitle}
          </span>
        </div>
      </div>

      {downloadButtons && (
        <div className="flex flex-row gap-6">
          {downloadButtons.map((button) => (
            <div
              key={`${button.title}-${button.icon}`}
              className="text-button-brand-label-plain-default text-md flex cursor-pointer flex-row items-center gap-2 font-medium"
            >
              <span>{button.title}</span>
              <Icon name={button.icon} size="lg" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
