'use client';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import moment from 'moment-jalaali';
import momentjalali from 'jalali-moment';
import { Button, cn, DateInput, Icon, Tooltip } from 'design-system';

// --- TYPES ---
// Defines the structure for a date object used internally.
type JalaliDate = moment.Moment;

// Defines the selection, which can be a single date or a range.
type Selection = {
  start: JalaliDate | null;
  end: JalaliDate | null;
};

// Props for the main Datepicker component.
type PersianDatePickerProps = {
  mode?: 'single' | 'range';
  view?: 'single' | 'dual';
  min?: string;
  max?: string;
  defaultValue?: { start?: string; end?: string };
  onChange?: (selection: { start: string | null; end: string | null }) => void;
};

// Props for the internal hook that powers the component.
type UsePersianDatePickerProps = {
  mode: 'single' | 'range';
  view: 'single' | 'dual';
  minDate: JalaliDate | null;
  maxDate: JalaliDate | null;
  initialSelection: Selection;
  onChange?: (selection: { start: string | null; end: string | null }) => void;
};

// --- CONSTANTS ---
const JALALI_DATE_FORMAT = 'jYYYY/jMM/jDD';
const PERSIAN_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];
const PERSIAN_WEEKDAYS_SHORT = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

// --- UTILITY FUNCTIONS ---

/**
 * Parses a Jalali date string (e.g., "1400/3/13") into a moment object.
 * @param dateString The date string to parse.
 * @returns A moment object or null if the string is invalid.
 */
const parseJalaliDate = (dateString?: string | null): JalaliDate | null => {
  if (!dateString) return null;
  const m = moment(dateString, JALALI_DATE_FORMAT);
  return m.isValid() ? m : null;
};

/**
 * Formats a moment object into a Jalali date string.
 * @param date The moment object to format.
 * @returns A formatted string (e.g., "1404/03/13") or null.
 */
const formatJalaliDate = (date: JalaliDate | null): string | null => {
  return date ? date.format(JALALI_DATE_FORMAT) : null;
};

// --- THE CORE HOOK: usePersianDatePicker ---

/**
 * A powerful hook to manage the state and logic of a Persian Datepicker.
 */
