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
  activeSortIcon?: boolean;
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
  activeSortIcon = false,
  clickFilterd,
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
    if (activeSortIcon) {
      timeout = setTimeout(() => {
        setShowLine(true);
      }, 200);
    } else {
      setShowLine(false);
    }

    return () => clearTimeout(timeout);
  }, [activeSortIcon]);

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

  const iconSort = useMemo(() => {
    return sortType === 'ranked'
      ? type === 'active-asc'
        ? 'arrow-down-wide-narrow'
        : 'arrow-up-narrow-wide'
      : type === 'active-asc'
        ? 'arrow-down-a-z'
        : 'arrow-up-z-a';
  }, [sortType, type]);

  return (
    <div
      className={cn(
        {
          'w-28': size === 'small',
          'w-36': size === 'medium',
          '': size === 'large',
          'w-[312px]': size === 'extraLarg',
          'shadow-4xl': shadow && size === 'extraLarg',
          'bg-surface-accent-pink-200':
            size === 'extraLarg' && filterable && !active,
          'bg-surface-brand-100': size === 'extraLarg' && !filterable,
          'bg-surface-accent-pink-300':
            active && size !== 'extraLarg' && filterable,
          'bg-surface-brand-200':
            (active && size !== 'extraLarg' && !filterable) || activeStyle,
          'bg-surface-brand-100 hover:bg-surface-brand-200':
            !filterable && size !== 'extraLarg' && active,
          'bg-surface-accent-pink-200 hover:bg-surface-accent-pink-300':
            filterable && size !== 'extraLarg',
        },
        'group/first text-text-neutral-primary w-full',
      )}
    >
      <div
        className={cn(
          'relative mx-auto flex h-[75px] w-fit items-center justify-center gap-1 px-1.5',
          {
            'group-hover/first:bg-surface-accent-pink-300':
              size === 'extraLarg' && filterable,
            'hover:bg-surface-brand-200':
              activeStyle && !filterable && size !== 'extraLarg',
            'group-hover/first:bg-surface-brand-200':
              size === 'extraLarg' && !filterable,
            'bg-surface-brand-200':
              !filterable && active && size === 'extraLarg',
            'bg-surface-accent-pink-300':
              filterable && active && size === 'extraLarg',
          },
        )}
      >
        <div className={cn(filterable ? 'visible' : 'invisible')}>
          <Icon name="filter" />
        </div>

        {activeSortIcon && showLine && (
          <div className="bg-surface-brand-600-primary absolute bottom-0 h-1.5 w-16 rounded-t-md"></div>
        )}
        <div className="flex flex-col text-sm">
          <span>{title}</span>
          <span>
            {subTitle !== 'مشخصات صندوق' &&
            subTitle !== 'ارکان صندوق' &&
            subTitle !== 'سهم پرتفوی صندوق'
              ? subTitle
              : null}
          </span>
        </div>
        <Tooltip
          className="text-md cursor-pointer font-semibold"
          title={tooltipTitle}
        >
          <div
            onClick={() => {
              if (typeof clickFilterd === 'function') {
                clickFilterd();
              }
              if (sortTypeValue === 'active-desc') {
                if (defaultSort) {
                  defaultSort();
                }
              }
            }}
            className={cn('cursor-pointer p-1', {
              'icon-sort-cell text-icon-neutral-secondarycontrast invisible group-hover/first:visible':
                type === 'inactive',
              'hover:bg-surface-brand-600-primary hover:text-icon-onbrand-neutral-on600 rounded-md duration-150':
                active,
            })}
          >
            <Icon key={'index'} name={iconSort} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
