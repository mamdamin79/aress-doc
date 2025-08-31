'use client';
import React, { useState, useEffect } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Icon } from '../Icon';
import { AccordionItem } from './Accordion.types';
import { cn } from './../../../utils';

type Props = {
  items: AccordionItem[];
  singleOpen?: boolean;
  mode?: 'b2b' | 'b2c';
  className?: string;
  // Additional customization options
  allowMultiple?: boolean;
  defaultOpenItems?: number[];
};

export const Accordion: React.FC<Props> = ({
  items,
  singleOpen = false,
  mode = 'b2c',
  className,
  allowMultiple = false,
  defaultOpenItems = [],
}) => {
  const [, setOpenIndexes] = useState<Set<number>>(new Set());

  // Initialize default open items
  useEffect(() => {
    if (defaultOpenItems.length > 0) {
      setOpenIndexes(new Set(defaultOpenItems));
    } else {
      // Set defaultOpen items from item props
      const defaultItems = items
        .map((item, index) => (item.defaultOpen ? index : null))
        .filter((index): index is number => index !== null);
      if (defaultItems.length > 0) {
        setOpenIndexes(new Set(defaultItems));
      }
    }
  }, [defaultOpenItems, items]);

  const handleToggle = (index: number) => {
    if (singleOpen && !allowMultiple) {
      setOpenIndexes((prev) =>
        prev.has(index) ? new Set() : new Set([index]),
      );
    } else {
      setOpenIndexes((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    }
  };

  const renderDefaultTrigger = (item: AccordionItem, open: boolean) => (
    <div
      className={cn('group flex w-full items-center justify-between', {
        'py-4': mode === 'b2c',
      })}
    >
      <span
        className={cn('text-text-neutral-primary text-md font-semibold', {
          'group-hover:text-icon-brand-primary-600': mode === 'b2c',
        })}
      >
        {item.title}
      </span>
      <span
        className={cn(
          'flex items-center justify-center transition-transform duration-300',
          {
            'text-button-brand-label-onsurface bg-button-brand-surface-default h-8 w-8 rounded-full':
              mode === 'b2b',
            'text-icon-neutral-primary group-hover:text-icon-brand-primary-600':
              mode === 'b2c',
            'rotate-0': !open,
            'rotate-180': open,
          },
        )}
      >
        <Icon name="chevron-down" size="lg" />
      </span>
    </div>
  );

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => {
        const isCustomMode = item.trigger && item.content;
        const isDefaultOpen =
          defaultOpenItems.includes(index) || item.defaultOpen;

        return (
          <Disclosure
            as="div"
            key={`accordion-item-${index}`}
            defaultOpen={isDefaultOpen}
            className={cn(
              'w-full',
              {
                'border-border-neutral-primary rounded-2xl border p-6':
                  mode === 'b2b',
                'py-4': mode === 'b2c',
              },
              item.className,
            )}
          >
            {({ open }) => (
              <>
                <DisclosureButton
                  onClick={() => handleToggle(index)}
                  className="w-full focus:outline-none"
                >
                  {isCustomMode
                    ? typeof item.trigger === 'function'
                      ? item.trigger(open)
                      : item.trigger
                    : renderDefaultTrigger(item, open)}
                </DisclosureButton>

                <DisclosurePanel
                  transition
                  className={cn(
                    'text-sm duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0',
                    {
                      'border-bordimary text-text-neutral-secondary duration-30 mt-4 border-t pt-40':
                        mode === 'b2b' && !isCustomMode,
                      'text-text-neutral-secondarycontrast pt-1':
                        mode === 'b2c' && !isCustomMode,
                    },
                  )}
                >
                  {item.content}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};
