import { cn } from '../../../utils';
import { Tab as TabItem } from './Tabs.types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Icon } from '../Icon';

interface Props {
  tabs: TabItem[];
  style:
    | 'button-shaped'
    | 'divided-buttons'
    | 'lined'
    | 'rounded'
    | 'button-rounded';
  bgWhite?: boolean;
}

export const Tabs: React.FC<Props> = ({ style, tabs, bgWhite }) => {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="w-full">
        <TabGroup>
          <TabList
            className={cn(
              'flex',
              { 'gap-10 w-max pl-5': style === 'lined' },
              { 'gap-4': style !== 'lined' && style !== 'divided-buttons' }
            )}
          >
            {tabs.map((props, index) => (
              <Tab
                key={props.title}
                className={cn(
                  'font-vazirmatn relative outline-none text-md',
                  {
                    'py-2 hover:bg-gray-100 text-gray-600 data-[selected]:text-white hover:text-gray-700 data-[selected]:font-semibold min-w-52 text-center':
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
                    'data-[selected]:bg-brand-600 relative rounded-t-xl':
                      style === 'lined',
                  },
                  {
                    'py-1 px-2 data-[selected]:border-brand-600 rounded-md border-2 border-white data-[selected]:bg-brand-600 data-[selected]:text-white hover:border-brand-600 text-black':
                      style === 'button-shaped',
                  },
                  {
                    'py-2 px-4 text-sm data-[selected]:bg-brand-600 bg-gray-100 font-medium data-[selected]:border-spacing-2 rounded-full border-2 border-gray-100 data-[selected]:border-brand-600 data-[selected]:text-white hover:border-brand-600 text-black':
                      style === 'button-rounded',
                  }
                )}
              >
                {({ hover, selected }) => (
                  <>
                    {style === 'lined' && (
                      <>
                        <div
                          className={cn(
                            {
                              'hidden top-0 w-4 z-30 h-full bg-white left-[100%] rounded-bl-3xl ':
                                style === 'lined',
                            },
                            { 'absolute block': selected && index !== 0 },
                            {
                              'absolute block':
                                !selected && hover && index !== 0,
                            }
                          )}
                        ></div>
                        <div
                          className={cn(
                            'w-4 bg-brand-600 top-0 left-[100%] hidden z-10 h-full',
                            { 'absolute block': selected && index !== 0 },
                            {
                              'absolute block bg-gray-100':
                                !selected && hover && index !== 0,
                            }
                          )}
                        ></div>
                      </>
                    )}
                    {style === 'button-shaped' ? (
                      <div className="flex items-center gap-2">
                        {props.icons?.length && (
                          <Icon {...props.icons[0]} size="lg" />
                        )}
                        {props.title}
                        {props.icons?.length && props.title && (
                          <Icon {...props.icons[1]} size="lg" />
                        )}
                      </div>
                    ) : (
                      <span>{props.title}</span>
                    )}
                    {style === 'lined' && (
                      <>
                        <div
                          className={cn(
                            {
                              'hidden top-0 w-4 z-30 h-full bg-white right-[100%] rounded-br-3xl ':
                                style === 'lined',
                            },
                            {
                              'absolute block':
                                selected && index + 1 < tabs.length,
                            },
                            {
                              'absolute block':
                                hover && !selected && index + 1 !== tabs.length,
                            }
                          )}
                        ></div>
                        <div
                          className={cn(
                            'w-4 bg-brand-600 top-0 right-[100%] hidden z-10 h-full',
                            {
                              'absolute block':
                                selected && index + 1 !== tabs.length,
                            },
                            {
                              'absolute block bg-gray-100':
                                !selected && hover && index + 1 !== tabs.length,
                            }
                          )}
                        ></div>
                      </>
                    )}
                  </>
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
};
