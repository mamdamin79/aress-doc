import React, { useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Icon } from '../Icon';
import { AccordionItem } from './Accordion.types';

type props = {
  items: AccordionItem[];
  singleOpen: boolean;
};

export const Accordion: React.FC<props> = ({ items, singleOpen }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return items.map((item, index) => (
    <Disclosure
      as="div"
      key={item.title}
      onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
      className="w-full border p-6 rounded-3xl border-gray-300 mb-2 font-vazirmatn"
    >
      {({ open }) => (
        <>
          {singleOpen && open ? (
            <button className=" flex w-full items-center justify-between ">
              <span className="text-gray-1000 text-md">{item.title}</span>
              <span
                className={`bg-brand-600  text-white rounded-full flex items-center justify-center p-1 transition-transform duration-300 ${
                  open && openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <Icon name="chevron-down" size="lg" />
              </span>
            </button>
          ) : (
            <DisclosureButton className=" flex w-full items-center justify-between ">
              <span className="text-gray-1000 text-md">{item.title}</span>
              <span
                className={`bg-brand-600 text-white rounded-full flex items-center justify-center p-1 transition-transform duration-300 ${
                  open ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <Icon name="chevron-down" size="lg" />
              </span>
            </DisclosureButton>
          )}
          {singleOpen ? (
            openIndex === index && (
              <DisclosurePanel className="border-t border-gray-300 text-sm text-gray-500 mt-4 pt-4">
                {item.content}
              </DisclosurePanel>
            )
          ) : (
            <DisclosurePanel className="border-t border-gray-300 text-sm text-gray-500 mt-4 pt-4">
              {item.content}
            </DisclosurePanel>
          )}
        </>
      )}
    </Disclosure>
  ));
};
