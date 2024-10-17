import { cn } from '../../../utils';
import { Tab as TabItem } from './Tabs.types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Icon } from '../Icon';

interface Props {
  tabs: TabItem[];
  style: 'button-shaped' | 'divided-buttons' | 'lined' | 'rounded';
  bgWhite?: boolean;
}

export function Tabs({ style, tabs, bgWhite }: Props) {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="w-full">
        <TabGroup>
          <TabList
            className={cn(
              'flex',
              { 'gap-6': style === 'lined' },
              { 'gap-4': style !== 'lined' && style !== 'divided-buttons' }
            )}
          >
            {tabs.map(({ title, icons }) => (
              <Tab
                key={title}
                className={cn(
                  'font-vazirmatn duration-300 outline-none text-md',
                  {
                    'data-[selected]:border-b-[2.5px] pb-2 text-gray-600 hover:text-gray-700 hover:border-gray-700 data-[selected]:text-black data-[selected]:font-semibold min-w-52 text-center border-gray-400 border-b data-[selected]:border-brand-600':
                      style === 'lined',
                  },
                  {
                    'py-2 px-4 font-semibold data-[selected]:bg-brand-600 border-white data-[selected]:border-brand-600 first:border-r-2 hover:border-brand-600 border-2 last:rounded-l-md data-[selected]:text-white first:rounded-r-md text-black':
                      style === 'divided-buttons',
                  },
                  {
                    'bg-gray-100':
                      !bgWhite && style !== 'lined' && style !== 'rounded',
                  },
                  {
                    'hover:bg-gray-100 data-[selected]:bg-brand-200 data-[selected]:text-brand-900 font-medium text-gray-600 hover:text-gray-700 px-3 text-sm rounded-sm':
                      style === 'rounded',
                  },
                  {
                    'border-gray-100 border-2':
                      style === 'button-shaped' && !bgWhite,
                  },
                  {
                    'border-gray-100': style === 'divided-buttons' && !bgWhite,
                  },
                  {
                    'py-1 px-2 data-[selected]:border-brand-600 rounded-md border-2 border-white data-[selected]:bg-brand-600 data-[selected]:text-white hover:border-brand-600 text-black':
                      style === 'button-shaped',
                  }
                )}
              >
                {style === 'button-shaped' ? (
                  <div className="flex items-center gap-2">
                    {icons?.length && <Icon {...icons[0]} size="lg" />}
                    {title}
                    {icons?.length && title && <Icon {...icons[1]} size="lg" />}
                  </div>
                ) : (
                  <span>{title}</span>
                )}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3">
            {tabs.map(({ title, content }) => (
              <TabPanel key={title}>{content}</TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
