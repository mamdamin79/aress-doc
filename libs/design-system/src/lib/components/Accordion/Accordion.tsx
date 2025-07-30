'use client';
import React, { useState } from 'react';
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
  singleOpen: boolean;
  mode: 'b2b' | 'b2c';
  className?: string;
};

export const Accordion: React.FC<Props> = ({
  items,
  singleOpen,
  mode,
  className,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return items.map((item, index) => (
    <Disclosure
      as="div"
      key={item.title}
      onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
      className={cn(
        'mb-2 w-full',
        {
          'border-border-neutral-primary rounded-2xl border p-6':
            mode === 'b2b',
          'py-4"': mode === 'b2c',
        },
        className,
      )}
    >
      {({ open }) => (
        <>
          {singleOpen && open ? (
            <button
              className={cn('group flex w-full items-center justify-between', {
                'py-4': mode === 'b2c',
              })}
            >
              <span
                className={cn(
                  'text-text-neutral-primary text-md font-semibold',
                  {
                    'group-hover:text-icon-brand-primary-600': mode === 'b2c',
                  },
                )}
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
                    'rotate-0': !open && openIndex === index,
                    'rotate-180': open && openIndex !== index,
                  },
                )}
              >
                <Icon name="chevron-down" size="lg" />
              </span>
            </button>
          ) : (
            <DisclosureButton className="flex w-full items-center justify-between">
              <span
                className={cn(
                  'group flex w-full items-center justify-between',
                  {
                    'group-hover:text-text-brand-primary-600 py-4':
                      mode === 'b2c',
                  },
                )}
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
            </DisclosureButton>
          )}
          {singleOpen ? (
            openIndex === index && (
              <DisclosurePanel
                transition
                className={cn(
                  'text-sm duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0',
                  {
                    'border-border-neutral-primary text-text-neutral-secondary mt-4 border-t pt-4':
                      mode === 'b2b',
                    'text-text-neutral-secondarycontrast pt-1': mode === 'b2c',
                  },
                )}
              >
                {item.content}
              </DisclosurePanel>
            )
          ) : (
            <DisclosurePanel
              transition
              className={cn(
                'text-sm duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0',
                {
                  'border-border-neutral-primary text-text-neutral-secondary mt-4 border-t pt-4':
                    mode === 'b2b',
                  'text-text-neutral-secondarycontrast pt-1': mode === 'b2c',
                },
              )}
            >
              {item.content}
            </DisclosurePanel>
          )}
        </>
      )}
    </Disclosure>
  ));
};
