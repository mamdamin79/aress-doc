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
      className="font-vazirmatn mb-2 w-full rounded-3xl border border-gray-300 p-6"
    >
      {({ open }) => (
        <>
          {singleOpen && open ? (
            <button className="flex w-full items-center justify-between">
              <span className="text-gray-1000 text-md font-medium">
                {item.title}
              </span>
              <span
                className={`bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-300 ${
                  open && openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <Icon name="chevron-down" size="lg" />
              </span>
            </button>
          ) : (
            <DisclosureButton className="flex w-full items-center justify-between">
              <span className="text-gray-1000 text-md">{item.title}</span>
              <span
                className={`bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-300 ${
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
                className="mt-4 border-t border-gray-300 pt-4 text-sm text-gray-500 duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0"
              >
                {item.content}
              </DisclosurePanel>
            )
          ) : (
            <DisclosurePanel
              transition
              className="mt-4 border-t border-gray-300 pt-4 text-sm text-gray-500 duration-300 data-[closed]:-translate-y-6 data-[closed]:opacity-0"
            >
              {item.content}
            </DisclosurePanel>
          )}
        </>
      )}
    </Disclosure>
  ));
};