const usePersianDatePicker = ({
  mode,
  view,
  minDate,
  maxDate,
  initialSelection,
  onChange,
}: UsePersianDatePickerProps) => {
  const maxDateCopy = maxDate?.clone();
  const minDateCopy = minDate?.clone();

  // --- STATE MANAGEMENT ---
  const [selection, setSelection] = useState<Selection>(initialSelection);
  const [hoveredDate, setHoveredDate] = useState<JalaliDate | null>(null);
  const [focusedInput, setFocusedInput] = useState<'start' | 'end'>('start');

  // `viewDates` controls which month(s) are displayed in the calendar UI.
  const [viewDates, setViewDates] = useState<{
    left: JalaliDate;
    right: JalaliDate | null;
  }>({
    left: (initialSelection.start || moment()).clone(),
    right:
      view === 'dual'
        ? (initialSelection.start || moment()).clone().add(1, 'jMonth')
        : null,
  });

  useEffect(() => {
    if (selection.start) {
      const newLeft = selection.start.clone();
      const newRight =
        view === 'dual' ? newLeft.clone().add(1, 'jMonth') : null;
      setViewDates({ left: newLeft, right: newRight });
    }
  }, [selection.start, view]);

  // Effect to handle external changes and notify parent component.
  useEffect(() => {
    if (onChange) {
      onChange({
        start: formatJalaliDate(selection.start),
        end: formatJalaliDate(selection.end),
      });
    }
  }, [selection, onChange]);

  // --- DERIVED STATE & VALIDATION ---

  // Determines if the "Apply" button should be enabled.
  const isValid = useMemo(() => {
    if (mode === 'single') {
      return selection.start !== null;
    }
    return selection.start !== null && selection.end !== null;
  }, [selection, mode]);

  const isDualViewPossible = useMemo(() => {
    if (!minDate || !maxDate || view === 'single') return false;
    return !minDate.clone().add(1, 'jMonth').isAfter(maxDate);
  }, [minDate, maxDate, view]);

  // --- HELPER & VALIDATION FUNCTIONS ---

  /**
   * Checks if a given date is within the allowed min/max range.
   * @param date The date to check.
   * @returns True if the date is within range.
   */
  const isDateDisabled = useCallback(
    (date: JalaliDate): boolean => {
      const current = momentjalali(
        date?.clone()?.format('YYYY/MM/DD'),
        'YYYY/MM/DD',
      )
        .locale('fa')
        .format('YYYY/MM/DD')
        .replace(/[-/]/g, '');
      const min = momentjalali(
        minDateCopy?.clone()?.format('YYYY/MM/DD'),
        'YYYY/MM/DD',
      )
        .locale('fa')
        .format('YYYY/MM/DD')
        .replace(/[-/]/g, '');
      const max = momentjalali(
        maxDateCopy?.clone()?.format('YYYY/MM/DD'),
        'YYYY/MM/DD',
      )
        .locale('fa')
        .format('YYYY/MM/DD')
        .replace(/[-/]/g, '');

      if (+min && +current < +min) return true;
      if (+max && +current > +max) return true;

      return false;
    },
    [minDate, maxDate],
  );

  // --- DATE SELECTION LOGIC ---

  /**
   * The core logic for handling a day click in the calendar.
   * @param day The moment object for the clicked day.
   */
  const handleDayClick = useCallback(
    (day: JalaliDate) => {
      if (isDateDisabled(day)) return;

      if (mode === 'single') {
        setSelection({ start: day, end: null });
        return;
      }

      // --- Range Mode Logic ---
      const { start, end } = selection;

      if (focusedInput === 'start') {
        if (end && day.isAfter(end)) {
          // If new start is after end, reset range with new start
          setSelection({ start: day, end: null });
          setFocusedInput('end');
        } else {
          // Set new start, keep end
          setSelection({ start: day, end });
          setFocusedInput('end');
        }
      } else {
        // focusedInput === 'end'
        if (start && day.isBefore(start)) {
          // If new end is before start, it becomes the new start
          setSelection({ start: day, end: null });
          setFocusedInput('end');
        } else {
          // Set new end
          setSelection({ start, end: day });
          // Optional: focus start again after a full range is selected
          // setFocusedInput('start');
        }
      }
    },
    [selection, focusedInput, isDateDisabled, mode],
  );

  // --- EXTERNAL SETTERS & INPUT HANDLERS ---

  const setStartDate = useCallback(
    (date: JalaliDate | null) => {
      if (date && isDateDisabled(date)) return;
      if (!date) {
        setSelection({ start: null, end: null });
      } else {
        setSelection((prev) => ({ ...prev, start: date }));
      }
    },
    [isDateDisabled],
  );

  const setEndDate = useCallback(
    (date: JalaliDate | null) => {
      if (date && isDateDisabled(date)) return;
      setSelection((prev) => ({ ...prev, end: date }));
    },
    [isDateDisabled],
  );

  // --- CALENDAR VIEW & NAVIGATION LOGIC ---

  /**
   * Generates the array of days for a given month view.
   * @param dateForMonth The month to generate the calendar for.
   * @returns An array of objects representing days.
   */
  const getCalendarDays = useCallback(
    (dateForMonth: JalaliDate, minDate?: JalaliDate, maxDate?: JalaliDate) => {
      const monthStart = dateForMonth.clone().startOf('jMonth');
      const monthEnd = dateForMonth.clone().endOf('jMonth');
      const startDate = monthStart.clone().startOf('week');
      const endDate = monthEnd.clone().endOf('week');

      const calendarDays: {
        date: JalaliDate;
        isCurrentMonth: boolean;
        isDisabled: boolean;
      }[] = [];

      const day = startDate.clone();

      while (day.isSameOrBefore(endDate)) {
        const isCurrentMonth = day.jMonth() === monthStart.jMonth();

        let isDisabled = false;

        if (minDate && day.isBefore(minDate, 'day')) {
          isDisabled = true;
        }

        if (maxDate && day.isAfter(maxDate, 'day')) {
          isDisabled = true;
        }

        calendarDays.push({
          date: day.clone(),
          isCurrentMonth,
          isDisabled,
        });

        day.add(1, 'day');
      }

      return calendarDays;
    },
    [],
  );
  const leftCalendarDays = useMemo(
    () => getCalendarDays(viewDates.left),
    [viewDates.left, getCalendarDays],
  );
  const rightCalendarDays = useMemo(
    () =>
      viewDates.right && isDualViewPossible
        ? getCalendarDays(viewDates.right)
        : [],
    [viewDates.right, getCalendarDays, isDualViewPossible],
  );

  const goToNextMonth = useCallback(() => {
    setViewDates((current) => {
      const newLeft = current.left.clone().add(1, 'jMonth');
      if (
        maxDate &&
        newLeft.startOf('jMonth').isAfter(maxDate.endOf('jMonth'))
      ) {
        return current; // Don't go past max date
      }
      const newRight = current.right ? newLeft.clone().add(1, 'jMonth') : null;
      if (view === 'dual' && newRight && maxDate && newRight.isAfter(maxDate)) {
        // If right side goes past max, adjust both
        const finalRight = maxDate.clone();
        const finalLeft = maxDate.clone().subtract(1, 'jMonth');
        return { left: finalLeft, right: finalRight };
      }
      return { left: newLeft, right: newRight };
    });
  }, [maxDate, view]);

  const goToPrevMonth = useCallback(() => {
    setViewDates((current) => {
      const newLeft = current.left.clone().subtract(1, 'jMonth');
      if (minDate && newLeft.isBefore(minDate)) {
        return current; // Don't go past min date
      }
      const newRight = current.right ? newLeft.clone().add(1, 'jMonth') : null;
      return { left: newLeft, right: newRight };
    });
  }, [minDate]);

  const setViewMonth = useCallback(
    (side: 'left' | 'right', monthIndex: number) => {
      setViewDates((current) => {
        const newDates = { ...current };
        const targetDate = (side === 'left' ? newDates.left : newDates.right)
          ?.clone()
          .jMonth(monthIndex);

        if (!targetDate) return current;

        if (side === 'left') {
          newDates.left = targetDate;
          if (newDates.right && newDates.left.isSameOrAfter(newDates.right)) {
            newDates.right = newDates.left.clone().add(1, 'jMonth');
            if (maxDate && newDates.right.isAfter(maxDate)) {
              newDates.right = maxDate.clone();
              newDates.left = maxDate.clone().subtract(1, 'jMonth');
            }
          }
        } else {
          // side === 'right'
          newDates.right = targetDate;
          if (newDates.left.isSameOrAfter(newDates.right)) {
            newDates.left = newDates.right.clone().subtract(1, 'jMonth');
            if (minDate && newDates.left.isBefore(minDate)) {
              newDates.left = minDate.clone();
              newDates.right = minDate.clone().add(1, 'jMonth');
            }
          }
        }
        return newDates;
      });
    },
    [minDate, maxDate],
  );

  const setViewYear = useCallback((side: 'left' | 'right', year: number) => {
    setViewDates((current) => {
      const newDates = { ...current };
      const targetDate = (side === 'left' ? newDates.left : newDates.right)
        ?.clone()
        .jYear(year);

      if (!targetDate) return current;

      // This logic is simplified. A full implementation would check min/max month constraints.
      if (side === 'left') {
        newDates.left = targetDate;
        if (newDates.right && newDates.left.isSameOrAfter(newDates.right)) {
          newDates.right = newDates.left.clone().add(1, 'jMonth');
        }
      } else {
        newDates.right = targetDate;
        if (newDates.left.isSameOrAfter(newDates.right)) {
          newDates.left = newDates.right.clone().subtract(1, 'jMonth');
        }
      }
      return newDates;
    });
  }, []);

  // --- UI STATE HELPERS ---

  /**
   * Provides the correct tooltip text for a given day.
   * @param date The date to get the tooltip for.
   * @returns Tooltip string or empty string.
   */
  const getDayTooltip = useCallback(
    (date: JalaliDate): string => {
      if (mode === 'single') {
        const today = moment(); // or momentjalali() if Jalali
        if (date.isSame(today, 'day')) {
          return 'امروز';
        }
      }
      const { start, end } = selection;
      if (mode === 'range') {
        if (!start && !end) return 'تاریخ شروع';
        if (start && !end) {
          return date.isBefore(start) ? 'تاریخ شروع' : 'تاریخ پایان';
        }
        if (start && end) {
          if (focusedInput === 'start') {
            return date.isAfter(end) ? 'تاریخ پایان' : 'تاریخ شروع';
          }
          if (focusedInput === 'end') {
            return date.isBefore(start) ? 'تاریخ شروع' : 'تاریخ پایان';
          }
        }
      }
      return '';
    },
    [selection, focusedInput, mode],
  );

  /**
   * Checks if a day is part of the selected range (between start and end).
   * @param day The day to check.
   * @returns True if the day is in the selected range.
   */
  const isDateInRange = useCallback(
    (day: JalaliDate): boolean => {
      if (mode !== 'range' || !selection.start || !selection.end) return false;
      return day.isBetween(selection.start, selection.end, 'day', '()');
    },
    [selection, mode],
  );

  /**
   * Checks if a day is part of the currently hovered range preview.
   * @param day The day to check.
   * @returns True if the day is in the hovered range.
   */
  const isDateInHoverRange = useCallback(
    (day: JalaliDate): boolean => {
      if (mode !== 'range' || !selection.start || selection.end || !hoveredDate)
        return false;
      const start = selection.start;
      if (hoveredDate.isBefore(start)) return false;
      return day.isBetween(start, hoveredDate, 'day', '()');
    },
    [selection, hoveredDate, mode],
  );

  return {
    // State
    selection,
    viewDates,
    hoveredDate,
    focusedInput,
    isValid,
    isDualViewPossible,
    // Days for rendering
    leftCalendarDays,
    rightCalendarDays,
    // Actions
    handleDayClick,
    setHoveredDate,
    setFocusedInput,
    setStartDate,
    setEndDate,
    goToNextMonth,
    goToPrevMonth,
    setViewMonth,
    setViewYear,
    // UI Helpers
    isDateDisabled,
    isDateInRange,
    isDateInHoverRange,
    getDayTooltip,
    minDate,
    maxDate,
  };
};

