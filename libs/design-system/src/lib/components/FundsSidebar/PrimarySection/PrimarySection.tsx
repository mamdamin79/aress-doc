import React, { useRef, useState, useEffect } from 'react';
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
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  // Check if the element is overflowing
  const checkOverflow = () => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }
  };

  // On mount and when text changes
  useEffect(() => {
    const handle = requestAnimationFrame(checkOverflow);
    return () => cancelAnimationFrame(handle);
  }, [primaryText.text]);

  // Re-check on resize (e.g., responsive containers)
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(() => checkOverflow());
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

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

  const textContent = (
    <div
      ref={textRef}
      className="block w-full overflow-hidden truncate whitespace-nowrap"
    >
      {primaryText.text}
    </div>
  );

  return (
    <div className="text-text-neutral-primary flex h-[43px] flex-col justify-center">
      <div className="flex flex-row items-center gap-0.5 text-right text-sm font-normal">
        <div
          dir="rtl"
          className={cn(
            'text-text-neutral-primary overflow-hidden whitespace-nowrap',
            getTextClass(primaryText.mode),
          )}
        >
          {isTruncated ? (
            <Tooltip
              title={primaryText.text}
              position="bottom"
              className="max-w-full"
            >
              {textContent}
            </Tooltip>
          ) : (
            textContent
          )}
        </div>

        <div className={cn('scale-x-[-1] transform', getTextClass(iconMode))}>
          {renderIcon(iconMode)}
        </div>
      </div>
      {secondaryText && (
        <div
          className={cn(
            'text-text-neutral-secondary text-right text-xs font-normal',
            getTextClass(secondaryText.mode),
          )}
        >
          {secondaryText.text}
        </div>
      )}
    </div>
  );
};
