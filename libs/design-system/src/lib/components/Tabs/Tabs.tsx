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
          {
            'border-border-neutral-primary w-max gap-10 border-b-2':
              variant === 'lined',
          },
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
                'border-surface-neutral-secondary bg-surface-neutral-secondary text-text-neutral-primary flex h-[34px] items-center gap-1 rounded-md border py-1 pl-2 pr-0.5 text-sm font-medium':
                  variant === 'shaped-color',
                'pr-2': variant === 'shaped-color' && !props.tag,
                'hover:border-border-accent-blue-200 hover:bg-surface-accent-blue-50 data-[selected]:border-border-accent-blue-300 data-[selected]:bg-surface-accent-blue-100 data-[selected]:text-blue-700':
                  variant === 'shaped-color' && props.tag === 'blue',

                'hover:border-border-accent-green-200 hover:bg-surface-accent-green-50 data-[selected]:border-border-accent-green-300 data-[selected]:bg-surface-accent-green-100 data-[selected]:text-text-accent-green-contrast-700':
                  variant === 'shaped-color' && props.tag === 'green',

                'hover:border-border-accent-yellow-200 hover:bg-surface-accent-yellow-50 data-[selected]:border-border-accent-yellow-300 data-[selected]:bg-surface-accent-yellow-100 data-[selected]:text-text-accent-yellow-primary-700':
                  variant === 'shaped-color' && props.tag === 'yellow',

                'hover:border-border-accent-purple-200 hover:bg-surface-accent-purple-50 data-[selected]:border-border-accent-purple-300 data-[selected]:bg-surface-accent-purple-100 data-[selected]:text-text-accent-purple-contrast-700':
                  variant === 'shaped-color' && props.tag === 'purple',

                'hover:border-border-neutral-contrast hover:bg-surface-neutral-secondary data-[selected]:border-border-neutral-highcontrast data-[selected]:bg-surface-neutral-secondarycontrast':
                  variant === 'shaped-color' && !props.tag,
              },
              {
                'data-[selected]:bg-surface-brand-600-primary text-text-neutral-secondary hover:text-text-neutral-secondarycontrast data-[selected]:text-text-onbrand-neutral-primary-on600 hover:bg-surface-neutral-secondary relative min-w-40 rounded-t-xl py-2 text-center data-[selected]:font-medium':
                  variant === 'lined',
              },
              {
                'data-[selected]:bg-surface-brand-600-primary data-[selected]:border-border-brand-primary-600 hover:border-border-brand-primary-600 text-text-neutral-secondarycontrast data-[selected]:text-text-onbrand-neutral-primary-on600 border-2 px-4 py-2 first:rounded-r-md first:border-r-2 last:rounded-l-md data-[selected]:font-medium':
                  variant === 'divided',
              },
              {
                'bg-surface-neutral-secondary':
                  colorMode === 'neutral' &&
                  variant !== 'lined' &&
                  variant !== 'rounded',
              },
              {
                'data-[selected]:bg-surface-brand-200 data-[selected]:text-text-onbrand-colored-primary-on200_100_50 text-text-neutral-secondary hover:bg-surface-neutral-secondary hover:text-text-neutral-secondarycontrast h-[26px] rounded-sm px-3 text-sm font-medium':
                  variant === 'rounded',
              },
              {
                'border-surface-neutral-secondary h-[34px] border-2':
                  variant === 'shaped',
                'bg-surface-neutral-primary':
                  variant === 'shaped' && colorMode === 'inverse',
                // 'border-red-200 bg-gray-100':
                //   variant === 'shaped' && colorMode === 'neutral',
              },
              {
                'border-surface-neutral-primary bg-surface-neutral-primary':
                  variant === 'divided' && colorMode === 'inverse',
                'border-surface-neutral-secondary bg-surface-neutral-secondary':
                  variant === 'divided' && colorMode === 'neutral',
              },
              {
                'hover:bg-surface-neutral-primary relative':
                  variant === 'lined' && colorMode === 'inverse',
              },
              {
                'hover:bg-surface-neutral-secondary relative':
                  variant === 'lined' && colorMode === 'neutral',
              },
              {
                'data-[selected]:border-border-brand-primary-600 data-[selected]:bg-surface-brand-600-primary hover:border-border-brand-primary-600 border-border-neutral-tertiary text-text-neutral-primary data-[selected]:text-text-neutral-white rounded-md border-2 px-2 text-sm font-medium':
                  variant === 'shaped',
              },
              {
                'data-[selected]:bg-surface-brand-600-primary data-[selected]:border-border-brand-primary-600 hover:border-border-brand-primary-600 border-surface-neutral-secondary text-text-neutral-primary data-[selected]:text-text-onbrand-neutral-primary-on600 flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium data-[selected]:border-spacing-2':
                  variant === 'rounded-full',
              },
              {
                'bg-surface-neutral-secondary':
                  variant === 'rounded-full' && colorMode === 'neutral',
              },
              {
                'bg-surface-neutral-primary':
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
                        'hover:bg-surface-neutral-primary':
                          variant === 'lined' && colorMode === 'inverse',
                      },
                      {
                        'hover:bg-surface-neutral-secondary':
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
