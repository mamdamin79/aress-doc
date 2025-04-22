import { cn } from '../../../utils/classNames.utils';
import { memo, useCallback, useMemo, useState } from 'react';
import { Icon } from '../Icon';
import { DateInput } from '../DateInput';
import { usePersianCalendar } from 'libs/design-system/src/hooks/DayPicker';
import jalaali from 'jalaali-js';
import { DateDifference, updatedCurrentMonthDays } from './DatePicker.utils';
import { Props, ErrorState, DateType } from './DatePicker.types';
import { listMonth, weekdayNames, weeksTitle } from './DatePicker.constansts';
import { Tooltip } from '../Tooltip';
import { OptionsDropdown } from '../OptionsDropdown';

export function DatePicker({ min, max, isOpen, onClose, setDateRange }: Props) {
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
    { day: 25, month: +max.slice(5, 7), year: +max.slice(0, 4) }
  );

  const days = getPersianMonthDays(
    +calendars[0].slice(0, 4),
    +calendars[0].slice(5, 7)
  );
  const nextDays = getPersianMonthDays(
    +calendars[1].slice(0, 4),
    +calendars[1].slice(5, 7)
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
      }
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

  const updateStartInput = (date: string) => {
    if (
      (startDate?.year === endDate?.year && startDate?.month === endDate?.month && startDate && endDate && startDate?.day > endDate?.day)
      || (startDate?.year === endDate?.year && startDate?.month === endDate?.month && endDate && startDate && (startDate?.day > endDate?.day || startDate?.day === endDate.day))) {
      setAreInputsEqual(true);
    } else setAreInputsEqual(false);
    if (+date.slice(8, 10) <= 31) {
      setStartDate({ day: +date.slice(8, 10), month: +date.slice(5, 7), year: +date.slice(0, 4) });
    }
  };
  const updateEndInput = (date: string) => {
    if ((startDate?.year === endDate?.year && startDate?.month === endDate?.month && startDate && endDate && startDate?.day > endDate?.day)
      || (startDate?.year === endDate?.year && startDate?.month === endDate?.month && endDate && startDate && (startDate?.day > endDate?.day || startDate?.day === endDate.day))) {
      setAreInputsEqual(true);
    } else setAreInputsEqual(false);
    if (+date.slice(8, 10) <= 31) {
      setEndDate({ day: +date.slice(8, 10), month: +date.slice(5, 7), year: +date.slice(0, 4)});
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
    ]
  );
  

  const errorHandler = ({ minError, maxError }: ErrorState) => {
    setErrors({
      start: { minError, maxError },
      end: { minError, maxError },
    });
  }

  const textErrorHandler = ({ start, end }: { start: ErrorState, end: ErrorState }): { startInputText: string, endInputText: string } => {
    let startInputText = '';
    let endInputText = '';
    if (start.minError) {
      startInputText = 'تاریخ شروع نمیتواند کمتر از حداقل تاریخ مجاز باشد';
    } else startInputText = '';
    if (start.maxError) {
      startInputText = 'تاریخ شروع نمیتواند بیشتر از حداکثر تاریخ مجاز باشد';
    } else startInputText = '';
    if (end.minError) {
      endInputText = 'تاریخ پایان نمیتواند کمتر از حداقل تاریخ مجاز باشد';
    } else endInputText = '';
    if (end.maxError) {
      endInputText = 'تاریخ پایان نمیتواند بیشتر از حداکثر تاریخ مجاز باشد';
    } else endInputText = '';
    if (startDate?.year === endDate?.year && startDate?.month === endDate?.month && startDate?.day === endDate?.day) {
      endInputText = 'تاریخ شروع نمیتواند برابر با تاریخ پایان باشد';
      startInputText = 'تاریخ شروع نمیتواند برابر با تاریخ پایان باشد';
    } else {
      startInputText = '',
      endInputText = '';
    }

    if (startDate?.year === endDate?.year && startDate?.month === endDate?.month && startDate && endDate && startDate?.day > endDate?.day) {
      startInputText = 'تاریخ شروع نمیتواند بیشتر از تاریخ پایان باشد';
    } else startInputText = '';
    if (startDate?.year === endDate?.year && startDate?.month === endDate?.month && endDate && startDate && startDate?.day > endDate?.day) {
      endInputText = 'تاریخ پایان نمیتواند کمتر از تاریخ شروع باشد';
    }else endInputText = '';
    return { startInputText, endInputText };
  }



  const close = useMemo(
    () => (
      <div
        onClick={() => onClose()}
        className="w-8 h-8 rounded-full cursor-pointer bg-brand-600 absolute -left-2 -top-2 flex items-center justify-center"
      >
        <div className="rounded-full flex items-center bg-white justify-center w-6 h-6">
          <Icon name="x" size="sm" />
        </div>
      </div>
    ),
    [onClose]
  );
  return (
    <div style={{ display: 'inline-block', width: 'auto' }}>
      <div className="bg-gray-100 relative rounded-3xl">
        {isOpen && (
          <div
            className="flex flex-col p-6 gap-4"
            style={{
              width: 704,
            }}
          >
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 text-md items-center font-vazirmatn justify-center">
                <div className="flex flex-col gap-1 items-start">
                  <span className='select-none font-medium text-sm'>تاریخ شروع بازه:</span>
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
                      onChange={(e) => updateStartInput(e.toString())}
                      clearDate={clearStartDate}
                      errors={errors.start}
                      focus={focuseStartInput}
                      min={min}
                      max={max}
                      defaultValue={`${startDate?.year}-${startDate?.month}-${startDate?.day}`}
                    />
                  </div>
                </div>
                <div className="w-2.5 h-0.5 bg-gray-500"></div>
                <div className="gap-1 flex-col flex items-start">
                  <span className='select-none text-sm font-medium'>تاریخ پایان بازه:</span>
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
                      onChange={(e) => updateEndInput(e.toString())}
                      clearDate={clearEndDate}
                      min={min}
                      max={max}
                      defaultValue={endDate ? `${endDate?.year}-${endDate?.month}-${endDate?.day}` : ''}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* select drop down */}
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <ChevronButton min={min} calendars={calendars} setCurrentDate={setCurrentDate} />
                {close}
                <div className="relative">
                  <div className="absolute -top-6 items-center right-[85px] gap-1 z-50">
                    <OptionsDropdown
                    initialSelectedIndex={+calendars[0].slice(5, 7) - 1}
                    customOptionRender={({isActive, text}) => (
                      <div className={cn('flex cursor-pointer px-1 py-1 hover:bg-brand-50 font-normal items-center', {
                        'bg-brand-100': isActive
                      })}>
                        <div className='text-brand-700 w-6'>
                        {isActive && (
                            <Icon name='check' size='md' />
                          )}
                          </div>
                        {text}
                      </div>
                    )}
                    customTriggerRender={(_) => (
                      <div className='bg-white py-2.5 flex font-semibold items-center justify-between px-2 rounded-md w-[92px]'>
                        {listMonth[parseInt(calendars[0].slice(5, 7), 10) - 1]}
                        <Icon name='chevron-down' size='md' />
                      </div>
                        )}
                      onChange={(_, id) => {
                      setCurrentDate(
                        `${calendars[0].slice(0, 4)}-${id && id < 10
                          ? `0${id}`
                          : id
                        }-${calendars[0].slice(8, 9)}`)
                    }} 
                    dropDownStyles={{checkSelected: true,size: 'lg' }} 
                    dropDownList={listMonth.map((month, index) => ({text: month, id: index + 1}))} />
                  </div>
                  <div className="absolute -top-6 items-center gap-1  z-50">
                  <OptionsDropdown
                    customTriggerRender={() =>
                      <div className={cn('text-sm bg-white font-semibold items-center cursor-pointer w-20 py-2.5 flex rounded-md justify-center gap-0.5 text-center hover:bg-brand-50', {
                      })}>
                        {calendars[0].slice(0, 4)}
                        <Icon name="chevron-down" size='md' />
                      </div>
                    }
                    customOptionRender={(item) => 
                      <div className={cn('text-sm bg-white cursor-pointer w-20 py-2 flex justify-center font-normal gap-0.5 text-center hover:bg-brand-50', {
                        'bg-brand-100': item.text.includes(calendars[0].slice(0, 4)),
                      })}>
                      <div className='text-brand-700'>
                        {+item.text === +calendars[0].slice(0, 4) && <Icon name="check"/>}
                      </div>
                        {item.text}
                      </div>} 
                    onChange={(selectedItem) => {                      
                      setCurrentDate(
                        `${selectedItem}-${calendars[0].slice(
                          5,
                          7
                        )}-${calendars[0].slice(8, 9)}`
                      )
                    }
                    } 
                      dropDownStyles={{checkSelected: true, size: 'lg' }} 
                      dropDownList={years.map((year) => ({text: String(year)}))} />
                </div>
                </div>

              </div>










              <div className="flex items-center relative gap-6">
                <div className="absolute top-0 gap-1 -right-[100px] z-50">
                <OptionsDropdown
                    customTriggerRender={() =>
                      <div className={cn('text-sm font-semibold bg-white items-center cursor-pointer w-20 py-2.5 flex rounded-md justify-center gap-0.5 text-center hover:bg-brand-50', {
                      })}>
                        {calendars[1].slice(0, 4)}
                        <Icon name="chevron-down" size='md' />
                      </div>
                    }
                    customOptionRender={(item) => 
                      <div className={cn('text-sm bg-white cursor-pointer font-normal w-20 py-2 flex justify-center gap-0.5 text-center hover:bg-brand-50', {
                        'bg-brand-100': item.text.includes(calendars[1].slice(0, 4)),
                      })}>
                      <div className='text-brand-700'>
                        {+item.text === +calendars[1].slice(0, 4) && <Icon name="check"/>}
                      </div>
                        {item.text}
                      </div>} 
                    onChange={(selectedItem) => {                      
                      setCurrentDate(
                        `${selectedItem}-${calendars[1].slice(
                          5,
                          7
                        )}-${calendars[0].slice(8, 9)}`
                      )
                    }
                    } 
                      dropDownStyles={{checkSelected: true, size: 'lg' }} 
                      dropDownList={years.map((year) => ({text: String(year)}))} />
                </div>
                <div className="absolute top-0 gap-1 left-[150px] z-50">
                <OptionsDropdown
                    initialSelectedIndex={+calendars[1].slice(5, 7) - 1}
                    customOptionRender={({isActive, text}) => (
                      <div className={cn('flex cursor-pointer px-1 py-1 hover:bg-brand-50 font-normal items-center', {
                        'bg-brand-100': isActive
                      })}>
                        <div className='text-brand-700 w-6'>
                        {isActive && (
                            <Icon name='check' size='md' />
                          )}
                          </div>
                        {text}
                      </div>
                    )}
                    customTriggerRender={(_) => (
                      <div className='bg-white py-2.5 flex font-semibold items-center justify-between px-2 rounded-md w-[92px]'>
                        {listMonth[parseInt(calendars[1].slice(5, 7), 10) - 1]}
                        <Icon name='chevron-down' size='md' />
                      </div>
                        )}
                      onChange={(_, id) => {
                      setCurrentDate(
                        `${calendars[1].slice(0, 4)}-${id && id < 10
                          ? `0${id}`
                          : id
                        }-${calendars[1].slice(8, 9)}`)
                    }} 
                    dropDownStyles={{checkSelected: true,size: 'lg' }} 
                    dropDownList={listMonth.map((month, index) => ({text: month, id: index}))} />
              </div>









              
                <div
                  onClick={() => setCurrentDate(+1)}
                  className={cn(
                    'bg-white hover:border-2 border-brand-600 flex items-center justify-center w-10 h-10 cursor-pointer rounded-full text-black',
                    {
                      'bg-gray-200 hover:border-none cursor-default':
                        max.slice(0, 4) === calendars[1].slice(0, 4) &&
                        max.slice(5, 7) <= calendars[0].slice(5, 7),
                    }
                  )}
                >
                  <Icon name="chevron-left" size="lg" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-10">
              <div className="col-span-7 w-1/2 items-start row-start-1 flex mb-3 justify-between px-5">
                {weeksTitle.map((item, index) => (
                  <div key={index} className="text-center">
                    {item}
                  </div>
                ))}
              </div>
              <div className="col-span-7 w-1/2 flex items-center justify-between px-5">
                {weeksTitle.map((item, index) => (
                  <div key={index} className="text-center">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div onMouseLeave={() => setDateHover(null)} className="flex items-center gap-10">
              <div className="w-[310px] h-[260px] grid grid-cols-7">
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
                      }}>

                      <Tooltip className="!z-40" title={titleTooltip}>
                        <div
                          key={index}
                        >
                          {day.status === 'current' && (
                            <div
                              onClick={() => {
                                if (isDateInRange({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) })) {
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
                                'z-20 relative cursor-pointer w-10 h-10 my-1 bg-white flex items-center justify-center text-lg hover:border-brand-600 hover:border-2 rounded-full',
                                day.day === 1 && '!rounded-r-full',
                                isLastDayOfWeek(index).firstDayIndex === index && '!rounded-r-full',
                                day.day === 31 && '!rounded-l-full',
                                +calendars[0].slice(5, 7) > 6 && day.day === 30 && '!rounded-l-full',
                                isLastDayOfWeek(index).lastDayIndex === index && '!rounded-l-full',
                                dateHover && `${dateHover.year}${dateHover.month < 10 ? `0${dateHover.month}` : dateHover.month}${dateHover.day < 10 ? `0${dateHover.day}` : dateHover.day}` > `${calendars[0].slice(0, 4)}${calendars[0].slice(5, 7)}${day.day < 10 ? `0${day.day}` : day.day}` && isDateAfterStartOrEnd({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) && focuseEndInput && day.day === 31 || isLastDayOfWeek(index).lastDayIndex === index ? '!border-l-2 !rounded-l-full' : (day.day === 1 || isLastDayOfWeek(index).firstDayIndex === index) && '!border-r-2',


                                {
                                  'hover:border-none text-gray-400 cursor-default':
                                    !isDateInRange({
                                      day: day.day,
                                      month: +calendars[0].slice(5, 7),
                                      year: +calendars[0].slice(0, 4),
                                    }),
                                },
                                {
                                  'bg-brand-200 pl-[4px] w-11 rounded-none text-brand-800 hover:border-none mx-auto': isDateBetweenStartAndEnd({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) && !isStartDateEqual({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) && !isEndDateEqual({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) })
                                },
                                {
                                  'border-t-2 border-b-2 pl-[4px] border-brand-300 w-11 rounded-none': dateHover && `${dateHover.year}${dateHover.month < 10 ? `0${dateHover.month}` : dateHover.month}${dateHover.day < 10 ? `0${dateHover.day}` : dateHover.day}` > `${calendars[0].slice(0, 4)}${calendars[0].slice(5, 7)}${day.day < 10 ? `0${day.day}` : day.day}` && isDateAfterStartOrEnd({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) && focuseEndInput,
                                },
                                {
                                  'text-white bg-brand-600 w-10': isStartDateEqual({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) || isEndDateEqual({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) })
                                }
                              )}
                            >
                              <div className={cn(
                                { 'hover:bg-brand-300 rounded-full text-center w-full h-full flex items-center justify-center hover:rounded-full': isDateBetweenStartAndEnd({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) && !isStartDateEqual({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) && !isEndDateEqual({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) },
                              )}>
                                {day.day}
                              </div>
                            </div>
                          )}
                          {
                            day.status === 'current' && isStartDateEqual({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) &&
                            <p className='w-6 h-10 bg-brand-200 absolute top-0 left-0'></p>
                          }
                          {
                            day.status === 'current' && isEndDateEqual({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) &&
                            <p className='w-6 h-10 bg-brand-200 absolute top-0 right-0'></p>
                          }
                        </div>
                      </Tooltip>
                    </div>

                  );
                })}
              </div>
              <div className="w-[310px] h-[260px] grid grid-cols-7">
                {endMonth.map((day, index) => {
                  return (
                    <div
                      onMouseEnter={() => {
                        if (day.status === 'current') {
                          moseEnterCell({
                            day: +day.day < 10 ? +`0${day.day}` : day.day,
                            month: +calendars[1].slice(5, 7),
                            year: +calendars[1].slice(0, 4),
                          });
                        }
                      }}
                      className="mx-auto"
                      key={index}
                    >
                      {day.status === 'current' && (
                        <Tooltip className='!z-40' title={titleTooltip}>
                          <div className='w-11'>
                            <div
                              onClick={() => {
                                if (isDateInRange({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) })) {

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
                                'z-20 relative cursor-pointer w-10 h-10 my-1 bg-white flex items-center justify-center text-lg hover:border-brand-600 hover:border-2 rounded-full',
                                day.day === 1 && '!rounded-r-full',
                                isLastDayOfWeek(index).firstDayIndex === index && '!rounded-r-full',
                                day.day === 31 && '!rounded-l-full',
                                +calendars[1].slice(5, 7) > 6 && day.day === 30 && '!rounded-l-full',
                                isLastDayOfWeek(index).lastDayIndex === index && '!rounded-l-full',
                                dateHover && `${dateHover.year}${dateHover.month < 10 ? `0${dateHover.month}` : dateHover.month}${dateHover.day < 10 ? `0${dateHover.day}` : dateHover.day}` > `${calendars[0].slice(0, 4)}${calendars[1].slice(5, 7)}${day.day < 10 ? `0${day.day}` : day.day}` && isDateAfterStartOrEnd({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) }) && focuseEndInput && day.day === 31 || isLastDayOfWeek(index).lastDayIndex === index ? '!border-l-2 !rounded-l-full' : (day.day === 1 || isLastDayOfWeek(index).firstDayIndex === index) && '!border-r-2',
                                {
                                  'hover:border-none !text-gray-400 cursor-default':
                                    !isDateInRange({
                                      day: day.day,
                                      month: +calendars[1].slice(5, 7),
                                      year: +calendars[1].slice(0, 4),
                                    }),
                                },
                                {
                                  '!rounded-r-full': day.day === 1 && isDateBetweenStartAndEnd({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) && !isStartDateEqual({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) }) && !isEndDateEqual({ day: day.day, month: +calendars[0].slice(5, 7), year: +calendars[0].slice(0, 4) })
                                },
                                {
                                  'border-t-2 border-b-2 pl-[4px] border-brand-300 w-11 rounded-none': dateHover && `${dateHover.year}${dateHover.month < 10 ? `0${dateHover.month}` : dateHover.month}${dateHover.day < 10 ? `0${dateHover.day}` : dateHover.day}` > `${calendars[1].slice(0, 4)}${calendars[1].slice(5, 7)}${day.day < 10 ? `0${day.day}` : day.day}` && isDateAfterStartOrEnd({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) }) && focuseEndInput,
                                },
                                {
                                  'bg-brand-200 pl-[4px] mx-auto w-11 group hover:bg-brand-200 rounded-none hover:border-none text-brand-800': isDateBetweenStartAndEnd({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) }) && !isStartDateEqual({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) }) && !isEndDateEqual({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) })
                                },
                                {
                                  'text-white bg-brand-600 w-10': isStartDateEqual({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) }) || isEndDateEqual({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) })
                                }
                              )}
                            >
                              {' '}
                              <div className={cn(
                                { 'hover:bg-brand-300 rounded-full text-center w-full h-full flex items-center justify-center hover:rounded-full': isDateBetweenStartAndEnd({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) }) && !isStartDateEqual({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) }) && !isEndDateEqual({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) }) },
                              )}>
                                {day.day}
                              </div>
                            </div>

                            {
                              day.status === 'current' && isStartDateEqual({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) }) &&
                              <p className='w-6 h-10 bg-brand-200 absolute top-0 left-0'></p>
                            }
                            {
                              day.status === 'current' && isEndDateEqual({ day: day.day, month: +calendars[1].slice(5, 7), year: +calendars[1].slice(0, 4) }) &&
                              <p className='w-6 h-10 bg-brand-200 absolute top-0 right-0'></p>
                            }
                          </div>
                        </Tooltip>
                      )}
                    </div>

                  );
                })}
              </div>
            </div>
            <div className="flex flex-row-reverse mt-4 justify-between items-center">
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
                  'px-2 select-none bg-brand-300 cursor-default py-1 font-medium rounded-md text-white',
                  {
                    'cursor-pointer bg-brand-500':
                      startDate &&
                      endDate &&
                      !errors.end.maxError &&
                      !errors.end.minError &&
                      !errors.start.maxError &&
                      !errors.start.minError &&
                      !areInputsEqual 
                  }
                )}
              >
                اعمال بازه
              </button>

              {startDate &&
                endDate &&
                !errors.end.maxError &&
                !errors.end.minError &&
                !errors.start.maxError &&
                !errors.start.minError &&
                !areInputsEqual && (
                  <div className="flex select-none justify-start w-fit gap-2 px-2 pt-1.5 bg-white rounded-sm items-center">
                    <span className="text-sm">بازه دلخواه:</span>
                    <span className='font-medium'>
                      {DateDifference(
                        `${startDate.year}-${startDate.month}-${startDate.day}`,
                        `${endDate.year}-${endDate.month}-${endDate.day}`
                      )}
                    </span>
                    <span className="font-medium text-sm -mr-1 text-gray-1000">
                      روز
                    </span>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
interface ChevronButtonProps {
  min: string;
  calendars: string[];
  setCurrentDate: (val: number) => void;
}

const ChevronButton: React.FC<ChevronButtonProps> = memo(({ min, calendars, setCurrentDate }) => {
  const isDisabled =
    min.slice(0, 4) === calendars[0].slice(0, 4) &&
    min.slice(5, 7) >= calendars[0].slice(5, 7);

  const handleClick = () => {
    if (!isDisabled) {
      setCurrentDate(-1);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'bg-white hover:border-2 border-brand-600 cursor-pointer rounded-full w-10 h-10 flex items-center justify-center text-black',
        {
          'bg-gray-200 hover:border-none cursor-default': isDisabled,
        }
      )}
    >
      <Icon name="chevron-right" size="lg" />
    </div>
  );
});