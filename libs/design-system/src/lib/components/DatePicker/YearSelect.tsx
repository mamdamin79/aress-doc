import { cn } from '../../../utils/classNames.utils';
import { Icon } from '../Icon';
import { OptionsDropdown } from '../OptionsDropdown';

interface Props {
  years: number[];
  calendar: string;
  setCurrentDate: (date: string) => void;
}

export function YearSelect({ years, calendar, setCurrentDate }: Props) {
  return (
    <OptionsDropdown
      customTriggerRender={({ isActive }) => (
        <div
          className={cn(
            'hover:bg-brand-50 flex h-10 w-[72px] cursor-pointer items-center justify-center gap-0.5 rounded-md border-2 border-transparent bg-surface-neutral-primary text-center text-sm font-semibold',
            {
              'border-border-brand-primary-600': isActive,
            },
          )}
        >
          {calendar.slice(0, 4)}
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
            'hover:bg-brand-50 flex w-20 cursor-pointer justify-center gap-0.5 bg-white py-2 text-center text-sm font-normal',
            {
              'bg-brand-100': item.text.includes(calendar.slice(0, 4)),
            },
          )}
        >
          <div className="text-brand-700">
            {+item.text === +calendar.slice(0, 4) && <Icon name="check" />}
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
        size: 'lg',
        scrollable: true,
        maxHeight: 248,
      }}
      dropDownList={years.map((year) => ({ text: String(year) }))}
    />
  );
}
