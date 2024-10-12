import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useTransition,
} from 'react';
import {
  RangePicker,
  PickerLocale,
  createDate,
  formatDate,
} from 'drm-datepickerjs';
import { cn } from '../../../utils';
import { Field, Select } from '@headlessui/react';
import { Icon } from '../Icon';

const locale: PickerLocale = (year) => ({
  months: {
    1: { name: 'فروردین', numberOfDays: 31 },
    2: { name: 'اردیبهشت', numberOfDays: 31 },
    3: { name: 'خرداد', numberOfDays: 31 },
    4: { name: 'تیر', numberOfDays: 31 },
    5: { name: 'مرداد', numberOfDays: 31 },
    6: { name: 'شهریور', numberOfDays: 31 },
    7: { name: 'مهر', numberOfDays: 30 },
    8: { name: 'آبان', numberOfDays: 30 },
    9: { name: 'آذر', numberOfDays: 30 },
    10: { name: 'دی', numberOfDays: 30 },
    11: { name: 'بهمن', numberOfDays: 30 },
    12: { name: 'اسفند', numberOfDays: year % 4 === 3 ? 30 : 29 },
  },
});
const weeksTitle = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

const datepickerHeight = 300;

export function DatePicker() {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState<Date>(createDate()); // create date based on timezone
  const containerRef = useRef<HTMLDivElement>(null);

  const monthWrapperRef = useRef<HTMLDivElement>(null);
  const yearWrapperRef = useRef<HTMLDivElement>(null);
  const selectedMonthRef = useRef<HTMLDivElement>(null);
  const selectedYearRef = useRef<HTMLDivElement>(null);

  function formatter(date: string) {
    const formattedDate = new Intl.DateTimeFormat('FA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      numberingSystem: 'latn',
    })
      .format(createDate(date))
      .split('/');

    const day = formattedDate[2];
    const month = formattedDate[1];
    const year = formattedDate[0];

    return `${year}-${month}-${day}`;
  }

  const {
    onChangeDate,
    isOpen,
    setOpen,
    getMode,
    setMode,
    getDate,
    isSelectedDay,
    changeDay,
    getRenderedMonthName,
    getRenderedYear,
    getMonthList,
    changeMonth,
    getYearsList,
    changeYear,
    getRenderedMonth,
    isLoading,
    goToToday,
    getDays,
    getRenderedNextMonthName,
    getRenderedNextDateYear,
    onCellHover,
    getEndDate,
    isDateInRange,
    isSelecting,
    isEndDate,
  } = useMemo(
    // use memo to insure that only one instance of datePicker exist and don't change on re-rendering
    () =>
      new RangePicker({
        date: formatDate(date), // convert date to iso format YYYY-MM-DD
        locale,
        dayRenderType: 'fill',
        twoSide: true,
        normalized: true,
        dateFormatter: formatter,
      }),
    []
  );

  useEffect(() => {
    // change date listener
    onChangeDate(() => setDate(createDate(getDate())));

    // close date picker on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !isPending
      ) {
        startTransition(() => {
          setOpen(false);
        });
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const daysList = getDays();
  const daysListNext = getDays('next');

  const handleHoverCell = (date: string) => () => {
    onCellHover(date);
  };

  const RenderTitle = ({ year, month }: { year: number; month: string }) => (
    <div className="flex w-full items-center justify-center gap-2">
      <button className="w-1/2">
        <div className="w-full bg-white rounded-md overflow-hidden border-none">
          <Field>
            <div className="relative flex items-center justify-center rounded-md overflow-hidden w-full">
              <Select
                onChange={(e) => {
                  changeMonth(+e.target.value);
                }}
                className={cn(
                  'w-full appearance-none border-none font-vazirmatn',
                  ' data-[focus]:outline-[1.5px] data-[focus]:bg-white outline-brand-600 py-2 rounded-md pr-6 cursor-pointer'
                )}
              >
                {getMonthList().map((item) =>
                  month === item.name ? (
                    <option
                      className={cn(
                        'shadow-none !cursor-pointer hover:bg-brand-600',
                        item.name === month && 'text-brand-600'
                      )}
                      value={getRenderedMonthName()}
                      selected
                    >
                      {month}
                    </option>
                  ) : (
                    <option
                      className={cn(
                        'shadow-none !cursor-pointer !hover:bg-brand-600',
                        item.name === month && 'text-brand-600'
                      )}
                      key={item.name}
                      value={item.monthNumber}
                    >
                      {item.name}
                    </option>
                  )
                )}
              </Select>
              <div className="absolute left-6 text-brand-600">
                <Icon name="chevron-down" size="lg" />
              </div>
            </div>
          </Field>
        </div>
      </button>
      <button className="w-1/2">
        <div className="w-full bg-white rounded-md overflow-hidden border-none">
          <Field>
            <div className="relative flex items-center justify-center rounded-md overflow-hidden w-full">
              <Select
                onChange={(e) => {
                  changeMonth(+e.target.value);
                }}
                className={cn(
                  'w-full appearance-none border-none font-vazirmatn',
                  ' data-[focus]:outline-[1.5px] data-[focus]:bg-white outline-brand-600 py-2 rounded-md pr-6 cursor-pointer'
                )}
              >
                {getYearsList(1385, 1403).map((item) =>
                  year === item ? (
                    <option
                      className={cn(
                        'shadow-none !cursor-pointer hover:bg-brand-600',
                        item === year && 'text-brand-600'
                      )}
                      value={getRenderedYear()}
                      selected
                    >
                      {year}
                    </option>
                  ) : (
                    <option
                      className={cn(
                        'shadow-none !cursor-pointer !hover:bg-brand-600',
                        item === year && 'text-brand-600'
                      )}
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </Select>
              <div className="absolute left-6 text-brand-600">
                <Icon name="chevron-down" size="lg" />
              </div>
            </div>
          </Field>
        </div>
      </button>
    </div>
  );

  return (
    <div style={{ display: 'inline-block', width: 'auto' }}>
      <button onClick={goToToday}>go to today</button>

      <div ref={containerRef} className="bg-gray-100 relative rounded-3xl">
        {isOpen() && !isLoading() && (
          <div
            className="flex flex-col p-6 gap-4"
            style={{
              width: 800,
            }}
          >
            <div
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full cursor-pointer bg-brand-600 absolute -left-2 -top-2 flex items-center justify-center"
            >
              <div className="rounded-full flex items-center bg-white justify-center w-6 h-6">
                <Icon name="x" size="sm" />
              </div>
            </div>
            <div className="flex text-md items-center font-vazirmatn justify-center">
              <div className="flex gap-4 w-1/2 items-center">
                <span>تاریخ شروع بازه:</span>
                <span dir="ltr">{getDate()}</span>
              </div>
              <div className="gap-4 w-1/2 pr-6 flex items-center">
                <span>تاریخ پایان بازه:</span>
                <span>{getEndDate()}</span>
              </div>
            </div>
            <div className="flex gap-12">
              {getMode() === 'month' && (
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row-reverse',
                    }}
                  >
                    <div style={{ flex: 1 }}></div>
                    <div>
                      <RenderTitle
                        year={getRenderedYear()}
                        month={getRenderedMonthName()}
                      />
                    </div>
                  </div>

                  <div style={{ width: '100%', margin: '0 auto' }}>
                    <div
                      ref={monthWrapperRef}
                      style={{ height: datepickerHeight, overflow: 'auto' }}
                    >
                      {getMonthList().map((month) => (
                        <div
                          key={month.name}
                          ref={
                            getRenderedMonth() === month.monthNumber
                              ? selectedMonthRef
                              : undefined
                          }
                          style={{
                            backgroundColor:
                              getRenderedMonth() === month.monthNumber
                                ? '#cacaca'
                                : '#fff',
                            padding: '5px 0',
                          }}
                        >
                          <button
                            style={{
                              width: '100%',
                              padding: 0,
                              margin: 0,
                              backgroundColor: 'transparent',
                              border: 'none',
                            }}
                            onClick={() => changeMonth(month.monthNumber)}
                          >
                            <span>{month.name}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {getMode() === 'year' && (
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row-reverse',
                    }}
                  >
                    <div style={{ flex: 1 }}></div>
                    <div>
                      {/* <RenderTitle
                        year={getRenderedYear()}
                        month={getRenderedMonthName()}
                      /> */}
                    </div>
                    <div style={{ flex: 1 }}>
                      <button onClick={() => setMode('day')}>back</button>
                    </div>
                  </div>

                  <div style={{ width: '100%', margin: '0 auto' }}>
                    <div
                      ref={yearWrapperRef}
                      style={{
                        display: 'flex',
                        height: datepickerHeight,
                        overflow: 'auto',
                        flexWrap: 'wrap',
                      }}
                    >
                      {getYearsList(1385, 1403).map((year) => (
                        <div
                          key={year}
                          ref={
                            getRenderedYear() === year
                              ? selectedYearRef
                              : undefined
                          }
                          className="font-vazirmatn h-fit"
                          style={{
                            backgroundColor:
                              getRenderedYear() === year
                                ? '#cacaca'
                                : '#fafafa',
                            padding: '5px 0px',
                            textAlign: 'center',
                            width: '19%',
                          }}
                        >
                          <button
                            onClick={() => changeYear(year)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color:
                                getRenderedYear() === year
                                  ? 'black'
                                  : '#808080',
                            }}
                          >
                            {year}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {getMode() === 'day' && (
                <>
                  <div className="w-1/2">
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <RenderTitle
                          year={getRenderedNextDateYear()}
                          month={getRenderedNextMonthName()}
                        />
                        <div></div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          padding: '7px 0 5px',
                          flexWrap: 'wrap',
                        }}
                      >
                        {weeksTitle.map((week) => (
                          <div
                            className="font-vazirmatn"
                            key={week}
                            style={{
                              textAlign: 'center',
                              width: `${100 / 7}%`,
                            }}
                          >
                            <span>{week}</span>
                          </div>
                        ))}
                      </div>
                      <div className="w-full bg-gray-200 h-0.5 mb-3"></div>

                      <div className="w-full grid grid-cols-7">
                        {daysList.map((day, index) => {
                          return (
                            <div
                              key={index}
                              className="w-full"
                              onMouseEnter={handleHoverCell(day.date)}
                            >
                              <div
                                className={cn(
                                  isDateInRange(day.date) &&
                                    day.state === 'current'
                                    ? 'px-0'
                                    : 'px-0.5'
                                )}
                              >
                                <button
                                  className={cn(
                                    'w-full text-lg font-vazirmatn rounded-sm m-0.5',
                                    {
                                      'text-gray-400': day.state !== 'current',
                                    },
                                    {
                                      'bg-white shadow-xs':
                                        day.state === 'current',
                                    },
                                    {
                                      'bg-brand-600 shadow-sm shadow-brand-600 rounded-sm w-full text-white':
                                        isSelectedDay(day.date) &&
                                        day.state === 'current',
                                    },
                                    {
                                      'bg-brand-600 shadow-sm shadow-brand-600':
                                        isSelectedDay(day.date),
                                    },
                                    {
                                      'bg-brand-600 w-full rounded-sm text-white':
                                        isSelecting() &&
                                        isDateInRange(day.date) &&
                                        isEndDate(day.date) &&
                                        day.state === 'current',
                                    },
                                    {
                                      'bg-brand-300 rounded-none text-brand-700 w-full':
                                        !isSelectedDay(day.date) &&
                                        isSelecting() &&
                                        isDateInRange(day.date) &&
                                        day.state === 'current',
                                    },
                                    {
                                      'bg-brand-300 rounded-none text-brand-700 w-full':
                                        !isSelectedDay(day.date) &&
                                        !isSelecting() &&
                                        isDateInRange(day.date),
                                    },
                                    {
                                      'bg-brand-100 rounded-none text-brand-600 w-full':
                                        isSelecting() &&
                                        isDateInRange(day.date) &&
                                        day.state !== 'current',
                                    },
                                    {
                                      'bg-brand-100 rounded-none text-brand-600 w-full':
                                        !isSelecting() &&
                                        isDateInRange(day.date) &&
                                        day.state !== 'current',
                                    }
                                  )}
                                  disabled={day.day === 0}
                                  onClick={() => changeDay(day.date, day.state)}
                                >
                                  {day.day}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2">
                    {daysListNext.length > 0 && (
                      <div
                        style={{
                          flex: 1,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div></div>
                            <RenderTitle
                              year={getRenderedYear()}
                              month={getRenderedMonthName()}
                            />
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              padding: '7px 0 5px',
                              flexWrap: 'wrap',
                            }}
                          >
                            {weeksTitle.map((week) => (
                              <div
                                className="font-vazirmatn"
                                key={week}
                                style={{
                                  textAlign: 'center',
                                  width: `${100 / 7}%`,
                                }}
                              >
                                <span>{week}</span>
                              </div>
                            ))}
                          </div>

                          <div className="w-full bg-gray-200 h-0.5 mb-3"></div>

                          <div className="grid grid-cols-7 gap-y-0.5">
                            {daysListNext.map((day, index) => (
                              <div
                                key={index}
                                onMouseEnter={handleHoverCell(day.date)}
                              >
                                <div
                                  className={cn(
                                    isDateInRange(day.date) &&
                                      day.state === 'current'
                                      ? 'px-0'
                                      : 'px-0.5'
                                  )}
                                >
                                  <button
                                    className={cn(
                                      'w-full text-lg font-vazirmatn rounded-sm m-0.5',
                                      {
                                        'text-gray-400':
                                          day.state !== 'current',
                                      },
                                      {
                                        'bg-white shadow-xs':
                                          day.state === 'current',
                                      },
                                      {
                                        'bg-brand-600 rounded-sm w-full shadow-sm shadow-brand-600 text-white':
                                          isSelectedDay(day.date) &&
                                          day.state === 'current',
                                      },
                                      {
                                        'bg-brand-600 shadow-sm shadow-brand-600':
                                          isSelectedDay(day.date),
                                      },
                                      {
                                        'bg-brand-600 w-full rounded-sm text-white':
                                          isSelecting() &&
                                          isDateInRange(day.date) &&
                                          isEndDate(day.date) &&
                                          day.state === 'current',
                                      },
                                      {
                                        'bg-brand-300 rounded-none text-brand-700 w-full':
                                          !isSelectedDay(day.date) &&
                                          isSelecting() &&
                                          isDateInRange(day.date) &&
                                          day.state === 'current',
                                      },
                                      {
                                        'bg-brand-300 rounded-none text-brand-700 w-full':
                                          !isSelectedDay(day.date) &&
                                          !isSelecting() &&
                                          isDateInRange(day.date),
                                      },
                                      {
                                        'bg-brand-100 rounded-none text-brand-600 w-full':
                                          isSelecting() &&
                                          isDateInRange(day.date) &&
                                          day.state !== 'current',
                                      },
                                      {
                                        'bg-brand-100 rounded-none text-brand-600 w-full':
                                          !isSelecting() &&
                                          isDateInRange(day.date) &&
                                          day.state !== 'current',
                                      }
                                    )}
                                    disabled={day.day === 0}
                                    onClick={() =>
                                      changeDay(day.date, day.state)
                                    }
                                  >
                                    {day.day}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
