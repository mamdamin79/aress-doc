import { cn } from '../../../utils';
import { Tab as TabItem } from './Tabs.types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Icon } from '../Icon';

interface Props {
  tabs: TabItem[];
  mode: 'shaped' | 'divided' | 'lined' | 'rounded' | 'rounded-full';
  bgWhite?: boolean;
  tag?: boolean;
  onClickTab: (idTab: number) => void;
}

export const Tabs: React.FC<Props> = ({
  mode,
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
              { 'w-max gap-10 border-b-2 border-gray-300': mode === 'lined' },
              { 'gap-4': mode !== 'lined' && mode !== 'divided' },
            )}
          >
            {tabs.map((props, index) => (
              <Tab
                onClick={() => onClickTab(props.id)}
                key={props.title}
                className={cn(
                  'font-vazirmatn text-md relative outline-none',
                  {
                    'data-[selected]:bg-brand-600 relative min-w-40 rounded-t-xl py-2 text-center text-gray-600 hover:text-gray-700 data-[selected]:font-semibold data-[selected]:text-white':
                      mode === 'lined',
                  },
                  {
                    'data-[selected]:bg-brand-600 data-[selected]:border-brand-600 hover:border-brand-600 border-2 border-white px-4 py-2 font-semibold text-black first:rounded-r-md first:border-r-2 last:rounded-l-md data-[selected]:text-white':
                      mode === 'divided',
                  },
                  {
                    'bg-gray-100':
                      !bgWhite && mode !== 'lined' && mode !== 'rounded',
                  },
                  {
                    'data-[selected]:bg-brand-200 data-[selected]:text-brand-900 rounded-sm px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700':
                      mode === 'rounded',
                  },
                  {
                    'border-2 border-gray-100 bg-white':
                      mode === 'shaped' && !bgWhite,
                    'border-2 border-gray-100 bg-gray-100':
                      mode === 'shaped' && bgWhite,
                  },
                  {
                    'border-white bg-white': mode === 'divided' && !bgWhite,
                    'border-gray-100 bg-gray-100':
                      mode === 'divided' && bgWhite,
                  },
                  {
                    'relative hover:bg-white': mode === 'lined' && !bgWhite,
                  },
                  {
                    'relative bg-white hover:bg-gray-100':
                      mode === 'lined' && bgWhite,
                  },
                  {
                    'data-[selected]:border-brand-600 data-[selected]:bg-brand-600 hover:border-brand-600 rounded-md border-2 border-white px-2 py-1 text-black data-[selected]:text-white':
                      mode === 'shaped',
                  },
                  {
                    'data-[selected]:bg-brand-600 data-[selected]:border-brand-600 hover:border-brand-600 rounded-full border-2 border-gray-100 px-4 py-2 text-sm font-medium text-black data-[selected]:border-spacing-2 data-[selected]:text-white':
                      mode === 'rounded-full',
                  },
                  {
                    'bg-gray-100': mode === 'rounded-full' && bgWhite,
                  },
                  {
                    'bg-white': mode === 'rounded-full' && !bgWhite,
                  },
                )}
              >
                {({ hover, selected }) => (
                  <>
                    {mode === 'lined' && (
                      <>
                        <div
                          className={cn(
                            {
                              'left-[100%] top-0 z-30 hidden h-full w-4 rounded-bl-3xl':
                                mode === 'lined',
                            },
                            {
                              'bg-white': mode === 'lined' && bgWhite,
                            },
                            {
                              'bg-gray-100': mode === 'lined' && !bgWhite,
                            },
                            { 'absolute block': selected && index },
                            {
                              'absolute block': !selected && hover && index,
                            },
                          )}
                        ></div>
                        <div
                          className={cn(
                            'bg-brand-600 left-[100%] top-0 z-10 hidden h-full w-4',
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
                    {mode === 'shaped' ? (
                      <div className="flex items-center gap-2">
                        {tag && (
                          <div className="bg-vividGreen-600 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white"></div>
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
                    {mode === 'lined' && (
                      <>
                        <div
                          className={cn(
                            {
                              'right-[100%] top-0 z-30 hidden h-full w-4 rounded-br-3xl bg-white':
                                mode === 'lined',
                            },
                            {
                              'bg-white': mode === 'lined' && bgWhite,
                            },
                            {
                              'bg-gray-100': mode === 'lined' && !bgWhite,
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
                            'bg-brand-600 right-[100%] top-0 z-10 hidden h-full w-4',
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
