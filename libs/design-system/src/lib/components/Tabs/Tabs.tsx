'use client';
import { cn } from '../../../utils';
import { Tab as TabItem } from './Tabs.types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Icon } from '../Icon';
import { FundsTag } from '../FundsTag';

interface Props {
  tabs: TabItem[];
  variant:
    | 'shaped'
    | 'divided'
    | 'lined'
    | 'rounded'
    | 'rounded-full'
    | 'shaped-color';
  colorMode: 'neutral' | 'inverse';
  activeTab: number;
  onClickTab: (idTab: number) => void;
  className?: string;
}

export const Tabs: React.FC<Props> = ({
  variant,
  tabs,
  onClickTab,
  colorMode,
  activeTab,
  className,
}) => {
  return (
    <TabGroup
      selectedIndex={activeTab}
      onChange={(index) => {
        onClickTab(index);
      }}
      className={className}
    >
      <TabList
        className={cn(
          'flex',
          { 'w-max gap-10 border-b-2 border-border-neutral-primary': variant === 'lined' },
          { 'gap-2': variant !== 'lined' && variant !== 'divided' },
        )}
      >
        {tabs.map((props, index) => (
          <Tab
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            key={index}
            className={cn(
              'text-md relative outline-none',
              {
                'flex h-[34px] items-center gap-1 rounded-md border border-[#F3F4F6] bg-[#F3F4F6] py-1 pl-2 pr-0.5 text-sm font-medium text-[#06080F]':
                  variant === 'shaped-color',
                'pr-2': variant === 'shaped-color' && !props.tag,
                'hover:border-blue-200 hover:bg-blue-50 data-[selected]:border-blue-300 data-[selected]:bg-blue-100 data-[selected]:text-blue-700':
                  variant === 'shaped-color' && props.tag === 'blue',
                'hover:border-green-200 hover:bg-green-50 data-[selected]:border-green-300 data-[selected]:bg-green-100 data-[selected]:text-green-700':
                  variant === 'shaped-color' && props.tag === 'green',
                'hover:border-yellow-200 hover:bg-yellow-50 data-[selected]:border-yellow-300 data-[selected]:bg-yellow-100 data-[selected]:text-yellow-700':
                  variant === 'shaped-color' && props.tag === 'yellow',
                'hover:border-purple-200 hover:bg-purple-50 data-[selected]:border-purple-300 data-[selected]:bg-purple-100 data-[selected]:text-purple-700':
                  variant === 'shaped-color' && props.tag === 'purple',
                'hover:border-[#B3B6BD] hover:bg-[#F3F4F6] data-[selected]:border-[#8F9299] data-[selected]:bg-[#E1E2E5]':
                  variant === 'shaped-color' && !props.tag,
              },
              {
                'data-[selected]:bg-surface-brand-600-primary relative min-w-40 rounded-t-xl py-2 text-center text-text-neutral-secondary hover:text-text-neutral-secondarycontrast data-[selected]:font-semibold data-[selected]:text-text-onbrand-neutral-primary-on600 hover:bg-surface-neutral-secondary':
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
                'h-[34px] border-2 border-gray-100': variant === 'shaped',
                'bg-white': variant === 'shaped' && colorMode === 'inverse',
                'border-red-200 bg-gray-100':
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
                'data-[selected]:border-brand-600 data-[selected]:bg-brand-600 hover:border-brand-600 rounded-md border-2 border-gray-100 px-2 text-sm font-medium text-black data-[selected]:text-white':
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
                {(variant === 'rounded-full' || variant === 'shaped-color') &&
                  props.tag && <FundsTag color={props.tag} />}
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
