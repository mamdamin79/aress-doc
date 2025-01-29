import { cn } from '../../../utils';
import { Tab as TabItem } from './Tabs.types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Icon } from '../Icon';
import { FundsTag } from '../FundsTag';

interface Props {
  tabs: TabItem[];
  variant: 'shaped' | 'divided' | 'lined' | 'rounded' | 'rounded-full';
  colorMode: 'neutral' | 'inverse';
  activeTab: number;
  onClickTab: (idTab: number) => void;
}

export const Tabs: React.FC<Props> = ({
  variant,
  tabs,
  onClickTab,
  colorMode,
  activeTab,
}) => {
  return (
      <TabGroup
        selectedIndex={activeTab}
        onChange={(index) => {
          onClickTab(index);
        }}
      >
        <TabList
          className={cn(
            'flex',
            { 'w-max gap-10 border-b-2 border-gray-300': variant === 'lined' },
            { 'gap-4': variant !== 'lined' && variant !== 'divided' },
          )}
        >
          {tabs.map((props, index) => (
            <Tab
              key={index}
              className={cn(
                'font-vazirmatn text-md relative outline-none',
                {
                  'data-[selected]:bg-brand-600 relative min-w-40 rounded-t-xl py-2 text-center text-gray-600 hover:text-gray-700 data-[selected]:font-semibold data-[selected]:text-white':
                    variant === 'lined',
                },
                {
                  'data-[selected]:bg-brand-600 data-[selected]:border-brand-600 hover:border-brand-600 border-2 border-white px-4 py-2 font-semibold text-black first:rounded-r-md first:border-r-2 last:rounded-l-md data-[selected]:text-white':
                    variant === 'divided',
                },
                {
                  'bg-gray-100':
                    colorMode === 'neutral' &&
                    variant !== 'lined' &&
                    variant !== 'rounded',
                },
                {
                  'data-[selected]:bg-brand-200 data-[selected]:text-brand-800 rounded-sm px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700':
                    variant === 'rounded',
                },
                {
                  'border-2 border-gray-100': variant === 'shaped',
                  'bg-white': variant === 'shaped' && colorMode === 'inverse',
                  'bg-gray-100':
                    variant === 'shaped' && colorMode === 'neutral',
                },
                {
                  'border-white bg-white':
                    variant === 'divided' && colorMode === 'inverse',
                  'border-gray-100 bg-gray-100':
                    variant === 'divided' && colorMode === 'neutral',
                },
                {
                  'relative hover:bg-white':
                    variant === 'lined' && colorMode === 'inverse',
                },
                {
                  'relative bg-white hover:bg-gray-100':
                    variant === 'lined' && colorMode === 'neutral',
                },
                {
                  'data-[selected]:border-brand-600 data-[selected]:bg-brand-600 hover:border-brand-600 rounded-md border-2 border-white px-2 py-1 text-black data-[selected]:text-white':
                    variant === 'shaped',
                },
                {
                  'data-[selected]:bg-brand-600 data-[selected]:border-brand-600 hover:border-brand-600 flex items-center gap-2 rounded-full border-2 border-gray-100 px-4 py-2 text-sm font-medium text-black data-[selected]:border-spacing-2 data-[selected]:text-white':
                    variant === 'rounded-full',
                },
                {
                  'bg-gray-100':
                    variant === 'rounded-full' && colorMode === 'neutral',
                },
                {
                  'bg-white':
                    variant === 'rounded-full' && colorMode === 'inverse',
                },
              )}
            >
              {({ hover, selected }) => (
                <>
                  {variant === 'lined' && (
                    <div
                      className={cn(
                        {
                          'left-[100%] top-0 z-30 hidden h-full w-4 rounded-bl-3xl':
                            variant === 'lined',
                        },
                        {
                          'bg-gray-100':
                            variant === 'lined' && colorMode === 'inverse',
                        },
                        {
                          'bg-white':
                            variant === 'lined' && colorMode === 'neutral',
                        },
                        { 'absolute block': selected && index },
                        {
                          'absolute block': !selected && hover && index,
                        },
                      )}
                    ></div>
                  )}
                  {variant === 'rounded-full' && props.tag && (
                    <FundsTag color={props.tag} />
                  )}
                  {variant === 'shaped' ? (
                    <div className="flex items-center gap-2">
                      {props.tag && <FundsTag color={props.tag} />}
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
                </>
              )}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-3">
          {tabs.map(({ content }, index) => (
            <TabPanel key={index}>{content}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
  );
};
