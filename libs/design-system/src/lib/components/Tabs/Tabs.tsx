import { cn } from '../../../utils';
import { Tab as TabItem } from './Tabs.types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Icon } from '../Icon';

interface Props {
  tabs: TabItem[];
  style: 'shaped' | 'divided' | 'lined' | 'rounded' | 'rounded-full';
  bgWhite?: boolean;
  tag?: boolean;
  onClickTab: (idTab: number) => void;
}

export const Tabs: React.FC<Props> = ({
  style,
  tabs,
  onClickTab,
  bgWhite,
  tag,
}) => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full">
        <TabGroup>
          <TabList
            className={cn(
              'flex',
              { 'gap-10 w-max border-b-2 border-gray-300': style === 'lined' },
              { 'gap-4': style !== 'lined' && style !== 'divided' },
            )}
          >
            {tabs.map((props, index) => (
              <Tab
                onClick={() => onClickTab(props.id)}
                key={props.title}
                className={cn(
                  'font-vazirmatn relative outline-none text-md',
                  {
                    'py-2 data-[selected]:bg-brand-600 relative rounded-t-xl text-gray-600 data-[selected]:text-white hover:text-gray-700 data-[selected]:font-semibold min-w-40 text-center':
                      style === 'lined',
                  },
                  {
                    'py-2 px-4 font-semibold data-[selected]:bg-brand-600 border-white data-[selected]:border-brand-600 first:border-r-2 hover:border-brand-600 border-2 last:rounded-l-md data-[selected]:text-white first:rounded-r-md text-black':
                      style === 'divided',
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
                    'border-gray-100 border-2 bg-white':
                      style === 'shaped' && !bgWhite,
                    'border-gray-100 border-2 bg-gray-100':
                      style === 'shaped' && bgWhite,
                  },
                  {
                    'border-white bg-white': style === 'divided' && !bgWhite,
                    'border-gray-100 bg-gray-100':
                      style === 'divided' && bgWhite,
                  },
                  {
                    'relative hover:bg-white': style === 'lined' && !bgWhite,
                  },
                  {
                    'bg-white relative hover:bg-gray-100':
                      style === 'lined' && bgWhite,
                  },
                  {
                    'py-1 px-2 data-[selected]:border-brand-600 rounded-md border-2 border-white data-[selected]:bg-brand-600 data-[selected]:text-white hover:border-brand-600 text-black':
                      style === 'shaped',
                  },
                  {
                    'py-2 px-4 text-sm data-[selected]:bg-brand-600 font-medium data-[selected]:border-spacing-2 rounded-full border-2 border-gray-100 data-[selected]:border-brand-600 data-[selected]:text-white hover:border-brand-600 text-black':
                      style === 'rounded-full',
                  },
                  {
                    'bg-gray-100': style === 'rounded-full' && bgWhite,
                  },
                  {
                    'bg-white': style === 'rounded-full' && !bgWhite,
                  },
                )}
              >
                {({ hover, selected }) => (
                  <>
                    {style === 'lined' && (
                      <>
                        <div
                          className={cn(
                            {
                              'hidden top-0 w-4 z-30 h-full left-[100%] rounded-bl-3xl ':
                                style === 'lined',
                            },
                            {
                              'bg-white': style === 'lined' && bgWhite,
                            },
                            {
                              'bg-gray-100': style === 'lined' && !bgWhite,
                            },
                            { 'absolute block': selected && index },
                            {
                              'absolute block': !selected && hover && index,
                            },
                          )}
                        ></div>
                        <div
                          className={cn(
                            'w-4 bg-brand-600 top-0 left-[100%] hidden z-10 h-full',
                            { 'absolute block': selected && index },
                            {
                              'absolute block bg-white':
                                !selected && hover && index && !bgWhite,
                            },
                            {
                              'absolute block bg-gray-100':
                                !selected && hover && index && bgWhite,
                            },
                          )}
                        ></div>
                      </>
                    )}
                    {style === 'shaped' ? (
                      <div className="flex items-center gap-2">
                        {tag && (
                          <div className="rounded-full w-3 border-white bg-vividGreen-600 h-3 border-2 flex items-center justify-center"></div>
                        )}
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
                              'bg-white': style === 'lined' && bgWhite,
                            },
                            {
                              'bg-gray-100': style === 'lined' && !bgWhite,
                            },
                            {
                              'absolute block':
                                selected && index + 1 < tabs.length,
                            },
                            {
                              'absolute block':
                                hover && !selected && index + 1 !== tabs.length,
                            },
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
                              'absolute block bg-white':
                                !selected &&
                                hover &&
                                index + 1 !== tabs.length &&
                                !bgWhite,
                            },
                            {
                              'absolute block bg-gray-100':
                                !selected &&
                                hover &&
                                index + 1 !== tabs.length &&
                                bgWhite,
                            },
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
