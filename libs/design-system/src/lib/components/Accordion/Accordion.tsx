'use client';
import React, { useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Icon } from '../Icon';
import { AccordionItem } from './Accordion.types';

type Props = {
  items: AccordionItem[];
  singleOpen: boolean;
};

export const Accordion: React.FC<Props> = ({ items, singleOpen }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return items.map((item, index) => (
    <Disclosure
      as="div"
      key={item.title}
      onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
      className="mb-2 w-full rounded-3xl border border-border-neutral-primary p-6"
    >
      {({ open }) => (
        <>
          {singleOpen && open ? (
            <button className="flex w-full items-center justify-between">
              <span className="text-text-neutral-primary text-md font-medium">
                {item.title}
              </span>
              <span
                className={`bg-button-brand-surface-default flex h-10 w-10 items-center justify-center rounded-full text-button-brand-label-onsurface transition-transform duration-300 ${
                  open && openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <Icon name="chevron-down" size="lg" />
              </span>
            </button>
          ) : (
            <DisclosureButton className="flex w-full items-center justify-between">
              <span className="text-text-neutral-primary text-md">{item.title}</span>
              <span
                className={`bg-button-brand-surface-default flex h-10 w-10 items-center justify-center rounded-full text-button-brand-label-onsurface transition-transform duration-300 ${
                  open ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <Icon name="chevron-down" size="lg" />
              </span>
            </DisclosureButton>
          )}
          {singleOpen ? (
            openIndex === index && (
              <DisclosurePanel
                transition
                className="mt-4 border-t border-border-neutral-primary pt-4 text-sm text-text-neutral-secondary duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0"
              >
                {item.content}
              </DisclosurePanel>
            )
          ) : (
            <DisclosurePanel
              transition
              className="mt-4 border-t border-border-neutral-primary pt-4 text-sm text-text-neutral-secondary duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0"
            >
              {item.content}
            </DisclosurePanel>
          )}
        </>
      )}
    </Disclosure>
  ));
};
