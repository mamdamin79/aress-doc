'use client';
import React, { useId, cloneElement, useState, useEffect, useRef } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { cn } from '../../../utils/classNames.utils';
import { ToolTipInfoProps } from './ToolTipInfo.types';
import 'react-tooltip/dist/react-tooltip.css';

// Arrow SVG as a component to avoid external file dependency
const ArrowPointer: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="50"
    height="15"
    viewBox="0 0 50 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M25 0L50 15H0L25 0Z"
      fill="var(--color-surface-neutral-secondary)"
    />
  </svg>
);

// Bullet point SVG as a component
const BulletPoint: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('shrink-0', className)}
  >
    <circle cx="3" cy="3" r="3" fill="var(--color-text-brand-primary-600)" />
  </svg>
);

const ToolTipContent: React.FC<{
  title?: string;
  description?: string;
  items?: Array<{ text: string; id?: string }>;
}> = ({ title, description, items = [] }) => {
  return (
    <div className="relative flex flex-col items-center justify-start opacity-100">
      {/* Arrow Pointer */}
      <div className="relative -mb-0.5 flex shrink-0 items-center justify-center">
        <div className="flex-none scale-y-[-100%]">
          <ArrowPointer className="h-[15px] w-[50px] rotate-180 backdrop-blur-[6px] backdrop-filter" />
        </div>
      </div>

      {/* Tooltip Content */}
      <div className="bg-surface-neutral-secondary text-text-neutral-primary flex flex-col gap-2 rounded-3xl p-2 opacity-100">
        <div className="bg-surface-neutral-primary flex flex-col rounded-2xl p-4 pb-3 text-right opacity-100">
          {title && (
            <span className="min-w-[124px] max-w-[220px] text-xs opacity-100">
              {title}
            </span>
          )}
          {description && (
            <span className="text-text-neutral-secondary min-w-[124px] max-w-[220px] text-xs opacity-100">
              {description}
            </span>
          )}
          {items.length > 0 && (
            <div className="flex flex-col gap-1 opacity-100">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row items-center gap-2 opacity-100"
                >
                  <BulletPoint />
                  <span className="text-xs opacity-100">{item.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ToolTipInfo: React.FC<ToolTipInfoProps> = ({
  children,
  title = 'عنوان',
  description = 'متن',
  items = [],
  className,
  offset = 4,
  trigger = 'hover',
}) => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const tooltipContent = (
    <ToolTipContent title={title} description={description} items={items} />
  );

  // Handle click outside to close tooltip
  useEffect(() => {
    if (trigger !== 'click' || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Don't close if clicking on the trigger element or tooltip content
      if (
        triggerRef.current?.contains(target) ||
        tooltipRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [trigger, isOpen]);

  const handleTriggerClick = () => {
    if (trigger === 'click') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Apply tooltip ID and click handler to the child element */}
      {cloneElement(children, {
        ...({
          'data-tooltip-id': id,
          ref: triggerRef,
          onClick: trigger === 'click' ? handleTriggerClick : undefined,
        } as React.HTMLAttributes<HTMLElement>),
      })}
      <ReactTooltip
        id={id}
        place={'bottom'}
        offset={offset}
        clickable
        openOnClick={trigger === 'click'}
        isOpen={trigger === 'click' ? isOpen : undefined}
        globalCloseEvents={trigger === 'hover' ? undefined : {}}
        style={{
          backgroundColor: 'transparent',
          padding: '0',
          border: 'none',
          borderRadius: '0',
          boxShadow: 'none',
          opacity: 1,
        }}
        className={cn('z-50 !opacity-100', className)}
      >
        <div ref={tooltipRef}>{tooltipContent}</div>
      </ReactTooltip>
    </>
  );
};
