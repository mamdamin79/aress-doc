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
      className="border-border-neutral-primary mb-2 w-full rounded-2xl border p-6"
    >
      {({ open }) => (
        <>
          {singleOpen && open ? (
            <button className="flex w-full items-center justify-between">
              <span className="text-text-neutral-primary text-md font-semibold">
                {item.title}
              </span>
              <span
                className={`bg-button-brand-surface-default text-button-brand-label-onsurface flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 ${
                  open && openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <Icon name="chevron-down" size="lg" />
              </span>
            </button>
          ) : (
            <DisclosureButton className="flex w-full items-center justify-between">
              <span className="text-text-neutral-primary text-md font-semibold">
                {item.title}
              </span>
              <span
                className={`bg-button-brand-surface-default text-button-brand-label-onsurface flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 ${
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
                className="border-border-neutral-primary text-text-neutral-secondary mt-4 border-t pt-4 text-sm duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0"
              >
                {item.content}
              </DisclosurePanel>
            )
          ) : (
            <DisclosurePanel
              transition
              className="border-border-neutral-primary text-text-neutral-secondary mt-4 border-t pt-4 text-sm duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0"
            >
              {item.content}
            </DisclosurePanel>
          )}
        </>
      )}
    </Disclosure>
  ));
};
