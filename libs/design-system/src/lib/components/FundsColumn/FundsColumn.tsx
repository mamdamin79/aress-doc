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
  filtered: boolean;
  active?: boolean;
  subTitle?: string;
  defaultSort?: () => void;
}

export function FundsColumn({
  size,
  title,
  subTitle,
  shadow = false,
  sortType,
  filterable,
  type,
  clickFilterd,
  filtered,
  defaultSort,
  active,
}: Props) {
  const [sortTypeValue, setSortTypeValue] = useState<Props['type']>(type);

  useEffect(() => {
    setSortTypeValue(type)
  }, [type])  
  
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
          'bg-brand-200': active && size !== 'extraLarg' && !filterable,
          'bg-[#E3F8F8] hover:bg-brand-200':
            !filterable && size !== 'extraLarg' && !active,
          'bg-pink-200 hover:bg-pink-300': filterable && size !== 'extraLarg',
        },
        'text-text-neutral-primary group/first cursor-pointer',
      )}
    >
      <div
        className={cn(
          'relative mx-auto px-1.5 flex h-[76px] w-fit items-center justify-center gap-1',
          {
            'group-hover/first:bg-pink-300':
              size === 'extraLarg' && filterable,
            'group-hover/first:bg-brand-200':
              size === 'extraLarg' && !filterable,
            'bg-brand-200': !filterable && active && size === 'extraLarg',
            'bg-pink-300': filterable && active && size === 'extraLarg',
          },
        )}
      >
        <div className={cn(filterable ? 'visible' : 'invisible')}>
          <Icon name="filter" />
        </div>
        <div className='flex flex-col text-sm font-]'>
          <span>{title}</span>
          <span>{subTitle !== 'مشخصات صندوق' && subTitle !== 'ارکان صندوق' && subTitle !== 'سهم پرتفوی صندوق' && subTitle}</span>
        </div>
        {filtered && (
          <div className="bg-brand-600 absolute bottom-0 h-2 w-16 rounded-t-md"></div>
        )}
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
                  : 'مرتب سازی صعودی'}>
          <div
            onClick={(e) => {
              e.stopPropagation();
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
                'visible': active,
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
      </div>
    </div>
  );
}
