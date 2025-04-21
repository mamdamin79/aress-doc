import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { cn } from './../../../utils';

interface Props {
  size: 'small' | 'medium' | 'larg' | 'extraLarg';
  title: string;
  sortType: 'alphabetical' | 'ranked';
  filterable: boolean;
  type: 'inactive' | 'active-desc' | 'active-asc';
  shadow?: boolean;
  clickFilterd: () => void;
  filtered: boolean;
}

export function FundsColumn({
  size,
  title,
  shadow = false,
  sortType,
  filterable,
  type,
  clickFilterd,
  filtered,
}: Props) {
  return (
    <div
      className={cn(
        {
          'w-28': size === 'small',
          'w-36': size === 'medium',
          'w-[200px]': size === 'larg',
          'w-[312px]': size === 'extraLarg',
          'shadow-4xl': shadow && size === 'extraLarg',
          'bg-pink-200': size === 'extraLarg' && filterable,
          'bg-brand-100': size === 'extraLarg' && !filterable,
          'bg-brand-100 hover:bg-brand-200':
            !filterable && size !== 'extraLarg',
          'bg-pink-200 hover:bg-pink-300': filterable && size !== 'extraLarg',
        },
        'text-text-neutral-primary group/first h-full cursor-pointer text-sm font-medium',
      )}
    >
      <div
        className={cn(
          'relative mx-auto px-1.5 flex h-[72px] w-fit items-center justify-center gap-1',
          {
            'group-hover/first:bg-pink-300':
              size === 'extraLarg' && filterable,
            'group-hover/first:bg-brand-300':
              size === 'extraLarg' && !filterable,
          },
        )}
      >
        <div className={cn(filterable ? 'visible' : 'invisible')}>
          <Icon name="filter" />
        </div>
        <span>{title}</span>
        {filtered && (
          <div className="bg-brand-600 absolute -bottom-[7px] h-3 w-16 rounded-md"></div>
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
                  : 'مرتب سازی صعودی'
          }
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (typeof clickFilterd === 'function') {
                clickFilterd();
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
                    : 'arrow-up-wide-narrow'
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
