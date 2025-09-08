'use client';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import moment from 'moment-jalaali';
import momentjalali from 'jalali-moment';
import {
  Button,
  cn,
  DateInput,
  Icon,
  MonthSelect,
  Tooltip,
  YearSelect,
} from 'design-system';

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
  onClose: () => void;
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
    // If there is no start date selected, do nothing
    if (!selection.start) return;

    setViewDates((curr) => {
      const { left, right } = curr;

      // --- Dual calendar mode ---
      if (view === 'dual' && right) {
        // If the selected start date is before the left calendar month
        if (selection.start?.isBefore(left)) {
          const newLeft = selection.start.clone();
          const newRight = newLeft.clone().add(1, 'jMonth');
          return { left: newLeft, right: newRight };
        }

        // If the selected start date is after the right calendar month
        if (selection.start?.isAfter(right)) {
          const newRight = selection.start.clone();
          const newLeft = newRight.clone().subtract(1, 'jMonth');
          return { left: newLeft, right: newRight };
        }

        // If the start date is within the current left/right range → do not change view
        return curr;
      }

      // --- Single calendar mode ---
      // If the selected start date's month is different from the currently visible one
      if (!selection.start?.isSame(left)) {
        return { left: selection.start?.clone(), right: null };
      }

      // Otherwise, keep the current view unchanged
      return curr;
    });
  }, [selection.start, view]);

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

  // --- DERIVED STATE: Selected days count ---
  const selectedDaysCount = useMemo(() => {
    if (mode === 'range' && selection.start && selection.end) {
      return selection.end.diff(selection.start, 'days') + 1;
    }
    return 0;
  }, [mode, selection.start, selection.end]);

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
          setFocusedInput('start');
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
  const getCalendarDays = useCallback((dateForMonth: JalaliDate) => {
    const monthStart = dateForMonth.clone().startOf('jMonth');
    const monthEnd = dateForMonth.clone().endOf('jMonth');

    // شروع گرید: شنبه‌ی هفته‌ای که monthStart داخلشه
    const start = monthStart.clone().startOf('day');
    const dowStart = start.day(); // 0=Sun ... 6=Sat
    const backToSaturday = (dowStart - 6 + 7) % 7; // فاصله تا شنبه‌ی قبل/همان
    start.subtract(backToSaturday, 'day');

    // پایان گرید: جمعه‌ی هفته‌ای که monthEnd داخلشه
    const end = monthEnd.clone().startOf('day');
    const dowEnd = end.day();
    const forwardToFriday = (5 - dowEnd + 7) % 7; // فاصله تا جمعه‌ی بعد/همان
    end.add(forwardToFriday, 'day');

    const calendarDays: { date: JalaliDate; isCurrentMonth: boolean }[] = [];
    const day = start.clone();

    while (day.isSameOrBefore(end, 'day')) {
      const isCurrentMonth =
        day.jYear() === monthStart.jYear() &&
        day.jMonth() === monthStart.jMonth();

      calendarDays.push({
        date: day.clone(),
        isCurrentMonth,
      });

      day.add(1, 'day');
    }

    return calendarDays;
  }, []);

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
        if (start && !end && focusedInput === 'end') {
          return date.isBefore(start) ? 'تاریخ شروع' : 'تاریخ پایان';
        }
        if (start && !end && focusedInput === 'start') {
          return 'تاریخ شروع';
        }
        if (start && end) {
          if (focusedInput === 'start') {
            return 'تاریخ شروع';
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
      if (mode !== 'range' || !selection.start || !hoveredDate) return false;

      const start = selection.start;
      const end = selection.end;

      // فقط start انتخاب شده
      if (!end) {
        if (hoveredDate.isBefore(start)) return false;
        return day.isBetween(start, hoveredDate, 'day', '()');
      }

      // --- قوانین جدید بر اساس فوکوس ---
      // اگر فوکوس روی شروع باشد و هاور بعد از end → صفر
      if (focusedInput === 'start' && hoveredDate.isAfter(end)) {
        return false;
      }
      // اگر فوکوس روی پایان باشد و هاور قبل از start → صفر
      if (focusedInput === 'end' && hoveredDate.isBefore(start)) {
        return false;
      }
      // --- پایان قوانین جدید ---

      // هاور بعد از end → پیش‌نمایش end..hovered
      if (hoveredDate.isAfter(end)) {
        return day.isBetween(end, hoveredDate, 'day', '()');
      }

      // هاور قبل از start → پیش‌نمایش hovered..start
      if (hoveredDate.isBefore(start)) {
        return day.isBetween(hoveredDate, start, 'day', '()');
      }

      return false;
    },
    [selection, hoveredDate, mode, focusedInput],
  );

  return {
    // State
    selection,
    viewDates,
    hoveredDate,
    focusedInput,
    isValid,
    isDualViewPossible,
    selectedDaysCount,
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
  mode,
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
      <div className="bg-border-neutral-secondary col-span-7 h-[1px] w-full gap-0 rounded-md" />
      {calendarDays.map(({ date, isCurrentMonth }, index) => {
        const isDisabled = isDateDisabled(date);
        const isStart = selection.start?.isSame(date, 'day');
        const isEnd = selection.end?.isSame(date, 'day');
        const isInRange = isDateInRange(date);
        const isInHoverRange = isDateInHoverRange(date);
        const tooltipText = getDayTooltip(date);
        const isWeekStart = index % 7 === 0;
        const isWeekEnd = index % 7 === 6;
        const daysInThisJMonth = date.clone().endOf('jMonth').jDate();
        const isLastDayOfThisJMonth =
          isCurrentMonth && date.jDate() === daysInThisJMonth;

        const dayClasses = [
          'relative w-10 h-10 flex absolute -top-0.5 rounded-full mx-auto items-center justify-center mb-0.5 font-semibold',
          isDisabled && 'text-text-neutral-disable cursor-default',
          !isDisabled && 'text-text-neutral-primary',
          !isInRange &&
            isCurrentMonth &&
            !isDisabled &&
            mode === 'range' &&
            'hover:border-border-brand-primary-600 hover:border-2',
          !isInRange &&
            isCurrentMonth &&
            !isDisabled &&
            mode === 'single' &&
            !isStart &&
            'hover:border-buttton-neutral-border-default hover:border-2',
          isInHoverRange && isCurrentMonth && !isDisabled && '!shadow-none',
          isCurrentMonth
            ? 'text-gray-800 shadow-xs bg-surface-neutral-primary'
            : 'text-transparent cursor-default',
          isInRange && !isStart && !isEnd && '!shadow-none bg-transparent',
          isInHoverRange && 'bg-transparent',
          !isDisabled && isCurrentMonth && (isStart || isEnd)
            ? '!bg-surface-brand-600-primary rounded-full text-text-onbrand-neutral-primary-on600'
            : '',
          !isDisabled &&
            isInRange &&
            isCurrentMonth &&
            'text-text-onbrand-colored-primary-on200_100_50 bg-surface-brand-200 hover:bg-surface-brand-300-disable',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <Tooltip
            key={date.format('YYYY-MM-DD')}
            title={isCurrentMonth && getDayTooltip(date)}
          >
            <div
              className={cn(
                'relative h-10 w-[45px] border-b-2 border-t-2 border-transparent',
                {
                  'rounded-r-full border-r-2 border-transparent':
                    (isWeekStart && isCurrentMonth) || date.jDate() === 1,
                  'w-10 rounded-l-full border-l-2 border-transparent':
                    isWeekEnd && isCurrentMonth,
                  'rounded-l-full': date.jDate() === 31,
                  'border-border-brand-disable-300 bg-surface-neutral-primary border-b-2 border-t-2':
                    isInHoverRange && isCurrentMonth,
                  'border-border-brand-disable-300 box-border rounded-l-full border-l-2':
                    isInHoverRange && isWeekEnd && isCurrentMonth,
                  'border-border-brand-disable-300 rounded-r-full border-r-2':
                    isInHoverRange && isWeekStart && isCurrentMonth,
                  'text-text-onbrand-colored-primary-on200_100_50 bg-surface-brand-200':
                    isInRange && isCurrentMonth,
                  '!rounded-l-full border-l-2': isLastDayOfThisJMonth,
                },
              )}
            >
              {isStart && isCurrentMonth && (
                <div
                  className={cn(
                    'border-surface-brand-200 absolute -top-0.5 left-0 mb-1 h-10 w-5',
                    {
                      'bg-surface-brand-200': selection.start && selection.end,
                    },
                  )}
                />
              )}
              {isEnd && isCurrentMonth && (
                <div
                  className={cn(
                    'border-surface-brand-200 absolute -top-0.5 right-0 mb-1 h-10 w-5',
                    {
                      'bg-surface-brand-200': selection.end,
                    },
                  )}
                />
              )}
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
            </div>
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
    return PERSIAN_MONTHS.map((text, index) => {
      // ماهِ کاندید: ابتدای همان ماهِ سالِ نمایشی
      const monthStart = viewDate.clone().jMonth(index).startOf('jMonth');

      const minStart = minDate ? minDate.clone().startOf('jMonth') : null;
      const maxEnd = maxDate ? maxDate.clone().endOf('jMonth') : null;

      const isDisabled =
        (minStart && monthStart.isBefore(minStart)) ||
        (maxEnd && monthStart.isAfter(maxEnd));

      return { text, id: index, isDisabled };
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
        <div
          className={cn('absolute top-[138px] z-50', {
            'right-[172px]': isLeft,
            'left-[96px]': mode === 'range' && !isLeft,
          })}
        >
          <MonthSelect
            calendar="1403-12-10"
            months={months}
            value={currentMonth}
            type="start"
            setCurrentDate={(e) => onMonthChange(parseInt(e))}
          />
        </div>
        <div
          className={cn('absolute top-[138px] z-50', {
            'right-[96px]': isLeft,
            'right-[430px]': mode === 'range' && !isLeft,
          })}
        >
          <YearSelect
            value={currentYear}
            calendar="1403-12-10"
            years={years}
            setCurrentDate={(e) => onYearChange(parseInt(e))}
          />
        </div>
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
  onClose,
  mode = 'single',
  view = 'dual',
  min,
  max,
  defaultValue,
  onChange,
}: PersianDatePickerProps) => {
  const minDate = useMemo(() => parseJalaliDate(min), [min]);
  const maxDate = useMemo(() => parseJalaliDate(max), [max]);
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
        hook.setEndDate(null);
        hook.setFocusedInput('end');
      } else {
        hook.setEndDate(parsed);
      }
    }
  };
  return (
    <div className="bg-surface-neutral-secondary relative h-[570px] min-w-[350px] max-w-[704px] rounded-lg px-6 py-4 font-sans shadow-lg">
      {/* --- Inputs Header --- */}
      <div className={`mb-4 flex items-center justify-center gap-2`}>
        {mode === 'range' && (
          <div>
            <p className="text-text-neutral-primary tex mb-1 text-right text-sm font-medium">
              تاریخ شروع
            </p>
            <DateInput
              onClick={() => hook.setFocusedInput('start')}
              placeholder="تاریخ شروع"
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
              focus={hook.focusedInput === 'start' ? true : false}
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
          <p className="text-text-neutral-primary mb-1 h-[26px] text-right text-sm font-medium">
            {mode === 'single'
              ? 'انتخاب واریز'
              : (hook.focusedInput === 'end' || hook.selection.end) &&
                'تاریخ پایان'}
          </p>
          <DateInput
            onClick={() => {
              if (hook.selection.start) hook.setFocusedInput('end');
            }}
            placeholder="تاریخ پایان"
            min={min}
            max={max}
            focus={
              mode === 'range'
                ? hook.focusedInput === 'end'
                  ? true
                  : false
                : true
            }
            errors={errors}
            errorHandler={(e) =>
              setErrors({ minError: e.minError, maxError: e.maxError })
            }
            ref={endInputRef}
            equalInput={false}
            clearDate={() => {
              hook.setStartDate(null);
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
            errorText={
              errors.minError || errors.maxError
                ? 'تاریخ انتخاب شده مجاز نمیباشد.'
                : ''
            }
            active={
              mode === 'range' ? (hook.selection.start ? true : false) : true
            }
          />
        </div>
      </div>

      {/* --- Calendar Views --- */}
      <div
        className="flex justify-center gap-5"
        onMouseLeave={() => hook.setHoveredDate(null)}
      >
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
              focusInput={hook.focusedInput}
              mode={mode}
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
            focusInput={hook.focusedInput}
            mode={mode}
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
      <div className="absolute bottom-6 left-0 mt-4 flex w-full px-6">
        <div
          className={cn('flex w-full items-center', {
            'justify-end': mode === 'single' || !hook.selectedDaysCount,
            'justify-between': mode === 'range' && hook.selectedDaysCount,
          })}
        >
          {mode === 'range' && hook.selectedDaysCount > 0 && (
            <div className="bg-surface-neutral-primary text-text-neutral-primary rounded-sm px-2 py-1.5 text-sm">
              <span>
                بازه دلخواه:{' '}
                <span className="mr-1 font-medium">
                  {hook.selectedDaysCount > 0 ? hook.selectedDaysCount : ''} روز
                </span>
              </span>
            </div>
          )}
          <Button
            onClick={() => {
              if (onChange) {
                onClose();
                if (hook.isValid) {
                  onChange({
                    start: formatJalaliDate(hook.selection.start),
                    end: formatJalaliDate(hook.selection.end),
                  });
                }
              }
            }}
            size="sm"
            className="w-fit"
            disabled={!hook.isValid}
          >
            {mode === 'range' ? 'اعمال بازه' : 'اعمال'}
          </Button>
        </div>
      </div>
    </div>
  );
};