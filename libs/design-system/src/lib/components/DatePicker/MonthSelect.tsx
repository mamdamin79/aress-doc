import { OptionsDropdown } from '../OptionsDropdown';
import { cn } from '../../../utils/classNames.utils';
import { Icon } from '../Icon';

interface Props {
  months: string[];
  calendar: string;
  setCurrentDate: (date: string) => void;
}

export function MonthSelect({
  months,
  calendar,
  setCurrentDate,
}: Props) {
  return (
    <OptionsDropdown
      initialSelectedIndex={+calendar.slice(5, 7) - 1}
      customOptionRender={({ isActive, text }) => (
        <div
          className={cn(
            'hover:bg-brand-50 flex cursor-pointer items-center px-1 py-1 font-normal',
            {
              'bg-brand-100': isActive,
            },
          )}
        >
          <div className="text-brand-700 w-6">
            {isActive && <Icon name="check" size="md" />}
          </div>
          {text}
        </div>
      )}
      customTriggerRender={(_) => (
        <div className="flex h-10 w-[92px] items-center justify-between rounded-md bg-white px-2 text-sm font-semibold">
          {months[parseInt(calendar.slice(5, 7), 10) - 1]}
          <Icon name="chevron-down" size="md" />
        </div>
      )}
      onChange={(_, id) => {
        setCurrentDate(
          `${calendar.slice(0, 4)}-${
            id && id < 10 ? `0${id}` : id
          }-${calendar.slice(8, 9)}`,
        );
      }}
      dropDownStyles={{
        checkSelected: true,
        size: 'lg',
        scrollable: true,
      }}
      dropDownList={months.map((month, index) => ({
        text: month,
        id: index + 1,
      }))}
    />
  );
}