// --- UI COMPONENTS ---

/**
 * Renders a single calendar month view.
 */
const CalendarView = ({
  calendarDays,
  onDayClick,
  onDayHover,
  selection,
  isDateDisabled,
  isDateInRange,
  isDateInHoverRange,
  getDayTooltip,
}) => {
  return (
    <div className="grid grid-cols-7 gap-1 text-center">
      {PERSIAN_WEEKDAYS_SHORT.map((day) => (
        <div
          key={day}
          className="text-text-neutral-primary text-base font-medium"
        >
          {day}
        </div>
      ))}
      <div className="bg-border-neutral-secondary col-span-7 h-[1px] w-full rounded-md" />
      {calendarDays.map(({ date, isCurrentMonth, range }, index) => {
        const isDisabled = isDateDisabled(date);
        const isStart = selection.start?.isSame(date, 'day');
        const isEnd = selection.end?.isSame(date, 'day');
        const isInRange = isDateInRange(date);
        const isInHoverRange = isDateInHoverRange(date);
        const tooltipText = getDayTooltip(date);

        const isWeekStart = index % 7 === 0
        const isWeekEnd = index % 7 === 6;
        const dayClasses = [
          'relative w-10 h-10 flex mx-auto items-center justify-center font-semibold transition-colors duration-150',
          isDisabled && 'text-text-neutral-disable cursor-default',
          isCurrentMonth
            ? 'text-gray-800 shadow-xs'
            : 'text-transparent cursor-default',
          !isDisabled && isCurrentMonth && (isStart || isEnd)
            ? 'bg-surface-brand-600-primary !w-10 rounded-full text-text-onbrand-neutral-primary-on600'
            : '',
          !isDisabled &&
          range &&
          !(isStart || isEnd) &&
          !isInRange &&
          !isDisabled && isCurrentMonth && !isStart && !isEnd
            ? 'hover:border-2 hover:bg-border-button-neutral-border-default'
            : '',
          isInRange && isCurrentMonth &&
            'text-text-onbrand-colored-primary-on200_100_50 bg-surface-brand-200 hover:border-none !hover:bg-surface-brand-300-disable',
          isWeekStart && 'rounded-r-full',
          isWeekEnd && 'rounded-l-full w-10',
          !isWeekEnd && isInRange && 'w-12 rounded-none',
          !isInRange && 'rounded-full',
          isInHoverRange && isCurrentMonth && 'rounded-none border-t-2 border-b-2 border-border-brand-disable-300 w-11 shadow-none',
          isInHoverRange && isWeekEnd && isCurrentMonth && 'border-l-2 border-border-brand-disable-300 w-10',
          isInHoverRange && isWeekStart && isCurrentMonth && 'border-r-2 border-border-brand-disable-300 w-10',
          isCurrentMonth && date.jDate() === 1 && 'rounded-r-full',
          isCurrentMonth && isInHoverRange && date.jDate() === 1 && 'border-r-2',
          
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <Tooltip
            key={date.format('YYYY-MM-DD')}
            title={getDayTooltip(date)}
            className={`flex items-center justify-center`}
          >
            <button
              type="button"
              onClick={() => isCurrentMonth && onDayClick(date)}
              onMouseEnter={() => onDayHover(date)}
              disabled={isDisabled}
              className={dayClasses}
            >
              {isCurrentMonth && date.jDate()}
              {tooltipText && (
                <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {tooltipText}
                </span>
              )}
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
};

/**
 * Renders the header with month/year selectors and navigation.
 */
const CalendarControls = ({
  viewDate,
  onPrev,
  onNext,
  onMonthChange,
  onYearChange,
  minDate,
  maxDate,
  isLeft,
  mode,
}) => {
  const currentYear = viewDate.jYear();
  const currentMonth = viewDate.jMonth();

  const years = useMemo(() => {
    const startYear = minDate ? minDate.jYear() : currentYear - 5;
    const endYear = maxDate ? maxDate.jYear() : currentYear + 5;
    const yearList = [];
    for (let y = startYear; y <= endYear; y++) {
      yearList.push(y);
    }
    return yearList;
  }, [minDate, maxDate, currentYear]);

  const months = useMemo(() => {
    return PERSIAN_MONTHS.map((name, index) => {
      const monthDate = viewDate.clone().jMonth(index);
      const isDisabled =
        (minDate && monthDate.isBefore(minDate, 'jMonth')) ||
        (maxDate && monthDate.isAfter(maxDate, 'jMonth'));
      return { name, index, isDisabled };
    });
  }, [viewDate, minDate, maxDate]);

  const canGoPrev =
    !minDate ||
    viewDate.clone().subtract(1, 'jMonth').isSameOrAfter(minDate, 'jMonth');
  const canGoNext =
    !maxDate ||
    viewDate.clone().add(1, 'jMonth').isSameOrBefore(maxDate, 'jMonth');

  return (
    <div
      className={cn('mb-4 flex w-full items-center px-2 py-2', {
        'justify-start gap-6': mode === 'range' && !isLeft,
        'justify-end gap-6': mode === 'range' && isLeft,
        'justify-between': mode === 'single',
      })}
    >
      {(mode === 'single' || !isLeft) && (
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className="bg-surface-neutral-primary disabled:text-icon-neutral-disable hover:border-border-brand-primary-600 h-10 w-10 rounded-full border-2 border-transparent p-2 disabled:border-transparent"
        >
          <Icon name="chevron-right" size="md" />
        </button>
      )}
      <div className="flex items-center gap-1">
        <select
          value={currentMonth}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="bg-surface-neutral-primary cursor-pointer rounded-sm border-none px-2 py-1 outline-none focus:ring-0"
        >
          {months.map((month) => (
            <option
              key={month.index}
              value={month.index}
              disabled={month.isDisabled}
            >
              {month.name}
            </option>
          ))}
        </select>
        <select
          value={currentYear}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="bg-surface-neutral-primary cursor-pointer rounded-sm border-none px-2 py-1 outline-none focus:ring-0"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {isLeft && (
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="bg-surface-neutral-primary disabled:text-icon-neutral-disable hover:border-border-brand-primary-600 h-10 w-10 rounded-full border-2 border-transparent p-2 disabled:border-transparent"
        >
          <Icon name="chevron-left" size="md" />
        </button>
      )}
    </div>
  );
};

// --- THE MAIN COMPONENT: PersianDatePicker ---

export const PersianDatePicker = ({
  mode = 'single',
  view = 'dual',
  min,
  max,
  defaultValue,
  onChange,
}: PersianDatePickerProps) => {
  const minDate = useMemo(() => parseJalaliDate(min), [min]);
  const maxDate = useMemo(() => parseJalaliDate(max), [max]);
  const [focusInput, setFocusInput] = useState<'start' | 'end'>('start');
  const [errors, setErrors] = useState({
    minError: false,
    maxError: false,
  });

  const initialSelection = useMemo(
    () => ({
      start: parseJalaliDate(defaultValue?.start),
      end: mode === 'range' ? parseJalaliDate(defaultValue?.end) : null,
    }),
    [defaultValue, mode],
  );

  const hook = usePersianDatePicker({
    mode,
    view: mode === 'single' ? 'single' : view,
    minDate,
    maxDate,
    initialSelection,
    onChange,
  });

  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === 'range') {
      if (hook.focusedInput === 'start') {
        startInputRef.current?.focus();
      } else {
        endInputRef.current?.focus();
      }
    }
  }, [hook.focusedInput, mode]);

  const handleStartDateChange = (value: string) => {
    const parsed = parseJalaliDate(value);
    if (value === '' || (parsed && value.length >= 10)) {
      if (parsed && hook.selection.end && parsed.isAfter(hook.selection.end)) {
        hook.setStartDate(parsed);
        hook.setEndDate(null);
      } else {
        hook.setStartDate(parsed);
      }
    }
  };

  const handleEndDateChange = (value: string) => {
    const parsed = parseJalaliDate(value);
    if (value === '' || (parsed && value.length >= 10)) {
      if (
        parsed &&
        hook.selection.start &&
        parsed.isBefore(hook.selection.start)
      ) {
        hook.setStartDate(parsed);
        hook.setEndDate(null);
        hook.setFocusedInput('end');
      } else {
        hook.setEndDate(parsed);
      }
    }
  };

  return (
    <div
      className="bg-surface-neutral-secondary min-w-[356px] max-w-[704px] rounded-lg border px-6 py-4 font-sans shadow-lg"
      onMouseLeave={() => hook.setHoveredDate(null)}
    >
      {/* --- Inputs Header --- */}
      <div className={`mb-4 flex items-center justify-center gap-2`}>
        {mode === 'range' && (
          <div>
            <p className="text-text-neutral-primary tex mb-1 text-right text-sm font-medium">
              تاریخ شروع
            </p>
            <DateInput
              min={min}
              max={max}
              errors={errors}
              errorHandler={(e) =>
                setErrors({ minError: e.minError, maxError: e.maxError })
              }
              clearDate={() => {
                hook.setStartDate(null);
                hook.setEndDate(null);
              }}
              active={true}
              focus={focusInput === 'end'}
              ref={startInputRef}
              value={formatJalaliDate(hook.selection.start) || ''}
              onChange={handleStartDateChange}
              onFocus={() => hook.setFocusedInput('start')}
              defaultValue={formatJalaliDate(hook.selection.start) ?? ''}
            />
          </div>
        )}
        {mode === 'range' && (
          <div className="bg-border-neutral-highcontrast h-[1px] w-2.5 rounded-md" />
        )}
        <div
          className={cn({
            'flex-1': mode === 'single',
          })}
        >
          <p className="text-text-neutral-primary mb-1 text-right text-sm font-medium">
            {mode === 'single' ? 'تاریخ واریز' : 'تاریخ پایان'}
          </p>
          <DateInput
            min={min}
            focus={focusInput === 'start'}
            max={max}
            errors={errors}
            errorHandler={(e) =>
              setErrors({ minError: e.minError, maxError: e.maxError })
            }
            ref={endInputRef}
            equalInput={false}
            clearDate={() => {
              hook.setEndDate(null);
            }}
            defaultValue={
              formatJalaliDate(
                mode === 'single' ? hook.selection.start : hook.selection.end,
              ) || ''
            }
            onChange={
              mode === 'single'
                ? (v) => {
                    hook.setStartDate(parseJalaliDate(v));
                  }
                : handleEndDateChange
            }
            clearDate={() => hook.setStartDate(null)}
            errorText={
              errors.minError || errors.maxError
                ? 'تاریخ انتخاب شده مجاز نمیباشد.'
                : ''
            }
            active={true}
          />
        </div>
      </div>

      {/* --- Calendar Views --- */}
      <div className="flex justify-center gap-5">
        {/* Left Calendar */}
        {hook.isDualViewPossible && mode === 'range' && (
          <div className="flex-1">
            <CalendarControls
              viewDate={hook.viewDates.left}
              onPrev={hook.goToPrevMonth}
              onNext={hook.goToNextMonth} // This will be hidden
              onMonthChange={(m) => hook.setViewMonth('left', m)}
              onYearChange={(y) => hook.setViewYear('left', y)}
              minDate={hook.minDate}
              maxDate={hook.maxDate}
              isLeft={false}
              mode={mode}
            />
            <CalendarView
              calendarDays={hook.leftCalendarDays}
              onDayClick={hook.handleDayClick}
              onDayHover={hook.setHoveredDate}
              selection={hook.selection}
              isDateDisabled={hook.isDateDisabled}
              isDateInRange={hook.isDateInRange}
              isDateInHoverRange={hook.isDateInHoverRange}
              getDayTooltip={hook.getDayTooltip}
            />
          </div>
        )}
        {mode === 'range' && (
          <div className="bg-border-neutral-secondary mt-[100px] h-[277px] w-[1px]"></div>
        )}
        {/* Right or Single Calendar */}
        <div className="flex-1">
          <CalendarControls
            viewDate={
              hook.isDualViewPossible && mode === 'range'
                ? hook.viewDates.right
                : hook.viewDates.left
            }
            onPrev={hook.goToPrevMonth} // This will be hidden
            onNext={hook.goToNextMonth}
            onMonthChange={(m) =>
              hook.setViewMonth(
                hook.isDualViewPossible && mode === 'range' ? 'right' : 'left',
                m,
              )
            }
            mode={mode}
            onYearChange={(y) =>
              hook.setViewYear(
                hook.isDualViewPossible && mode === 'range' ? 'right' : 'left',
                y,
              )
            }
            minDate={hook.minDate}
            maxDate={hook.maxDate}
            isLeft={true}
          />
          <CalendarView
            calendarDays={
              hook.isDualViewPossible && mode === 'range'
                ? hook.rightCalendarDays
                : hook.leftCalendarDays
            }
            onDayClick={hook.handleDayClick}
            onDayHover={hook.setHoveredDate}
            selection={hook.selection}
            isDateDisabled={hook.isDateDisabled}
            isDateInRange={hook.isDateInRange}
            isDateInHoverRange={hook.isDateInHoverRange}
            getDayTooltip={hook.getDayTooltip}
          />
        </div>
      </div>

      {/* --- Footer --- */}
      <div className="mt-4 flex justify-end">
        <Button size="sm" className="w-fit" disabled={!hook.isValid}>
          {mode === 'range' ? 'اعمال بازه' : 'اعمال'}
        </Button>
      </div>
    </div>
  );
};
