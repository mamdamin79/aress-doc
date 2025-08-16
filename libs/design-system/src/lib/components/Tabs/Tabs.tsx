'use client';
import { cn } from '../../../utils';
import { Tab as TabItem } from './Tabs.types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Icon } from '../Icon';
import { FundsTag } from '../FundsTag';
import { useEffect, useRef, useState } from 'react';

interface Props {
  tabs: TabItem[];
  size?: 'small' | 'large';
  variant:
    | 'shaped'
    | 'lined'
    | 'rounded'
    | 'rounded-full'
    | 'shaped-color'
    | 'sliding';
  activeTab: number;
  onClickTab: (idTab: number) => void;
  className?: string;
  fullWidthDivider?: boolean;
}

export const Tabs: React.FC<Props> = ({
  variant,
  tabs,
  onClickTab,
  activeTab,
  className,
  size = 'large',
  fullWidthDivider = false,
}) => {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (variant !== 'sliding') return;

    const updateSlider = () => {
      const el = tabRefs.current[activeTab];
      if (el) {
        const { offsetLeft, offsetWidth } = el;
        setSliderStyle({ left: offsetLeft, width: offsetWidth });
      }
    };

    const raf = requestAnimationFrame(updateSlider);

    const observer = new ResizeObserver(updateSlider);
    const el = tabRefs.current[activeTab];
    if (el) observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      if (el) observer.unobserve(el);
    };
  }, [activeTab, variant]);

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
          'relative flex gap-2',
          {
            'border-border-neutral-primary w-full justify-start border-b-2':
              variant === 'lined' && fullWidthDivider,
            'border-border-neutral-primary w-max gap-[50px] border-b-2':
              variant === 'lined' && !fullWidthDivider,
          },
          {
            'border-border-neutral-secondary rounded-4xl bg-surface-neutral-tertiary w-fit gap-[7px] border p-1.5':
              variant === 'sliding',
            'p-1': variant === 'sliding' && size === 'small',
          },
        )}
      >
        {variant === 'sliding' && (
          <div
            className={cn(
              'bg-surface-brand-600-primary absolute z-0 h-9 rounded-[18px] transition-all duration-300',
              {
                'h-[26px]': size === 'small',
              },
            )}
            style={{
              left: sliderStyle.left,
              width: sliderStyle.width,
            }}
          />
        )}

        {tabs.map((props, index) => (
          <Tab
            ref={(el) => {
              tabRefs.current[index] = el as HTMLButtonElement | null;
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            key={props.id ?? props.title ?? index}
            className={cn(
              'text-md relative outline-none',
              {
                'border-surface-neutral-secondary bg-surface-neutral-secondary text-text-neutral-primary flex h-[34px] items-center gap-1 rounded-md border py-1 pl-2 pr-1 text-sm font-medium':
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
                'text-text-neutral-secondary hover:text-text-brand-primary-600 data-[selected]:text-text-brand-primary-600 relative min-w-40 rounded-t-xl py-2 text-center data-[selected]:font-medium':
                  variant === 'lined',
              },
              {
                'data-[selected]:bg-surface-brand-200 data-[selected]:text-text-onbrand-colored-primary-on200_100_50 text-text-neutral-secondary hover:bg-surface-neutral-secondary hover:text-text-neutral-secondarycontrast h-[26px] rounded-sm px-3 text-sm font-medium':
                  variant === 'rounded',
              },
              {
                'border-surface-neutral-secondary h-[34px] border-2':
                  variant === 'shaped',
                'border-red-200 bg-gray-100': variant === 'shaped',
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
                'bg-surface-neutral-secondary': variant === 'rounded-full',
              },
              {
                'rounded-5xl hover:text-text-brand-primary-600 text-text-neutral-primary data-[selected]:text-text-onbrand-neutral-primary-on600 h-[36px] px-3 text-sm font-medium duration-300':
                  variant === 'sliding',
              },
              {
                'h-[26px] px-1.5 py-0.5 text-xs font-medium':
                  variant === 'sliding' && size === 'small',
              },
            )}
          >
            {({ selected }) => (
              <>
                {(variant === 'rounded-full' || variant === 'shaped-color') &&
                  props.tag && <FundsTag color={props.tag} />}
                {variant === 'lined' && selected && (
                  <div className="bg-surface-brand-600-primary absolute bottom-0 left-0 right-0 h-[5px] rounded-t-md" />
                )}
                {variant === 'shaped' ? (
                  <div className="flex items-center gap-2">
                    {props.tag && <FundsTag color={props.tag} />}
                    {props.icons?.[0] && <Icon {...props.icons[0]} size="lg" />}
                    {props.title}
                    {props.icons?.[1] && props.title && (
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
        {tabs.map(({ content, id, title }, index) => (
          <TabPanel key={id ?? title ?? index}>{content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};
