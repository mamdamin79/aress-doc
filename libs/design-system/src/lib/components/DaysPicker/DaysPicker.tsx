import jalaali from 'jalaali-js';
import { cn } from 'libs/design-system/src/utils';
import { usePersianCalendar } from './../../../hooks/DayPicker/DayPicker';
interface Props {
  date: string;
}

const weekdayNames = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

function getPersianMonthDays(year: number, month: number) {
  const daysInMonth = jalaali.jalaaliMonthLength(year, month);
  const firstDayGregorian = jalaali.toGregorian(year, month, 1);

  const firstDay = new Date(
    firstDayGregorian.gy,
    firstDayGregorian.gm - 1,
    firstDayGregorian.gd
  );
  const offset = (firstDay.getDay() + 1) % 7; // Align with Persian week (start from Saturday)

  const result = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const dayName = weekdayNames[(offset + day - 1) % 7];
    result.push({ day, dayName });
  }

  return result;
}

export function DaysPicker({ date }: Props) {
  const {
    calendars,
    endDate,
    startDate,
    setCurrentDate,
    setEndDate,
    setStartDate,
  } = usePersianCalendar(
    { day: 15, month: 4, year: +date.slice(0, 4) },
    { day: 15, month: 12, year: 1404 }
  );

  const days = getPersianMonthDays(
    +calendars[0].slice(0, 4),
    +calendars[0].slice(5, 7)
  );
  const nextDays = getPersianMonthDays(
    +calendars[1].slice(0, 4),
    +calendars[1].slice(5, 7)
  );

  const daysFromPrevMonth = (days: any) => {
    return Array.from(
      { length: weekdayNames.indexOf(days[0].dayName) },
      (_, index) => {
        const dayName =
          weekdayNames[
            (weekdayNames.indexOf(days[0].dayName) - (index + 1) + 7) % 7
          ];
        return { day: index + 1, dayName, status: 'prev' };
      }
    );
  };

  const updatedCurrentMonthDays = (days: any) => {
    return days.map((day: any) => ({
      ...day,
      status: 'current',
    }));
  };

  const startDays = [
    ...daysFromPrevMonth(days),
    ...updatedCurrentMonthDays(days),
  ];
  const endMonth = [
    ...daysFromPrevMonth(nextDays),
    ...updatedCurrentMonthDays(nextDays),
  ];

  const listMonth = [
    { id: 1, name: 'فروردین' },
    { id: 2, name: 'اردیبهشت' },
    { id: 3, name: 'خرداد' },
    { id: 4, name: 'تیر' },
    { id: 5, name: 'مرداد' },
    { id: 6, name: 'شهریور' },
    { id: 7, name: 'مهر' },
    { id: 8, name: 'آبان' },
    { id: 9, name: 'آذر' },
    { id: 10, name: 'دی' },
    { id: 11, name: 'بهمن' },
    { id: 12, name: 'اسفند' },
  ];

  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="w-[300px] grid grid-cols-7">
          {startDays.map((day, index) => {
            return (
              <div key={index} className={cn('w-full')}>
                {day.status === 'current' && (
                  <div className={cn('z-20 relative')}>
                    <button
                      onClick={() =>
                        setStartDate({
                          day: day.day,
                          month: +calendars[0].slice(5, 7),
                          year: +calendars[0].slice(0, 4),
                        })
                      }
                      className={cn(
                        'w-10 h-10 my-1 bg-white shadow-brand-600 shadow-xs text-lg hover:border-brand-600 hover:border-2 rounded-full'
                      )}
                    >
                      {day.day}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="w-[300px] grid grid-cols-7">
          {endMonth.map((day, index) => {
            return (
              <div key={index} className={cn('w-full')}>
                {day.status === 'current' && (
                  <div className={cn('z-20 relative')}>
                    <button
                      onClick={() =>
                        setEndDate({
                          day: day.day,
                          month: +calendars[1].slice(5, 7),
                          year: +calendars[1].slice(0, 4),
                        })
                      }
                      className={cn(
                        'w-10 h-10 my-1 bg-white shadow-brand-600 shadow-xs text-lg hover:border-brand-600 hover:border-2 rounded-full'
                      )}
                    >
                      {day.day}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <select onChange={(e) => {
         setCurrentDate(`${calendars[0].slice(0, 4)}-${e.target.value}-12`)
         
      }} name="" id="">
        {listMonth.map((item) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>

      <div className="flex flex-col gap-5">
        <div className="mt-10 w-max">{calendars[0]}</div>
        <div className="mt-10 w-max">{calendars[1]}</div>

        <div className="flex justify-between items-center w-full">
          <button
            className="rounded-full bg-brand-600 text-white w-10 cursor-pointer"
            onClick={() => setCurrentDate(-1)}
          >
            {'<'}
          </button>
          <button
            className="rounded-full bg-brand-600 text-white w-10 cursor-pointer"
            onClick={() => setCurrentDate(+1)}
          >
            {'>'}
          </button>
        </div>

        <div className="mt-10">StartDate :{JSON.stringify(startDate)}</div>
        <div className="mt-10">EndtDate :{JSON.stringify(endDate)}</div>
      </div>
    </div>
  );
}
