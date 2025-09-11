import { cn } from '../../../utils/classNames.utils';
import { Icon } from '../Icon';
import { OptionsDropdown } from '../OptionsDropdown';

interface Props {
  years: number[];
  calendar: string;
  setCurrentDate: (date: string) => void;
  value: number;
}

export function YearSelect({ years, calendar, setCurrentDate, value }: Props) {  
  return (
    <OptionsDropdown
      className='overflow-y-hidden'
      customTriggerRender={({ isActive }) => (
        <div
          className={cn(
            'hover:bg-brand-50 flex h-10 w-[72px] cursor-pointer items-center justify-center gap-0.5 rounded-md border-2 border-transparent bg-surface-neutral-primary text-center text-sm font-semibold',
            {
              'border-border-brand-primary-600': isActive,
            },
          )}
        >
          {value}
          <div
            className={cn('transition-transform duration-300', {
              'rotate-180 text-icon-brand-primary-600': isActive,
            })}
          >
            <Icon name="chevron-down" size="md" />
          </div>{' '}
        </div>
      )}
      customOptionRender={(item) => (
        <div
          className={cn(
            'hover:bg-surface-brand-50 flex w-20 cursor-pointer justify-center gap-0.5 bg-surface-neutral-primary overflow-y-hidden py-2 text-center text-sm font-normal',
            {
              'bg-surface-brand-100': +item.text === value,
            },
          )}
        >
          <div className="text-brand-700">
            {+item.text === value && <Icon name="check" />}
          </div>
          {item.text}
        </div>
      )}
      onChange={(selectedItem) => {
        setCurrentDate(
          `${selectedItem}/${calendar.slice(5, 7)}/${+calendar.slice(8, 9) < 10 ? `0${calendar.slice(8, 9)}` : calendar.slice(8, 9)}`,
        );
      }}
      dropDownStyles={{
        checkSelected: true,
        anchor: 'bottom start',
        size: 'lg',
        scrollable: true,
      }}
      dropDownList={years.map((year) => ({ text: String(year) }))}
    />
  );
}
