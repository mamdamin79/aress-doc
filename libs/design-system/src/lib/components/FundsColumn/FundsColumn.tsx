import { Icon } from '../Icon';
import { cn } from './../../../utils';

interface Props {
  size: 'small' | 'medium' | 'large' | 'extraLarg';
  title: string;
  sortType: 'alphabetical' | 'ranked';
  filterable: boolean;
  type: 'inactive' | 'active-desc' | 'active-asc';
  shadow?: boolean;
}

export function FundsColumn({
  size,
  title,
  shadow = false,
  sortType,
  filterable,
  type,
}: Props) {
  return (
    <div
      className={cn(
        {
          'w-28': size === 'small',
          'w-36': size === 'medium',
          'w-[200px]': size === 'large',
          'w-[312px]': size === 'extraLarg',
          'shadow-4xl': shadow && size === 'extraLarg',
          'bg-pink-200': size === 'extraLarg' && filterable,
          'bg-brand-100': size === 'extraLarg' && !filterable,
          'bg-brand-100 hover:bg-brand-200':
            !filterable && size !== 'extraLarg',
          'bg-pink-200 hover:bg-pink-300': filterable && size !== 'extraLarg',
        },
        'text-text-neutral-primary group cursor-pointer text-sm font-medium',
      )}
    >
      <div
        className={cn(
          'mx-auto flex h-[72px] items-center justify-center gap-1 py-[23px]',
          {
            'w-[108px] bg-pink-200 group-hover:bg-pink-300':
              size === 'extraLarg' && filterable,
            'group-hover:bg-brand-300 bg-brand-200 w-[108px]':
              size === 'extraLarg' && !filterable,
          },
        )}
      >
        <div className={cn(filterable ? 'visible' : 'invisible')}>
          <Icon name="filter" />
        </div>
        {title}
        <div
          role="columnheader"
          aria-sort={
            type === 'active-asc'
              ? 'ascending'
              : type === 'active-desc'
                ? 'descending'
                : 'none'
          }
          className={cn({
            'invisible text-[#545962] group-hover:visible': type === 'inactive',
          })}
        >
          <Icon
            name={
              sortType === 'ranked'
                ? type === 'active-asc'
                  ? 'arrow-up-wide-narrow'
                  : 'arrow-down-wide-narrow'
                : type === 'active-asc'
                  ? 'arrow-up-z-a'
                  : 'arrow-down-a-z'
            }
          />
        </div>
      </div>
    </div>
  );
}
