import { OptionsDropdown } from '../OptionsDropdown';
import { cn } from '../../../utils/classNames.utils';
import { Icon } from '../Icon';

interface Props {
  months: { text: string; disabled: boolean; index: number }[];
  calendar: string;
  setCurrentDate: (date: string) => void;
  type: 'start' | 'end';
}

export function MonthSelect({ months, calendar, type, setCurrentDate }: Props) {
  return (
    <OptionsDropdown
      initialSelectedIndex={+calendar.slice(5, 7) - 1}
      customOptionRender={({ isActive, text }) => (
        <div
          className={cn(
            'hover:bg-surface-brand-50 flex cursor-pointer items-center px-1 py-2 font-normal',
            {
              'bg-surface-brand-100': isActive,
            },
          )}
        >
          <div className="text-brand-700 w-6">
            {isActive && <Icon name="check" size="md" />}
          </div>
          {text}
        </div>
      )}
      customTriggerRender={({ isActive }) => (
        <div
          className={cn(
            'flex h-10 w-[100px] items-center justify-between rounded-md border-2 border-transparent bg-surface-neutral-primary px-2 text-sm font-semibold',
            {
              'border-border-brand-primary-600': isActive,
            },
          )}
        >
          {months[parseInt(calendar.slice(5, 7), 10) - 1].text}
          <div
            className={cn('transition-transform duration-300', {
              'rotate-180 text-icon-brand-primary-600': isActive,
            })}
          >
            <Icon name="chevron-down" size="md" />
          </div>
        </div>
      )}
      onChange={(_, id) => {
        setCurrentDate(
          `${calendar.slice(0, 4)}/${
            id && id < 10 ? `0${id}` : id
          }/${+calendar.slice(8, 9) < 10 ? `0${calendar.slice(8, 9)}` : calendar.slice(8, 9)}`,
        );
      }}
      dropDownStyles={{
        checkSelected: true,
        size: 'lg',
        scrollable: true,
      }}
      dropDownList={months.map((month, index) => ({
        text: month.text,
        id: index + (type === 'start' ? 1 : 0),
      }))}
    />
  );
}
