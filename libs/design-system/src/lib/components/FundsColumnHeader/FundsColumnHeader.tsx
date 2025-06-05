'use client';
import { useEffect, useMemo, useState } from 'react';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { cn } from '../../../utils';

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
  activeStyle?: boolean;
  activeSorticon?: boolean;
}

export function FundsColumnHeader({
  size,
  title,
  subTitle,
  activeStyle = false,
  shadow = false,
  sortType,
  filterable,
  type,
  activeSorticon = false,
  clickFilterd,
  activePlaceholder = false,
  defaultSort,
  active,
}: Props) {
  const [sortTypeValue, setSortTypeValue] = useState<Props['type']>(type);
  

  useEffect(() => {
    setSortTypeValue(type);
  }, [type]);

  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (activeSorticon) {
      timeout = setTimeout(() => {
        setShowLine(true);
      }, 200);
    } else {
      setShowLine(false);
    }

    return () => clearTimeout(timeout);
  }, [activeSorticon]);


  const tooltipTitle = useMemo(() => {
    if (!active) return '';
    if (sortType === 'ranked') {
      if (type === 'inactive') return 'مرتب سازی نزولی';
      if (type === 'active-asc') return 'مرتب سازی صعودی';
      return 'حالت پیشفرض (بدون مرتب سازی)';
    } else {
      if (type === 'inactive') return 'مرتب سازی نزولی';
      if (type === 'active-asc') return 'حالت پیشفرض (بدون مرتب سازی)';
      return 'مرتب سازی صعودی';
    }
  }, [active, sortType, type]);
  

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
          'bg-[#BCEBEB]':
            (active && size !== 'extraLarg' && !filterable) || activeStyle,
          'bg-[#E3F8F8] hover:bg-[#BCEBEB]':
            !filterable && size !== 'extraLarg' && active,
          'bg-pink-200 hover:bg-pink-300': filterable && size !== 'extraLarg',
        },
        'group/first w-full cursor-pointer',
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
        <div className={cn(filterable ? 'visible' : 'invisible')}>
          <Icon name="filter" />
        </div>

        {activeSorticon  && (
          <div className="bg-brand-600 absolute bottom-0 h-1.5 w-16 rounded-t-md"></div>
        )}
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
          className="text-md z-50 font-semibold"
          title={tooltipTitle}
        >
          <div
            onClick={() => {              
              if (typeof clickFilterd === 'function') {
                clickFilterd();
              }
              if (sortTypeValue === 'active-desc') {
                defaultSort && defaultSort();
              }
            }}
            className={cn('p-1', {
              'icon-sort-cell invisible text-[#545962] group-hover/first:visible':
                type === 'inactive',
              'hover:bg-brand-600 rounded-md duration-150 hover:text-white':
                active,
            })}
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
