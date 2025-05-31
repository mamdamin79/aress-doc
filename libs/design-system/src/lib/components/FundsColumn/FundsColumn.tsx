'use client';
import { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { cn } from './../../../utils';

interface Props {
  size: 'small' | 'medium' | 'large' | 'extraLarg';
  title: string;
  sortType: 'alphabetical' | 'ranked';
  filterable: boolean;
  type: 'inactive' | 'active-desc' | 'active-asc';
  shadow?: boolean;
  clickFilterd: () => void;
  active?: boolean;
  subTitle?: string;
  defaultSort?: () => void;
  activePlaceholder?: boolean;
  dragPosition?: 'right' | 'left';
  activeStyle?: boolean;
}

export function FundsColumn({
  size,
  title,
  subTitle,
  activeStyle = false,
  dragPosition,
  shadow = false,
  sortType,
  filterable,
  type,
  clickFilterd,
  activePlaceholder = false,
  defaultSort,
  active,
}: Props) {
  const [sortTypeValue, setSortTypeValue] = useState<Props['type']>(type);

  useEffect(() => {
    setSortTypeValue(type);
  }, [type]);

  return (
    <div
      className={cn(
        {
          'w-28': size === 'small',
          'w-36': size === 'medium',
          'w-[200px]': size === 'large',
          'w-[312px]': size === 'extraLarg',
          'shadow-4xl': shadow && size === 'extraLarg',
          'bg-pink-200': size === 'extraLarg' && filterable && !active,
          'bg-[#E3F8F8]': size === 'extraLarg' && !filterable,
          'bg-pink-300': active && size !== 'extraLarg' && filterable,
          'bg-[#BCEBEB]': (active && size !== 'extraLarg' && !filterable) || activeStyle,
          'bg-[#E3F8F8] hover:bg-[#BCEBEB]':
            !filterable && size !== 'extraLarg' && active,
          'bg-pink-200 hover:bg-pink-300': filterable && size !== 'extraLarg',
        },
        'group/first cursor-pointer',
      )}
    >
      <div
        className={cn(
          'relative mx-auto flex h-[76px] w-fit items-center justify-center gap-1 px-1.5',
          {
            'group-hover/first:bg-pink-300': size === 'extraLarg' && filterable,
            'hover:bg-[#BCEBEB]':
              activeStyle && !filterable && size !== 'extraLarg',
            'group-hover/first:bg-[#BCEBEB]':
              size === 'extraLarg' && !filterable,
            'bg-[#BCEBEB]': !filterable && active && size === 'extraLarg',
            'bg-pink-300': filterable && active && size === 'extraLarg',
          },
        )}
      >
        {activePlaceholder && dragPosition === 'left' && (
          <div className="relative h-[90%] w-0.5 rounded-full bg-[#0F7575]">
            <div className="absolute top-0 flex h-2.5 w-2.5 translate-x-1 items-center justify-center rounded-full bg-[#0F7575]">
              <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
            </div>
          </div>
        )}
        <div className={cn(filterable ? 'visible' : 'invisible')}>
          <Icon name="filter" />
        </div>

        <div className="font-] flex flex-col text-sm">
          <span>{title}</span>
          <span>
            {subTitle !== 'مشخصات صندوق' &&
              subTitle !== 'ارکان صندوق' &&
              subTitle !== 'سهم پرتفوی صندوق' &&
              subTitle}
          </span>
        </div>

        <Tooltip
          title={
            sortType === 'ranked'
              ? type === 'inactive'
                ? 'مرتب سازی نزولی'
                : type === 'active-asc'
                  ? 'مرتب سازی صعودی'
                  : 'حالت پیشفرض (بدون مرتب سازی)'
              : type === 'inactive'
                ? 'مرتب سازی نزولی'
                : type === 'active-asc'
                  ? 'حالت پیشفرض (بدون مرتب سازی)'
                  : 'مرتب سازی صعودی'
          }
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              if (typeof clickFilterd === 'function') {
                clickFilterd();
              }
              if (sortTypeValue === 'active-desc') {
                defaultSort && defaultSort();
              }
            }}
            className={cn(
              {
                'invisible text-[#545962] group-hover/first:visible':
                  type === 'inactive',
              },
              'hover:bg-brand-600 rounded-md p-1 duration-150 hover:text-white',
            )}
          >
            <Icon
              name={
                sortType === 'ranked'
                  ? type === 'active-asc'
                    ? 'arrow-down-wide-narrow'
                    : 'arrow-up-narrow-wide'
                  : type === 'active-asc'
                    ? 'arrow-down-a-z'
                    : 'arrow-up-z-a'
              }
            />
          </div>
        </Tooltip>
        {activePlaceholder && dragPosition === 'right' && (
          <div className="relative h-[90%] w-0.5 rounded-full bg-[#0F7575]">
            <div className="absolute top-0 flex h-2.5 w-2.5 translate-x-1 items-center justify-center rounded-full bg-[#0F7575]">
              <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
