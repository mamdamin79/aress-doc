import React from 'react';
import { Icon } from '../../Icon';
import { cn } from '../../../../utils/classNames.utils';
import { Tooltip } from '../../Tooltip';

type Modes = 'positive' | 'negative' | 'neutral';

export interface PrimarySectionProps {
  primaryText: {
    text: string;
    mode: Modes;
  };
  iconMode?: Modes;
  secondaryText?: {
    text: string;
    mode: Modes;
  };
}

export const PrimarySection: React.FC<PrimarySectionProps> = ({
  primaryText,
  iconMode,
  secondaryText,
}) => {
  const getTextClass = (mode?: Modes) => {
    switch (mode) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return '';
    }
  };

  const renderIcon = (mode?: Modes) => {
    if (mode === 'positive') return <Icon name="trending-up" size="md" />;
    if (mode === 'negative') return <Icon name="trending-down" size="md" />;
    return null;
  };

  return (
    <div className="flex h-[43px] max-w-full flex-col justify-center">
      <div className="flex flex-row items-center gap-0.5 text-right text-sm font-normal">
        <div
          className={cn(
            'text-gray-1000 overflow-hidden whitespace-nowrap',
            getTextClass(primaryText.mode),
          )}
        >
          <Tooltip
            title={primaryText.text}
            position="bottom"
            className="max-w-full"
          >
            <div className="block w-full overflow-hidden truncate whitespace-nowrap">
              {primaryText.text}
            </div>
          </Tooltip>
        </div>

        <div className={cn('scale-x-[-1] transform', getTextClass(iconMode))}>
          {renderIcon(iconMode)}
        </div>
      </div>
      {secondaryText && (
        <div
          className={cn(
            'text-right text-xs font-normal text-gray-600',
            getTextClass(secondaryText.mode),
          )}
        >
          {secondaryText.text}
        </div>
      )}
    </div>
  );
};
