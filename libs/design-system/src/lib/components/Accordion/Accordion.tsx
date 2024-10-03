import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { accordionPropsType } from './Accordion.types';
import { Icon } from '../IconComponent';

export const Accordion: React.FC<accordionPropsType> = ({
  items,
  singleOpen,
}) => {
  return items.map((item, index) => (
    <Disclosure
      as="div"
      key={item.title}
      className="w-full border p-6 rounded-lg border-gray-300 mb-2"
    >
      {({ open }) => (
        <>
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
          <DisclosurePanel className="border-t border-gray-300 text-sm text-gray-500 mt-4 pt-4">
            {item.content}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  ));
};
