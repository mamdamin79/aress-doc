/* eslint-disable */
'use client';
import { cn } from '../../../utils/classNames.utils';
import { useCallback, useMemo, useState } from 'react';
import { Icon } from '../Icon';
import { DateInput } from '../DateInput';
import { usePersianCalendar } from '../../../hooks/DayPicker';
import jalaali from 'jalaali-js';
import { DateDifference, updatedCurrentMonthDays } from './DatePicker.utils';
import { Props, ErrorState, DateType } from './DatePicker.types';
import { listMonth, weekdayNames, weeksTitle } from './DatePicker.constansts';
import { Tooltip } from '../Tooltip';
import { YearSelect } from './YearSelect';
import { MonthSelect } from './MonthSelect';

export function DatePicker({ min, max, setDateRange }: Props) {
  const [titleTooltip, setTitleTooltip] = useState('');
  const [dateHover, setDateHover] = useState<DateType | null>();
  const [areInputsEqual, setAreInputsEqual] = useState(false);
  const [focuseEndInput, setFocuseEndInput] = useState(false);
  const [focuseStartInput, setFocuseStartInput] = useState(true);
  const [activeStartInput, setActiveStartInput] = useState(true);
  const [activeEndInput, setActiveEndInput] = useState(false);
  const [errors, setErrors] = useState<{
    start: ErrorState;
    end: ErrorState;
  }>({
    start: { minError: false, maxError: false },
    end: { minError: false, maxError: false },
  });

  const clearStartDate = () => {
    setStartDate('');
    setEndDate('');
    setFocuseEndInput(false);
    setActiveEndInput(false);
  };

  const clearEndDate = () => {
    setEndDate('');
  };

  function getPersianMonthDays(year: number, month: number) {
    const daysInMonth = jalaali.jalaaliMonthLength(year, month);
    const firstDayGregorian = jalaali.toGregorian(year, month, 1);

    const firstDay = new Date(
      firstDayGregorian.gy,
      firstDayGregorian.gm - 1,
      firstDayGregorian.gd,
    );
    const offset = (firstDay.getDay() + 1) % 7; // Align with Persian week (start from Saturday)

    const result = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dayName = weekdayNames[(offset + day - 1) % 7];
      result.push({ day, dayName });
    }

    return result;
  }

  const years = [];
  for (let year: number = +min.slice(0, 4); year <= +max.slice(0, 4); year++) {
    years.push(year);
  }

  const {
    calendars,
    setCurrentDate,
    isDateInRange,
    endDate,
    startDate,
    setStartDate,
    isStartDateEqual,
    isDateBetweenStartAndEnd,
    setEndDate,
    isLastDayOfWeek,
    isDateAfterStartOrEnd,
    isEndDateEqual,
  } = usePersianCalendar(
    { day: 25, month: +min.slice(5, 7), year: +min.slice(0, 4) },
    { day: 25, month: +max.slice(5, 7), year: +max.slice(0, 4) },
  );

  const days = getPersianMonthDays(
    +calendars[0].slice(0, 4),
    +calendars[0].slice(5, 7),
  );
  const nextDays = getPersianMonthDays(
    +calendars[1].slice(0, 4),
    +calendars[1].slice(5, 7),
  );

  const daysFromPrevMonth = (days: { day: number; dayName: string }[]) => {
    return Array.from(
      { length: weekdayNames.indexOf(days[0].dayName) },
      (_, index) => {
        const dayName =
          weekdayNames[
            (weekdayNames.indexOf(days[0].dayName) - (index + 1) + 7) % 7
          ];
        return { day: index + 1, dayName, status: 'prev' };
      },
    );
  };

  const startDays = [
    ...daysFromPrevMonth(days),
    ...updatedCurrentMonthDays(days),
  ];
  const endMonth = [
    ...daysFromPrevMonth(nextDays),
    ...updatedCurrentMonthDays(nextDays),
  ];

  const updateDateInput = (date: string, type: 'start' | 'end') => {
    const dateFormat = date.slice(0, 4) + date.slice(5, 7) + date.slice(8, 10);
    const minDate = min.slice(0, 4) + min.slice(5, 7) + min.slice(8, 10);
    const maxDate = max.slice(0, 4) + max.slice(5, 7) + max.slice(8, 10);

    const newDate = {
      day: +date.slice(8, 10),
      month: +date.slice(5, 7),
      year: +date.slice(0, 4),
    };

    if (
      startDate?.year === endDate?.year &&
      startDate?.month === endDate?.month &&
      startDate &&
      endDate &&
      (startDate.day > endDate.day || startDate.day === endDate.day)
    ) {
      setAreInputsEqual(true);
    } else {
      setAreInputsEqual(false);
    }

    if (
      +date.slice(8, 10) <= 31 &&
      dateFormat >= minDate &&
      dateFormat <= maxDate
    ) {
      if (type === 'start') {
        setStartDate(newDate);
        if (newDate.year && newDate.month && newDate.day) {
          setActiveEndInput(true);
          setFocuseEndInput(true);
          setFocuseStartInput(false);
        }
      } else {
        setEndDate(newDate);
        setErrors({
          start: { minError: false, maxError: false },
          end: { minError: false, maxError: false },
        });
      }
    }

    if (type === 'start') {
      setStartDate(newDate);
    }
  };

  // Render TitleTooltip
  const moseEnterCell = useCallback(
    (date: DateType) => {
      if (isDateInRange(date)) {
        const formatDate = (date: DateType | null) => {
          return `${date?.year}${date?.month && date.month < 10 ? `0${date.month}` : date?.month}${date?.day && date.day < 10 ? `0${date?.day}` : date?.day}`;
        };
        setDateHover(date);
        if (!startDate && focuseStartInput) {
          setTitleTooltip('تاریخ شروع');
        }
        if (focuseStartInput && formatDate(startDate) === formatDate(date)) {
          setTitleTooltip('');
        }

        if (endDate && focuseStartInput) {
          if (formatDate(endDate) === formatDate(date)) {
            setTitleTooltip('');
          } else if (formatDate(startDate) === formatDate(date)) {
            setTitleTooltip('');
          } else setTitleTooltip('تاریخ شروع');
        }

        if (focuseEndInput && startDate) {
          if (formatDate(date) > formatDate(startDate)) {
            setTitleTooltip('تاریخ پایان');
          } else setTitleTooltip('تاریخ شروع');

          if (
            formatDate(date) === formatDate(startDate) ||
            formatDate(date) === formatDate(endDate) ||
            formatDate(date) < min.replace(/-/g, '') ||
            formatDate(date) > max.replace(/-/g, '')
          ) {
            setTitleTooltip('');
          }
        }
      } else setTitleTooltip('');
    },
    [
      isDateInRange,
      startDate,
      focuseStartInput,
      endDate,
      focuseEndInput,
      min,
      max,
    ],
  );

  const errorHandler = ({ minError, maxError }: ErrorState) => {
    setErrors({
      start: { minError, maxError },
      end: { minError, maxError },
    });
  };

  const textErrorHandler = ({
    start,
    end,
  }: {
    start: ErrorState;
    end: ErrorState;
  }): { startInputText: string; endInputText: string } => {
    let startInputText = '';
    let endInputText = '';

    // start validation
    if (start.minError) {
      startInputText = 'تاریخ شروع نمیتواند کمتر از حداقل تاریخ مجاز باشد';
    } else if (start.maxError) {
      startInputText = 'تاریخ شروع نمیتواند بیشتر از حداکثر تاریخ مجاز باشد';
    }

    // end validation
    if (end.minError) {
      endInputText = 'تاریخ پایان نمیتواند کمتر از حداقل تاریخ مجاز باشد';
    } else if (end.maxError) {
      endInputText = 'تاریخ پایان نمیتواند بیشتر از حداکثر تاریخ مجاز باشد';
    } else endInputText = '';

    // start and end validation
    if (
      startDate &&
      endDate &&
      startDate.year === endDate.year &&
      startDate.month === endDate.month
    ) {
      if (startDate.day === endDate.day) {
        const msg = 'تاریخ شروع نمیتواند برابر با تاریخ پایان باشد';
        startInputText = msg;
        endInputText = msg;
      } else if (startDate.day > endDate.day) {
        startInputText = 'تاریخ شروع نمیتواند بیشتر از تاریخ پایان باشد';
        endInputText = 'تاریخ پایان نمیتواند کمتر از تاریخ شروع باشد';
      }
    }

    return { startInputText, endInputText };
  };
  return (
    <div
      className="flex flex-col gap-2 p-6"
      style={{
        width: 704,
      }}
    >
      {/* <div className="flex flex-col gap-1">
        <div className="text-md flex items-center justify-center gap-2">
          <div className="flex flex-col items-start gap-1">
            <span className="select-none text-sm font-medium">
              تاریخ شروع بازه:
            </span>
            <div
              onClick={() => {
                setActiveStartInput(true);
                setFocuseStartInput(true);
                setFocuseEndInput(false);
                if (startDate && !endDate) {
                  setActiveEndInput(false);
                }
              }}
            >
              <DateInput
                equalInput={areInputsEqual}
                errorText={textErrorHandler(errors).startInputText}
                errorHandler={errorHandler}
                placeholder="تاریخ شروع"
                active={activeStartInput}
                onChange={(e) => updateDateInput(e.toString(), 'start')}
                clearDate={clearStartDate}
                errors={errors.start}
                focus={focuseStartInput}
                min={min}
                max={max}
                defaultValue={
                  startDate
                    ? `${startDate?.year}-${String(startDate?.month).padStart(2, '0')}-${String(startDate?.day).padStart(2, '0')}`
                    : ''
                }
              />
            </div>
          </div>
          <div className="h-0.5 w-2.5 bg-gray-500"></div>
          <div className="flex flex-col items-start gap-1">
            <span
              className={cn('invisible select-none text-sm font-medium', {
                visible: startDate,
              })}
            >
              تاریخ پایان بازه:
            </span>
            <div
              onClick={() => {
                if (startDate) {
                  setActiveEndInput(true);
                  setFocuseEndInput(true);
                  setFocuseStartInput(false);
                }
              }}
            >
              <DateInput
                equalInput={areInputsEqual}
                errorText={textErrorHandler(errors).endInputText}
                focus={focuseEndInput}
                errorHandler={errorHandler}
                placeholder="تاریخ پایان"
                active={activeEndInput}
                errors={errors.end}
                onChange={(e) => updateDateInput(e.toString(), 'end')}
                clearDate={clearEndDate}
                min={min}
                max={max}
                defaultValue={
                  endDate
                    ? `${endDate?.year}-${String(endDate?.month).padStart(2, '0')}-${String(endDate?.day).padStart(2, '0')}`
                    : ''
                }
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* select drop down */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <div
            onClick={() => setCurrentDate(-1)}
            className={cn(
              'border-brand-600 mb-1.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-black hover:border-2',
              {
                'cursor-default text-[#B3B6BD] hover:border-none':
                  min.slice(0, 4) === calendars[0].slice(0, 4) &&
                  min.slice(5, 7) >= calendars[0].slice(5, 7),
              },
            )}
          >
            <Icon name="chevron-right" size="lg" />
          </div>
          <div className="relative">
            <div className="absolute -top-6 right-[85px] z-50 items-center gap-1">
              <MonthSelect
                type="start"
                months={listMonth}
                calendar={calendars[0]}
                setCurrentDate={setCurrentDate}
              />
            </div>
            <div className="absolute -top-6 z-50 items-center gap-1">
              <YearSelect
                calendar={calendars[0]}
                years={years}
                setCurrentDate={setCurrentDate}
              />
            </div>
          </div>
        </div>
        <div className="relative flex items-center gap-6">
          <div className="absolute -right-[122px] top-0 z-50 gap-1">
            <MonthSelect
              type="end"
              months={listMonth}
              calendar={calendars[1]}
              setCurrentDate={setCurrentDate}
            />
          </div>
          <div className="absolute left-[168px] top-0 z-50 gap-1">
            <YearSelect
              calendar={calendars[1]}
              years={years}
              setCurrentDate={setCurrentDate}
            />
          </div>
          <div
            onClick={() => setCurrentDate(+1)}
            className={cn(
              'border-brand-600 mb-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-black hover:border-2',
              {
                'cursor-default text-[#B3B6BD] hover:border-none':
                  max.slice(0, 4) === calendars[1].slice(0, 4) &&
                  max.slice(5, 7) <= calendars[0].slice(5, 7),
              },
            )}
          >
            <Icon name="chevron-left" size="lg" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-10">
        <WeekRow />
        <WeekRow />
      </div>
      <div
        onMouseLeave={() => setDateHover(null)}
        className="flex items-center gap-5"
      >
        <div className="grid h-[260px] w-[305px] grid-cols-7">
          {startDays.map((day, index) => {
            return (
              <div
                key={index}
                onMouseEnter={() => {
                  if (day.status === 'current') {
                    moseEnterCell({
                      day: day.day,
                      month: +calendars[0].slice(5, 7),
                      year: +calendars[0].slice(0, 4),
                    });
                  }
                }}
              >
                <Tooltip className="!z-40" title={titleTooltip}>
                  <div key={index}>
                    {day.status === 'current' && (
                      <div
                        onClick={() => {
                          if (
                            isDateInRange({
                              day: day.day,
                              month: +calendars[0].slice(5, 7),
                              year: +calendars[0].slice(0, 4),
                            })
                          ) {
                            if (focuseStartInput) {
                              setFocuseStartInput(false);
                              setFocuseEndInput(true);
                              setActiveEndInput(true);
                              setStartDate({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              });
                            } else if (focuseEndInput) {
                              setEndDate({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              });
                            }
                          }
                        }}
                        className={cn(
                          'hover:border-brand-600 relative z-20 my-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-white bg-white text-lg hover:border-2',
                          day.day === 1 && '!rounded-r-full border-2',
                          isLastDayOfWeek(index).firstDayIndex === index &&
                            '!rounded-r-full border-2 border-l-0',
                          day.day === 31 && '!rounded-l-full',
                          +calendars[0].slice(5, 7) > 6 &&
                            day.day === 30 &&
                            '!rounded-l-full',
                          isLastDayOfWeek(index).lastDayIndex === index &&
                            '!rounded-l-full',
                          (dateHover &&
                            `${dateHover.year}${dateHover.month < 10 ? `0${dateHover.month}` : dateHover.month}${dateHover.day < 10 ? `0${dateHover.day}` : dateHover.day}` >
                              `${calendars[0].slice(0, 4)}${calendars[0].slice(5, 7)}${day.day < 10 ? `0${day.day}` : day.day}` &&
                            isDateAfterStartOrEnd({
                              day: day.day,
                              month: +calendars[0].slice(5, 7),
                              year: +calendars[0].slice(0, 4),
                            }) &&
                            focuseEndInput &&
                            day.day === 31) ||
                            isLastDayOfWeek(index).lastDayIndex === index
                            ? '!rounded-l-full !border-l-2'
                            : (day.day === 1 ||
                                isLastDayOfWeek(index).firstDayIndex ===
                                  index) &&
                                '!border-r-2',

                          {
                            'cursor-default text-gray-400 hover:border-none':
                              !isDateInRange({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              }),
                          },
                          {
                            'bg-brand-200 border-brand-200 text-brand-800 mx-auto w-11 rounded-none pl-[4px] hover:border-none':
                              isDateBetweenStartAndEnd({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              }) &&
                              !isStartDateEqual({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              }) &&
                              !isEndDateEqual({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              }),
                          },
                          {
                            'border-brand-300 w-11 rounded-none border-x-0 border-b-2 border-t-2 pl-[4px]':
                              dateHover &&
                              `${dateHover.year}${dateHover.month < 10 ? `0${dateHover.month}` : dateHover.month}${dateHover.day < 10 ? `0${dateHover.day}` : dateHover.day}` >
                                `${calendars[0].slice(0, 4)}${calendars[0].slice(5, 7)}${day.day < 10 ? `0${day.day}` : day.day}` &&
                              isDateAfterStartOrEnd({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              }) &&
                              focuseEndInput,
                          },
                          {
                            'bg-brand-600 border-brand-600 w-10 text-white':
                              isStartDateEqual({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              }) ||
                              isEndDateEqual({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              }),
                          },
                        )}
                      >
                        <div
                          className={cn({
                            'hover:bg-brand-300 flex h-full w-full items-center justify-center rounded-full text-center hover:rounded-full':
                              isDateBetweenStartAndEnd({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              }) &&
                              !isStartDateEqual({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              }) &&
                              !isEndDateEqual({
                                day: day.day,
                                month: +calendars[0].slice(5, 7),
                                year: +calendars[0].slice(0, 4),
                              }),
                          })}
                        >
                          {day.day}
                        </div>
                      </div>
                    )}
                    {day.status === 'current' &&
                      isStartDateEqual({
                        day: day.day,
                        month: +calendars[0].slice(5, 7),
                        year: +calendars[0].slice(0, 4),
                      }) && (
                        <p className="bg-brand-200 absolute left-0 top-0 h-10 w-6"></p>
                      )}
                    {day.status === 'current' &&
                      isEndDateEqual({
                        day: day.day,
                        month: +calendars[0].slice(5, 7),
                        year: +calendars[0].slice(0, 4),
                      }) && (
                        <p className="bg-brand-200 absolute right-0 top-0 h-10 w-6"></p>
                      )}
                  </div>
                </Tooltip>
              </div>
            );
          })}
        </div>
        <div className="h-[270px] w-[0.5px] bg-[#E1E2E5]"></div>
        <div className="-ml-1 grid h-[260px] w-[305px] grid-cols-7">
          {endMonth.map((day, index) => {
            return (
              <div
                key={index}
                onMouseEnter={() => {
                  if (day.status === 'current') {
                    moseEnterCell({
                      day: day.day,
                      month: +calendars[1].slice(5, 7),
                      year: +calendars[1].slice(0, 4),
                    });
                  }
                }}
              >
                <Tooltip className="!z-40" title={titleTooltip}>
                  <div key={index}>
                    {day.status === 'current' && (
                      <div
                        onClick={() => {
                          if (
                            isDateInRange({
                              day: day.day,
                              month: +calendars[1].slice(5, 7),
                              year: +calendars[1].slice(0, 4),
                            })
                          ) {
                            if (focuseStartInput) {
                              setFocuseStartInput(false);
                              setFocuseEndInput(true);
                              setActiveEndInput(true);
                              setStartDate({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              });
                            } else if (focuseEndInput) {
                              setEndDate({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              });
                            }
                          }
                        }}
                        className={cn(
                          'hover:border-brand-600 relative z-20 my-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-white bg-white text-lg hover:border-2',
                          day.day === 1 && '!rounded-r-full border-2',
                          isLastDayOfWeek(index).firstDayIndex === index &&
                            '!rounded-r-full border-2 border-l-0',
                          day.day === 31 && '!rounded-l-full',
                          +calendars[0].slice(5, 7) > 6 &&
                            day.day === 30 &&
                            '!rounded-l-full',
                          isLastDayOfWeek(index).lastDayIndex === index &&
                            '!rounded-l-full',
                          (dateHover &&
                            `${dateHover.year}${dateHover.month < 10 ? `0${dateHover.month}` : dateHover.month}${dateHover.day < 10 ? `0${dateHover.day}` : dateHover.day}` >
                              `${calendars[0].slice(0, 4)}${calendars[0].slice(5, 7)}${day.day < 10 ? `0${day.day}` : day.day}` &&
                            isDateAfterStartOrEnd({
                              day: day.day,
                              month: +calendars[0].slice(5, 7),
                              year: +calendars[0].slice(0, 4),
                            }) &&
                            focuseEndInput &&
                            day.day === 31) ||
                            isLastDayOfWeek(index).lastDayIndex === index
                            ? '!rounded-l-full !border-l-2'
                            : (day.day === 1 ||
                                isLastDayOfWeek(index).firstDayIndex ===
                                  index) &&
                                '!border-r-2',

                          {
                            'cursor-default text-gray-400 hover:border-none':
                              !isDateInRange({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              }),
                          },
                          {
                            'bg-brand-200 border-brand-200 text-brand-800 mx-auto w-11 rounded-none pl-[4px] hover:border-none':
                              isDateBetweenStartAndEnd({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              }) &&
                              !isStartDateEqual({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              }) &&
                              !isEndDateEqual({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              }),
                          },
                          {
                            'border-brand-300 w-11 rounded-none border-x-0 border-b-2 border-t-2 pl-[4px]':
                              dateHover &&
                              `${dateHover.year}${dateHover.month < 10 ? `0${dateHover.month}` : dateHover.month}${dateHover.day < 10 ? `0${dateHover.day}` : dateHover.day}` >
                                `${calendars[1].slice(0, 4)}${calendars[1].slice(5, 7)}${day.day < 10 ? `0${day.day}` : day.day}` &&
                              isDateAfterStartOrEnd({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              }) &&
                              focuseEndInput,
                          },
                          {
                            'bg-brand-600 border-brand-600 w-10 text-white':
                              isStartDateEqual({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              }) ||
                              isEndDateEqual({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              }),
                          },
                        )}
                      >
                        <div
                          className={cn({
                            'hover:bg-brand-300 flex h-full w-full items-center justify-center rounded-full text-center hover:rounded-full':
                              isDateBetweenStartAndEnd({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              }) &&
                              !isStartDateEqual({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              }) &&
                              !isEndDateEqual({
                                day: day.day,
                                month: +calendars[1].slice(5, 7),
                                year: +calendars[1].slice(0, 4),
                              }),
                          })}
                        >
                          {day.day}
                        </div>
                      </div>
                    )}
                    {day.status === 'current' &&
                      isStartDateEqual({
                        day: day.day,
                        month: +calendars[1].slice(5, 7),
                        year: +calendars[1].slice(0, 4),
                      }) && (
                        <p className="bg-brand-200 absolute left-0 top-0 h-10 w-6"></p>
                      )}
                    {day.status === 'current' &&
                      isEndDateEqual({
                        day: day.day,
                        month: +calendars[1].slice(5, 7),
                        year: +calendars[1].slice(0, 4),
                      }) && (
                        <p className="bg-brand-200 absolute right-0 top-0 h-10 w-6"></p>
                      )}
                  </div>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex flex-row-reverse items-center justify-between">
        <button
          onClick={() => {
            if (
              startDate &&
              endDate &&
              !errors.end.minError &&
              !errors.end.maxError &&
              !errors.start.maxError &&
              !errors.start.minError &&
              !areInputsEqual
            ) {
              setDateRange(startDate, endDate);
            }
          }}
          className={cn(
            'bg-brand-300 text-md cursor-default select-none rounded-md px-2 py-1 font-medium text-white',
            {
              'bg-brand-500 cursor-pointer':
                startDate &&
                endDate &&
                !errors.end.maxError &&
                !errors.end.minError &&
                !errors.start.maxError &&
                !errors.start.minError &&
                !areInputsEqual,
            },
          )}
        >
          اعمال بازه
        </button>

        <div
          className={cn(
            'invisible flex w-fit select-none items-center justify-start gap-2 rounded-sm bg-white px-2 py-1.5',
            {
              visible:
                startDate &&
                endDate &&
                !errors.end.maxError &&
                !errors.end.minError &&
                !errors.start.maxError &&
                !errors.start.minError &&
                !areInputsEqual,
            },
          )}
        >
          <span className="text-sm">بازه دلخواه:</span>
          <span className="font-medium">
            {DateDifference(
              `${startDate?.year}-${startDate?.month}-${startDate?.day}`,
              `${endDate?.year}-${endDate?.month}-${endDate?.day}`,
            )}
          </span>
          <span className="text-text-neutral-primary -mr-1.5 mb-1 font-medium">
            روز
          </span>
        </div>
      </div>
    </div>
  );
}

const WeekRow = () => {
  return (
    <div className="ol-span-7 row-start-1 flex w-1/2 items-start justify-between border-b border-[#E1E2E5] px-3 pb-1.5">
      {weeksTitle.map((item, index) => (
        <div key={index} className="text-center">
          {item}
        </div>
      ))}
    </div>
  );
};
