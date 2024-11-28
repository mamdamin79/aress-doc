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
import moment from 'jalali-moment';
import { Tooltip } from '../Tooltip';

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
    12: { name: 'اسفند', numberOfDays: 30 },
  },
});
const weeksTitle = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

interface Props {
  min: string;
  max: string;
}

export function DatePicker({ min, max }: Props) {
  const [isPending, startTransition] = useTransition();
  const [date, setDateS] = useState<Date>(); // create date based on timezone
  const containerRef = useRef<HTMLDivElement>(null);
  const [minDate, setMinDate] = useState(min);
  const [maxDate, setMaxDate] = useState(max);
  const [startDate, setStartDate] = useState<string | Date>();
  const [endDate, setEndDateS] = useState<string | Date | null>();
  const [activeStartInput, setActiveStartInput] = useState(true);
  const [activeEndInput, setActiveEndInput] = useState(false);
  const [invalidStartDate, setInvalidStartDate] = useState('');
  const [invalidEndDate, setInvalidEndDate] = useState('');
  const [mosvaiDate, setMosaviDate] = useState('');
  const [titleTooltip, setTitleTooltip] = useState('');
  const [endDateHover, setEndDateHover] = useState('');
  const [endEnterCell, setEndEnterCell] = useState<{
    date: string;
    day: number;
    state: string;
  }>();

  const [focuseStartInput, setFocuseStartInput] = useState(true);
  const [focuseEndInput, setFocuseEndInput] = useState(false);

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
    setEndDateS(e);
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

  useEffect(() => {
    setMinDate(min);
    setMaxDate(max);
  }, [min, max]);

  const {
    onChangeDate,
    handleShowNextMonth,
    handleShowPrevMonth,
    setOpen,
    getMode,
    getDate,
    isSelectedDay,
    getRenderedMonthName,
    setDate,
    setEndDate,
    getRenderedYear,
    getMonthList,
    changeMonth,
    getYearsList,
    changeYear,
    isLoading,
    getRenderedDateOriginal,
    goToToday,
    getRenderedNextMonth,
    getEndDate,
    getDays,
    getRenderedNextMonthName,
    getRenderedNextDateYear,
    isDateInRange,
    isSelecting,
    isEndDate,
  } = useMemo(
    // use memo to insure that only one instance of datePicker exist and don't change on re-rendering
    () =>
      new RangePicker({
        date: formatDate(date), // convert date to iso format YYYY-MM-DD
        locale,
        weekOffset: 1,
        dayRenderType: 'fill',
        twoSide: true,
        normalized: true,
        dateFormatter: formatter,
      }),
    []
  );

  const getFirstAndLastDayOfWeek = (index: number) => {
    const firstDayIndex = index - (index % 7); // اولین روز هفته
    const lastDayIndex = firstDayIndex + 6; // آخرین روز هفته
    return { firstDayIndex, lastDayIndex };
  };

  useEffect(() => {
    if (typeof startDate === 'string') {
      setDate(
        moment
          .from(startDate, 'fa', 'YYYY/MM/DD')
          .locale('en')
          .format('YYYY-MM-DD')
      );
    }
    if (typeof endDate === 'string') {
      setEndDate(
        moment
          .from(endDate, 'fa', 'YYYY/MM/DD')
          .locale('en')
          .format('YYYY-MM-DD')
      );
    }
    if (typeof startDate === 'string' && typeof endDate === 'string') {
      if (startDate.replace(/-/g, '') < endDate.replace(/-/g, '')) {
        setDate(
          moment
            .from(startDate, 'fa', 'YYYY/MM/DD')
            .locale('en')
            .format('YYYY-MM-DD')
        );
      }
      if (
        startDate.replace(/-/g, '') > endDate.replace(/-/g, '') &&
        focuseStartInput
      ) {
        setInvalidStartDate('تاریخ شروع نباید بیشتر از تاریخ پایان باشد.');
      } else if (
        endDate.replace(/-/g, '') < startDate.replace(/-/g, '') &&
        focuseEndInput
      ) {
        setInvalidEndDate('تاریخ پایان نباید کمتر از تاریخ شروع باشد.');
      } else {
        setInvalidEndDate('');
        setInvalidStartDate('');
      }

      if (startDate.replace(/-/g, '') === endDate.replace(/-/g, '')) {
        setMosaviDate('تاریخ شروع و پایان نباید تو یک روز باشد.');
      } else {
        setMosaviDate('');
      }
    }
  }, [
    startDate,
    endDate,
    focuseStartInput,
    focuseEndInput,
    setDate,
    setEndDate,
    endErrors.maxError,
    endErrors.minError,
  ]);

  const handlerMouseLeave = () => {
    setEndDateHover('');
  };

  useEffect(() => {
    // change date listener
    onChangeDate(() => setDateS(createDate(getDate())));

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

  const daysList = getDays();
  const daysListNext = getDays('next');

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
                      !getEndDate() ? (
                        <option
                          key={item}
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
                            'shadow-none !cursor-pointer hover:bg-brand-600',
                            item === year && 'text-brand-600'
                          )}
                          value={year}
                          selected
                        >
                          {year}
                        </option>
                      )
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
                {getMonthList().map((item, index) =>
                  month === item.name ? (
                    <option
                      key={index}
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
                      disabled={
                        +min.slice(0, 4) === year &&
                        item.monthNumber < +min.slice(5, 7)
                      }
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

  const moseEnterCell = (date: {
    day: number;
    date: string;
    state: string;
  }) => {
    setEndDateHover(date.date);

    if (date.state === 'current' && startDate) {
      setEndEnterCell(date);
    }

    if (!startDate && focuseStartInput) {
      setTitleTooltip('تاریخ شروع');
    }

    if (
      typeof startDate === 'string' &&
      focuseStartInput &&
      startDate.replace(/-/g, '') ===
        moment(date.date, 'YYYY/MM/DD')
          .locale('fa')
          .format('YYYY-MM-DD')
          .replace(/-/g, '')
    ) {
      setTitleTooltip('');
    }
    if (endDate && focuseStartInput && typeof endDate === 'string') {
      if (
        endDate.replace(/-/g, '') ===
        moment(date.date, 'YYYY/MM/DD')
          .locale('fa')
          .format('YYYY-MM-DD')
          .replace(/-/g, '')
      ) {
        setTitleTooltip('');
      } else if (
        typeof startDate === 'string' &&
        startDate.replace(/-/g, '') ===
          moment(date.date, 'YYYY/MM/DD')
            .locale('fa')
            .format('YYYY-MM-DD')
            .replace(/-/g, '')
      ) {
        setTitleTooltip('');
      } else {
        setTitleTooltip('تاریخ شروع');
      }
    }
    if (focuseEndInput && typeof startDate === 'string') {
      if (
        moment(date.date, 'YYYY/MM/DD')
          .locale('fa')
          .format('YYYY-MM-DD')
          .replace(/-/g, '') > startDate.replace(/-/g, '')
      ) {
        setTitleTooltip('تاریخ پایان');
      } else {
        setTitleTooltip('تاریخ شروع');
      }

      if (
        moment(date.date, 'YYYY/MM/DD')
          .locale('fa')
          .format('YYYY-MM-DD')
          .replace(/-/g, '') === startDate.replace(/-/g, '')
      ) {
        setTitleTooltip('');
      }

      if (
        moment(date.date, 'YYYY/MM/DD')
          .locale('fa')
          .format('YYYY-MM-DD')
          .replace(/-/g, '') ===
        (typeof endDate === 'string' && endDate.replace(/-/g, ''))
      ) {
        setTitleTooltip('');
      }
    }

    if (
      moment(date.date, 'YYYY/MM/DD')
        .locale('fa')
        .format('YYYY-MM-DD')
        .replace(/-/g, '') < min.replace(/-/g, '')
    ) {
      setTitleTooltip('');
    }
  };

  console.log(endDateHover);

  useEffect(() => {
    if (
      typeof startDate === 'string' &&
      startDate.replace(/-/g, '') < min.replace(/-/g, '')
    ) {
      errorHandler({ minError: true, maxError: false });
    }
  }, [min, startDate]);

  return (
    <div style={{ display: 'inline-block', width: 'auto' }}>
      <button onClick={goToToday}>go to today</button>

      <div ref={containerRef} className="bg-gray-100 relative rounded-3xl">
        {!isLoading() && (
          <div
            className="flex flex-col p-6 gap-4"
            style={{
              width: 704,
            }}
          >
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 text-md items-center font-vazirmatn justify-center">
                <div className="flex flex-col gap-1 items-start">
                  <span className={cn({ invisible: !activeStartInput })}>
                    تاریخ شروع بازه:
                  </span>
                  <div
                    onClick={() => {
                      setActiveStartInput(true);
                      setFocuseStartInput(true);
                      setFocuseEndInput(false);
                      if (getDate() && !getEndDate()) {
                        setActiveEndInput(false);
                      }
                    }}
                  >
                    <DateInput
                      invalidStartDate={invalidStartDate}
                      invalidEndDate={invalidEndDate}
                      mosaviDate={mosvaiDate}
                      placeholder="تاریخ شروع"
                      active={activeStartInput}
                      focus={focuseStartInput}
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
                  <span className={cn({ invisible: !activeEndInput })}>
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
                      invalidStartDate={invalidStartDate}
                      invalidEndDate={invalidEndDate}
                      mosaviDate={mosvaiDate}
                      placeholder="تاریخ پایان"
                      active={activeEndInput}
                      focus={focuseEndInput}
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
              <div className="h-4">
                <span className="text-red-600 mr-40 font-medium text-xs">
                  {!startErrors.minError &&
                    !startErrors.maxError &&
                    focuseStartInput &&
                    invalidStartDate}
                  {startErrors.minError &&
                    focuseStartInput &&
                    'تاریخ شروع وارد شده کمتر از حداقل تاریخ مجاز است.'}
                  {startErrors.maxError &&
                    focuseStartInput &&
                    'تاریخ شروع وارد شده بیشتر از حداکثر تاریخ مجاز است.'}
                  {!endErrors.maxError &&
                    focuseStartInput &&
                    !endErrors.minError &&
                    !startErrors.minError &&
                    !startErrors.maxError &&
                    !invalidEndDate &&
                    mosvaiDate}
                </span>
                <span className="text-red-600 mr-[180px] font-medium text-xs">
                  {!endErrors.minError &&
                    !endErrors.maxError &&
                    focuseEndInput &&
                    invalidEndDate}
                  {endErrors.minError &&
                    focuseEndInput &&
                    'تاریخ پایان وارد شده کمتر از حداقل تاریخ مجاز است.'}
                  {endErrors.maxError &&
                    focuseEndInput &&
                    'تاریخ پایان وارد شده بیشتر از حداکثر تاریخ مجاز است.'}
                  {!endErrors.maxError &&
                    focuseEndInput &&
                    !endErrors.minError &&
                    !startErrors.minError &&
                    !startErrors.maxError &&
                    !invalidEndDate &&
                    mosvaiDate}
                </span>
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
            <div onMouseLeave={handlerMouseLeave} className="flex gap-12">
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
                          onClick={() => {
                            const activeMonth = moment(
                              getRenderedDateOriginal(),
                              'YYYY/MM/DD'
                            )
                              .locale('fa')
                              .format('YYYY-MM-DD');
                            if (+activeMonth.slice(0, 4) === +min.slice(0, 4)) {
                              if (+min.slice(5, 7) % 2 === 0) {
                                if (
                                  +min.slice(5, 7) - 1 <
                                  +activeMonth.slice(5, 7)
                                ) {
                                  handleShowPrevMonth();
                                }
                              } else if (
                                +min.slice(5, 7) < +activeMonth.slice(5, 7)
                              ) {
                                handleShowPrevMonth();
                              }
                            } else {
                              handleShowPrevMonth();
                            }
                          }}
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
                          const { firstDayIndex, lastDayIndex } =
                            getFirstAndLastDayOfWeek(index);

                          return (
                            <div
                              key={index}
                              className={cn('w-full')}
                              onMouseEnter={() => {
                                moseEnterCell(day);
                              }}
                            >
                              {day.state === 'current' && (
                                <Tooltip
                                  className="!cursor-default"
                                  title={titleTooltip}
                                >
                                  <div className={cn(isDateInRange(day.date))}>
                                    <button
                                      className={cn(
                                        'w-10 h-10 my-1 text-lg hover:border-brand-600 hover:border-2 rounded-full',
                                        {
                                          'bg-white shadow-xs':
                                            day.state === 'current',
                                        },
                                        {
                                          'bg-brand-600 shadow-brand-600 shadow-sm text-white':
                                            isSelectedDay(day.date) &&
                                            day.state === 'current',
                                        },
                                        {
                                          'bg-brand-600 w-full text-white':
                                            isSelecting() &&
                                            isDateInRange(day.date) &&
                                            isEndDate(day.date) &&
                                            day.state === 'current',
                                        },
                                        {
                                          'rounded-none w-full ml-1 border-brand-600 border-t border-b':
                                            !isSelectedDay(day.date) &&
                                            isSelecting() &&
                                            isDateInRange(day.date) &&
                                            day.state === 'current',
                                        },
                                        {
                                          'bg-brand-200 rounded-none pl-[3px] border-none hover:border-none text-brand-700 w-full':
                                            !isSelectedDay(day.date) &&
                                            !isSelecting() &&
                                            isDateInRange(day.date),
                                        },
                                        {
                                          'rounded-r-full':
                                            !isSelectedDay(day.date) &&
                                            !isSelecting() &&
                                            isDateInRange(day.date) &&
                                            index === firstDayIndex,
                                        },
                                        {
                                          'rounded-l-full':
                                            !isSelectedDay(day.date) &&
                                            !isSelecting() &&
                                            isDateInRange(day.date) &&
                                            index === lastDayIndex,
                                        },
                                        {
                                          'bg-gray-200 cursor-default hover:border-none':
                                            +moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') <
                                              +min.replace(/-/g, '') ||
                                            +moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') >
                                              +max.replace(/-/g, ''),
                                        },

                                        {
                                          'border-t-2 border-b-2 pl-[3px] w-full rounded-none border-brand-600':
                                            endDateHover &&
                                            startDate &&
                                            focuseEndInput &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') >
                                              String(startDate).replace(
                                                /-/g,
                                                ''
                                              ) &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') <
                                              moment(endDateHover, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, ''),
                                        },
                                        {
                                          'border-t-2 border-b-2 pl-[3px] w-full rounded-none border-brand-600':
                                            endDateHover &&
                                            focuseEndInput &&
                                            endDate &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') >
                                              String(endDate).replace(
                                                /-/g,
                                                ''
                                              ) &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') <
                                              moment(endDateHover, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, ''),
                                        },
                                        {
                                          'border-t-2 border-b-2 w-full rounded-none border-brand-600':
                                            endDateHover &&
                                            focuseStartInput &&
                                            endDate &&
                                            startDate &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') <
                                              String(startDate).replace(
                                                /-/g,
                                                ''
                                              ) &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') >
                                              moment(endDateHover, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, ''),
                                        },
                                        {
                                          'border-t-2 border-b-2 w-full pl-[3px] rounded-none border-brand-600 border-r-2 rounded-r-full':
                                            endDateHover &&
                                            firstDayIndex === index &&
                                            startDate &&
                                            focuseEndInput &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') >
                                              String(startDate).replace(
                                                /-/g,
                                                ''
                                              ) &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') <
                                              moment(endDateHover, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, ''),
                                        },
                                        {
                                          'border-t-2 border-b-2 w-full pl-[3px] rounded-none border-brand-600 border-r-2 rounded-r-full':
                                            endDateHover &&
                                            firstDayIndex === index &&
                                            focuseEndInput &&
                                            endDate &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') >
                                              String(endDate).replace(
                                                /-/g,
                                                ''
                                              ) &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') <
                                              moment(endDateHover, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, ''),
                                        },

                                        {
                                          'border-t- border-b-2 w-full pl-[10px] rounded-none border-brand-600 border-r-2 rounded-r-full':
                                            endDateHover &&
                                            firstDayIndex === index &&
                                            focuseStartInput &&
                                            endDate &&
                                            startDate &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') <
                                              String(startDate).replace(
                                                /-/g,
                                                ''
                                              ) &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') >
                                              moment(endDateHover, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, ''),
                                        },
                                        {
                                          'border-t-2 border-b-2 w-full rounded-none border-brand-600 border-l-2 rounded-l-full':
                                            endDateHover &&
                                            lastDayIndex === index &&
                                            startDate &&
                                            focuseEndInput &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') >
                                              String(startDate).replace(
                                                /-/g,
                                                ''
                                              ) &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') <
                                              moment(endDateHover, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, ''),
                                        },
                                        {
                                          'rounded-r-full':
                                            !isSelectedDay(day.date) &&
                                            !isSelecting() &&
                                            isDateInRange(day.date) &&
                                            day.state === 'current' &&
                                            day.day === 1,
                                        },
                                        {
                                          'border-t-2 border-b-2 w-full rounded-none border-brand-600 border-l-2 rounded-l-full':
                                            endDateHover &&
                                            lastDayIndex === index &&
                                            focuseEndInput &&
                                            endDate &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') >
                                              String(endDate).replace(
                                                /-/g,
                                                ''
                                              ) &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') <
                                              moment(endDateHover, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, ''),
                                        },
                                        {
                                          'border-t-2 border-b-2 w-full rounded-none border-brand-600 border-l-2 rounded-l-full':
                                            endDateHover &&
                                            lastDayIndex === index &&
                                            focuseStartInput &&
                                            endDate &&
                                            startDate &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') <
                                              String(startDate).replace(
                                                /-/g,
                                                ''
                                              ) &&
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD')
                                              .replace(/-/g, '') >
                                              moment(endDateHover, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, ''),
                                        }
                                      )}
                                      disabled={day.day === 0}
                                      onClick={() => {
                                        if (
                                          getDate() !==
                                            moment(day.date, 'YYYY/MM/DD')
                                              .locale('fa')
                                              .format('YYYY-MM-DD') &&
                                          moment(day.date, 'YYYY/MM/DD')
                                            .locale('fa')
                                            .format('YYYY-MM-DD')
                                            .replace(/-/g, '') >=
                                            min.replace(/-/g, '') &&
                                          moment(day.date, 'YYYY/MM/DD')
                                            .locale('fa')
                                            .format('YYYY-MM-DD')
                                            .replace(/-/g, '') <=
                                            max.replace(/-/g, '')
                                        ) {
                                          setFocuseEndInput(true);
                                          setActiveEndInput(true);
                                          if (
                                            !endDate &&
                                            !getEndDate() &&
                                            focuseStartInput
                                          ) {
                                            setStartDate(
                                              moment(day.date, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                            );
                                          }

                                          if (
                                            (startDate || getDate()) &&
                                            typeof startDate === 'string' &&
                                            focuseEndInput
                                          ) {
                                            if (
                                              moment(day.date, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, '') >
                                              startDate.replace(/-/g, '')
                                            ) {
                                              setEndDateS(
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                              );
                                            } else {
                                              setEndDateS(null);
                                              setEndDate('');
                                              setStartDate(
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                              );
                                            }
                                          }

                                          if (
                                            (endDate || getEndDate()) &&
                                            typeof endDate === 'string' &&
                                            focuseStartInput
                                          ) {
                                            if (
                                              moment(day.date, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, '') <
                                              endDate.replace(/-/g, '')
                                            ) {
                                              setStartDate(
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                              );
                                            } else {
                                              setEndDateS(null);
                                              setEndDate('');
                                              setStartDate(
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                              );
                                            }
                                          }
                                          setFocuseStartInput(false);
                                        }
                                      }}
                                    >
                                      <p
                                        className={cn({
                                          'hover:rounded-full mx-auto hover:bg-brand-300 flex items-center justify-center w-10 h-10':
                                            !isSelectedDay(day.date) &&
                                            !isSelecting() &&
                                            isDateInRange(day.date),
                                        })}
                                      >
                                        {day.day}
                                      </p>
                                    </button>
                                  </div>
                                </Tooltip>
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
                              onClick={() => {
                                if (
                                  +getRenderedNextDateYear() ===
                                  +max.slice(0, 4)
                                ) {
                                  if (+max.slice(5, 7) % 2 === 1) {
                                    if (
                                      +max.slice(5, 7) > getRenderedNextMonth()
                                    ) {
                                      handleShowNextMonth();
                                    }
                                  } else if (
                                    +max.slice(5, 7) > getRenderedNextMonth()
                                  ) {
                                    handleShowNextMonth();
                                  }
                                } else if (
                                  +getRenderedNextDateYear() < +max.slice(0, 4)
                                ) {
                                  handleShowNextMonth();
                                }
                              }}
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

                          <div className="grid grid-cols-7 items-center justify-center gap-y-0.5">
                            {daysListNext.map((day, index) => {
                              const { firstDayIndex, lastDayIndex } =
                                getFirstAndLastDayOfWeek(index);

                              return (
                                <div
                                  className="mx-auto w-full"
                                  key={index}
                                  onMouseEnter={() => {
                                    moseEnterCell(day);
                                  }}
                                >
                                  {day.state === 'current' && (
                                    <Tooltip title={titleTooltip}>
                                      <div
                                        className={cn(isDateInRange(day.date))}
                                      >
                                        <button
                                          className={cn(
                                            'w-10 h-10 my-1 text-lg hover:border-brand-600 hover:border-2 rounded-full',
                                            {
                                              'bg-white shadow-xs':
                                                day.state === 'current',
                                            },
                                            {
                                              'border-r-2':
                                                index === firstDayIndex,
                                            },
                                            {
                                              'border-l-2':
                                                index === lastDayIndex,
                                            },
                                            {
                                              'bg-brand-600 shadow-brand-600 shadow-sm text-white':
                                                isSelectedDay(day.date) &&
                                                day.state === 'current',
                                            },
                                            {
                                              'bg-brand-600 w-full text-white':
                                                isSelecting() &&
                                                isDateInRange(day.date) &&
                                                isEndDate(day.date) &&
                                                day.state === 'current',
                                            },
                                            {
                                              'rounded-none w-full  border-brand-600 border-t border-b':
                                                !isSelectedDay(day.date) &&
                                                isSelecting() &&
                                                isDateInRange(day.date) &&
                                                day.state === 'current',
                                            },
                                            {
                                              'bg-brand-200 border-none rounded-none text-brand-700 w-full':
                                                !isSelectedDay(day.date) &&
                                                !isSelecting() &&
                                                isDateInRange(day.date),
                                            },
                                            {
                                              'rounded-r-full':
                                                !isSelectedDay(day.date) &&
                                                !isSelecting() &&
                                                isDateInRange(day.date) &&
                                                index === firstDayIndex,
                                            },
                                            {
                                              'rounded-l-full':
                                                !isSelectedDay(day.date) &&
                                                !isSelecting() &&
                                                isDateInRange(day.date) &&
                                                index === lastDayIndex,
                                            },
                                            {
                                              'rounded-r-full':
                                                !isSelectedDay(day.date) &&
                                                !isSelecting() &&
                                                isDateInRange(day.date) &&
                                                day.state === 'current' &&
                                                day.day === 1,
                                            },
                                            {
                                              'bg-gray-200 cursor-default hover:border-none':
                                                +moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') <
                                                  +min.replace(/-/g, '') ||
                                                +moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') >
                                                  +max.replace(/-/g, ''),
                                            },

                                            {
                                              'border-t-2 border-b-2 w-full rounded-none border-brand-600':
                                                endDateHover &&
                                                startDate &&
                                                focuseEndInput &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') >
                                                  String(startDate).replace(
                                                    /-/g,
                                                    ''
                                                  ) &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') <
                                                  moment(
                                                    endDateHover,
                                                    'YYYY/MM/DD'
                                                  )
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                    .replace(/-/g, ''),
                                            },
                                            {
                                              'border-t-2 border-b-2 w-full rounded-none border-brand-600':
                                                endDateHover &&
                                                focuseEndInput &&
                                                endDate &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') >
                                                  String(endDate).replace(
                                                    /-/g,
                                                    ''
                                                  ) &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') <
                                                  moment(
                                                    endDateHover,
                                                    'YYYY/MM/DD'
                                                  )
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                    .replace(/-/g, ''),
                                            },
                                            {
                                              'border-t-2 border-b-2 w-full rounded-none border-brand-600':
                                                endDateHover &&
                                                focuseStartInput &&
                                                endDate &&
                                                startDate &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') <
                                                  String(startDate).replace(
                                                    /-/g,
                                                    ''
                                                  ) &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') >
                                                  moment(
                                                    endDateHover,
                                                    'YYYY/MM/DD'
                                                  )
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                    .replace(/-/g, ''),
                                            },

                                            {
                                              'border-t-2 border-b-2 w-full rounded-none border-brand-600 border-r-2 rounded-r-full':
                                                endDateHover &&
                                                firstDayIndex === index &&
                                                startDate &&
                                                focuseEndInput &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') >
                                                  String(startDate).replace(
                                                    /-/g,
                                                    ''
                                                  ) &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') <
                                                  moment(
                                                    endDateHover,
                                                    'YYYY/MM/DD'
                                                  )
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                    .replace(/-/g, ''),
                                            },
                                            {
                                              'border-t-2 border-b-2 w-full rounded-none border-brand-600 border-r-2 rounded-r-full':
                                                endDateHover &&
                                                firstDayIndex === index &&
                                                focuseEndInput &&
                                                endDate &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') >
                                                  String(endDate).replace(
                                                    /-/g,
                                                    ''
                                                  ) &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') <
                                                  moment(
                                                    endDateHover,
                                                    'YYYY/MM/DD'
                                                  )
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                    .replace(/-/g, ''),
                                            },
                                            {
                                              'border-t-2 border-b-2 w-full rounded-none border-brand-600 border-r-2 rounded-r-full':
                                                endDateHover &&
                                                firstDayIndex === index &&
                                                focuseStartInput &&
                                                endDate &&
                                                startDate &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') <
                                                  String(startDate).replace(
                                                    /-/g,
                                                    ''
                                                  ) &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') >
                                                  moment(
                                                    endDateHover,
                                                    'YYYY/MM/DD'
                                                  )
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                    .replace(/-/g, ''),
                                            },
                                            {
                                              'border-t-2 border-b-2 w-full rounded-none border-brand-600 border-l-2 rounded-l-full':
                                                endDateHover &&
                                                lastDayIndex === index &&
                                                startDate &&
                                                focuseEndInput &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') >
                                                  String(startDate).replace(
                                                    /-/g,
                                                    ''
                                                  ) &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') <
                                                  moment(
                                                    endDateHover,
                                                    'YYYY/MM/DD'
                                                  )
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                    .replace(/-/g, ''),
                                            },
                                            {
                                              'border-t-2 border-b-2 w-full rounded-none border-brand-600 border-l-2 rounded-l-full':
                                                endDateHover &&
                                                lastDayIndex === index &&
                                                focuseEndInput &&
                                                endDate &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') >
                                                  String(endDate).replace(
                                                    /-/g,
                                                    ''
                                                  ) &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') <
                                                  moment(
                                                    endDateHover,
                                                    'YYYY/MM/DD'
                                                  )
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                    .replace(/-/g, ''),
                                            },
                                            {
                                              'border-t-2 border-b-2 w-full rounded-none border-brand-600 border-l-2 rounded-l-full':
                                                endDateHover &&
                                                lastDayIndex === index &&
                                                focuseStartInput &&
                                                endDate &&
                                                startDate &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') <
                                                  String(startDate).replace(
                                                    /-/g,
                                                    ''
                                                  ) &&
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD')
                                                  .replace(/-/g, '') >
                                                  moment(
                                                    endDateHover,
                                                    'YYYY/MM/DD'
                                                  )
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                    .replace(/-/g, ''),
                                            }
                                          )}
                                          disabled={day.day === 0}
                                          onClick={() => {
                                            if (
                                              getDate() !==
                                                moment(day.date, 'YYYY/MM/DD')
                                                  .locale('fa')
                                                  .format('YYYY-MM-DD') &&
                                              moment(day.date, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, '') >
                                                min.replace(/-/g, '') &&
                                              +moment(day.date, 'YYYY/MM/DD')
                                                .locale('fa')
                                                .format('YYYY-MM-DD')
                                                .replace(/-/g, '') <
                                                +max.replace(/-/g, '')
                                            ) {
                                              if (startDate) {
                                                setFocuseStartInput(false);
                                                setFocuseEndInput(true);
                                              } else {
                                                setFocuseStartInput(true);
                                                setFocuseEndInput(false);
                                              }
                                              setActiveEndInput(true);

                                              if (
                                                !endDate &&
                                                !getEndDate() &&
                                                focuseStartInput
                                              ) {
                                                setStartDate(
                                                  moment(day.date, 'YYYY/MM/DD')
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                );
                                              }

                                              if (
                                                (startDate || getDate()) &&
                                                typeof startDate === 'string' &&
                                                focuseEndInput
                                              ) {
                                                if (
                                                  moment(day.date, 'YYYY/MM/DD')
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                    .replace(/-/g, '') >
                                                  startDate.replace(/-/g, '')
                                                ) {
                                                  setEndDateS(
                                                    moment(
                                                      day.date,
                                                      'YYYY/MM/DD'
                                                    )
                                                      .locale('fa')
                                                      .format('YYYY-MM-DD')
                                                  );
                                                } else {
                                                  setEndDateS(null);
                                                  setEndDate('');
                                                  setStartDate(
                                                    moment(
                                                      day.date,
                                                      'YYYY/MM/DD'
                                                    )
                                                      .locale('fa')
                                                      .format('YYYY-MM-DD')
                                                  );
                                                }
                                              }

                                              if (
                                                (endDate || getEndDate()) &&
                                                typeof endDate === 'string' &&
                                                focuseStartInput
                                              ) {
                                                if (
                                                  moment(day.date, 'YYYY/MM/DD')
                                                    .locale('fa')
                                                    .format('YYYY-MM-DD')
                                                    .replace(/-/g, '') <
                                                  endDate.replace(/-/g, '')
                                                ) {
                                                  setStartDate(
                                                    moment(
                                                      day.date,
                                                      'YYYY/MM/DD'
                                                    )
                                                      .locale('fa')
                                                      .format('YYYY-MM-DD')
                                                  );
                                                } else {
                                                  setEndDateS(null);
                                                  setEndDate('');
                                                  setStartDate(
                                                    moment(
                                                      day.date,
                                                      'YYYY/MM/DD'
                                                    )
                                                      .locale('fa')
                                                      .format('YYYY-MM-DD')
                                                  );
                                                }
                                              }
                                            }
                                          }}
                                        >
                                          <p
                                            className={cn({
                                              'hover:rounded-full mx-auto hover:bg-brand-300 flex items-center justify-center w-10 h-10':
                                                !isSelectedDay(day.date) &&
                                                !isSelecting() &&
                                                isDateInRange(day.date),
                                            })}
                                          >
                                            {day.day}
                                          </p>
                                        </button>
                                      </div>
                                    </Tooltip>
                                  )}
                                </div>
                              );
                            })}
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
