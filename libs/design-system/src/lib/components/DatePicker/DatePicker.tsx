import { useState, useEffect, useRef, useMemo, useTransition } from 'react';
import {
  RangePicker,
  PickerLocale,
  createDate,
  formatDate,
} from 'drm-datepickerjs';
import { cn } from '../../../utils';
import { Field, Select } from '@headlessui/react';
import { Icon } from '../Icon';
import { DateInput } from '../DateInput';
import moment from 'moment';

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

interface Props {
  min: string;
  max: string;
}

export function DatePicker({ min, max }: Props) {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState<Date>(createDate()); // create date based on timezone
  const containerRef = useRef<HTMLDivElement>(null);
  const [minDate, setMinDate] = useState(min);
  const [maxDate, setMaxDate] = useState(max);
  const [startDate, setStartDate] = useState<string | Date>();
  const [endDate, setEndDate] = useState<string | Date>();
  const [activeStartInput, setActiveStartInput] = useState(true);
  const [activeEndInput, setActiveEndInput] = useState(false);

  const [startErrors, setStartErrors] = useState<{
    minError: boolean;
    maxError: boolean;
  }>({
    minError: false,
    maxError: false,
  });

  const [endErrors, setEndErrors] = useState<{
    minError: boolean;
    maxError: boolean;
  }>({
    minError: false,
    maxError: false,
  });

  const errorHandler = (e: { minError: boolean; maxError: boolean }) => {
    setStartErrors(e);
  };
  const endErrorHandler = (e: { minError: boolean; maxError: boolean }) => {
    setEndErrors(e);
  };

  const updateStartInput = (e: string | Date) => {
    setStartDate(e);
  };

  const updateEndInput = (e: string | Date) => {
    setEndDate(e);
  };

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

  console.log(endDate);

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  useEffect(() => {
    setMinDate(min);
    setMaxDate(max);
  }, [min, max]);

  const {
    onChangeDate,
    isOpen,
    handleShowNextMonth,
    handleShowPrevMonth,
    setOpen,
    getMode,
    getDate,
    isSelectedDay,
    changeDay,
    getRenderedMonthName,
    getRenderedYear,
    getMonthList,
    changeMonth,
    getYearsList,
    changeYear,
    isLoading,
    goToToday,
    getEndDate,
    getDays,
    getRenderedNextMonthName,
    getRenderedNextDateYear,
    onCellHover,
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
  }, [getDate, isPending, onChangeDate, setOpen]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setEndDate(getEndDate());
    if (getDate()) {
      setActiveEndInput(true);
      setActiveStartInput(false);
    }
    if (getDate() && getEndDate()) {
      setActiveEndInput(false);
      setActiveStartInput(false);
    }
  }, [getEndDate, getDate]);

  const daysList = getDays();
  const daysListNext = getDays('next');

  const handleHoverCell = (date: string) => () => {
    onCellHover(date);
  };

  const RenderTitle = ({ year, month }: { year: number; month: string }) => (
    <div className="flex w-full items-center justify-center gap-2">
      <button>
        <div className="w-20 bg-white rounded-md overflow-hidden border-none">
          <Field>
            <div className="relative flex items-center justify-center rounded-md overflow-hidden w-full">
              <Select
                onChange={(e) => {
                  changeYear(+e.target.value);
                }}
                className={cn(
                  'w-full appearance-none border-none font-vazirmatn',
                  ' data-[focus]:outline-[1.5px] data-[focus]:bg-white outline-brand-600 py-2 rounded-md pr-2 cursor-pointer'
                )}
              >
                {getYearsList(+minDate.slice(0, 4), +maxDate.slice(0, 4)).map(
                  (item) =>
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
                          'shadow-none !cursor-pointer !py-2 pr-7 !hover:bg-brand-600',
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
              <div className="absolute left-2 text-gray-1000">
                <Icon name="chevron-down" size="lg" />
              </div>
            </div>
          </Field>
        </div>
      </button>
      <button>
        <div className="w-full bg-white rounded-md overflow-hidden border-none">
          <Field>
            <div className="relative flex items-center justify-center rounded-md overflow-hidden w-full">
              <Select
                onChange={(e) => {
                  changeMonth(+e.target.value);
                }}
                className={cn(
                  'w-24 appearance-none cursor-pointer border-none font-vazirmatn',
                  ' data-[focus]:outline-[1.5px] data-[focus]:bg-white outline-brand-600 py-2 rounded-md pr-2 cursor-pointer'
                )}
              >
                {getMonthList().map((item) =>
                  month === item.name ? (
                    <option
                      className={cn(
                        'shadow-none cursor-pointer hover:bg-brand-600',
                        item.name === month && 'bg-brand-100'
                      )}
                      value={getRenderedMonthName()}
                      selected
                    >
                      {month}
                    </option>
                  ) : (
                    <option
                      className={cn(
                        'shadow-none cursor-pointer !pr-7 !py-2 !hover:bg-brand-600',
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
              <div className="absolute left-2 text-gray-1000">
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
            <div className="flex gap-2 text-md items-center font-vazirmatn justify-center">
              <div className="flex flex-col gap-1 items-start">
                <span>تاریخ شروع بازه:</span>
                <div
                  onClick={() => {
                    if (!activeStartInput) {
                      setActiveStartInput(true);
                      setActiveEndInput(false);
                    }
                  }}
                >
                  <DateInput
                    active={activeStartInput}
                    onChange={updateStartInput}
                    errors={startErrors}
                    errorHandler={errorHandler}
                    mode="jalali"
                    min={min}
                    max={max}
                    defaultValue={getDate()}
                  />
                </div>
              </div>
              <div className="w-2.5 h-0.5 mt-7 bg-gray-500"></div>
              <div className="gap-1 flex-col flex items-start">
                <span>تاریخ پایان بازه:</span>
                <div
                  onClick={() => {
                    if (!activeEndInput) {
                      setActiveEndInput(true);
                      setActiveStartInput(false);
                    }
                  }}
                >
                  <DateInput
                    active={activeEndInput}
                    onChange={updateEndInput}
                    errors={endErrors}
                    errorHandler={endErrorHandler}
                    mode="jalali"
                    min={min}
                    max={max}
                    defaultValue={getEndDate()}
                  />
                </div>
              </div>
            </div>
            <div
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full cursor-pointer bg-brand-600 absolute -left-2 -top-2 flex items-center justify-center"
            >
              <div className="rounded-full flex items-center bg-white justify-center w-6 h-6">
                <Icon name="x" size="sm" />
              </div>
            </div>
            <div className="flex gap-12">
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
                        <div
                          onClick={() => handleShowPrevMonth()}
                          className="rounded-full bg-white cursor-pointer flex items-center justify-center p-2 border-[1.5px] border-white duration-300 hover:border-brand-600 hover:border-[1.5px]"
                        >
                          <Icon name="arrow-right" size="lg" />
                        </div>
                        <RenderTitle
                          year={getRenderedNextDateYear()}
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

                      <div className="w-full grid grid-cols-7">
                        {daysList.map((day, index) => {
                          return (
                            <div
                              key={index}
                              className="w-full"
                              onMouseEnter={handleHoverCell(day.date)}
                            >
                              {day.state === 'current' && (
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
                                      'w-10 h-10 text-lg hover:border-brand-600 hover:border-2 rounded-full m-0.5',
                                      {
                                        'text-gray-400':
                                          day.state !== 'current',
                                      },
                                      {
                                        'bg-white shadow-xs':
                                          day.state === 'current',
                                      },
                                      {
                                        'bg-brand-600 w-full shadow-sm shadow-brand-600 text-white':
                                          isSelectedDay(day.date) &&
                                          day.state === 'current',
                                      },
                                      {
                                        'bg-brand-600 shadow-sm shadow-brand-600':
                                          isSelectedDay(day.date),
                                      },
                                      {
                                        'bg-brand-600 w-full text-white':
                                          isSelecting() &&
                                          isDateInRange(day.date) &&
                                          isEndDate(day.date) &&
                                          day.state === 'current',
                                      },
                                      {
                                        'rounded-none w-full border-brand-600 border-t border-b':
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
                              )}
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
                              month={getRenderedNextMonthName()}
                            />
                            <div
                              onClick={() => handleShowNextMonth()}
                              className="rounded-full bg-white cursor-pointer flex items-center justify-center p-2 border-[1.5px] border-white duration-300 hover:border-brand-600 hover:border-[1.5px]"
                            >
                              <Icon name="arrow-left" size="lg" />
                            </div>
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

                          <div className="grid grid-cols-7 last:rounded-l-full gap-y-0.5">
                            {daysListNext.map((day, index) => (
                              <div
                                key={index}
                                onMouseEnter={handleHoverCell(day.date)}
                              >
                                {day.state === 'current' && (
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
                                        'w-10 h-10 text-lg hover:border-brand-600 hover:border-2 rounded-full m-0.5',
                                        {
                                          'text-gray-400':
                                            day.state !== 'current',
                                        },
                                        {
                                          'bg-white shadow-xs':
                                            day.state === 'current',
                                        },
                                        {
                                          'bg-brand-600 w-full shadow-sm shadow-brand-600 text-white':
                                            isSelectedDay(day.date) &&
                                            day.state === 'current',
                                        },
                                        {
                                          'bg-brand-600 shadow-sm shadow-brand-600':
                                            isSelectedDay(day.date),
                                        },
                                        {
                                          'bg-brand-600 w-full text-white':
                                            isSelecting() &&
                                            isDateInRange(day.date) &&
                                            isEndDate(day.date) &&
                                            day.state === 'current',
                                        },
                                        {
                                          'rounded-none w-full border-brand-600 border-t border-b':
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
                                )}
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
