'use client'
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import moment from 'moment-jalaali';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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
  min?: string; // Format: "YYYY/MM/DD" e.g., "1400/03/13"
  max?: string; // Format: "YYYY/MM/DD" e.g., "1404/12/10"
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
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
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
  // --- STATE MANAGEMENT ---
  const [selection, setSelection] = useState<Selection>(initialSelection);
  const [hoveredDate, setHoveredDate] = useState<JalaliDate | null>(null);
  const [focusedInput, setFocusedInput] = useState<'start' | 'end'>('start');

  // `viewDates` controls which month(s) are displayed in the calendar UI.
  const [viewDates, setViewDates] = useState<{ left: JalaliDate; right: JalaliDate | null }>({
    left: (initialSelection.start || moment()).clone(),
    right: view === 'dual' ? (initialSelection.start || moment()).clone().add(1, 'jMonth') : null,
  });

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
  const isDateDisabled = useCallback((date: JalaliDate): boolean => {
    if (minDate && date.isBefore(minDate, 'day')) return true;
    if (maxDate && date.isAfter(maxDate, 'day')) return true;
    return false;
  }, [minDate, maxDate]);

  // --- DATE SELECTION LOGIC ---

  /**
   * The core logic for handling a day click in the calendar.
   * @param day The moment object for the clicked day.
   */
  const handleDayClick = useCallback((day: JalaliDate) => {
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
    } else { // focusedInput === 'end'
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
  }, [selection, focusedInput, isDateDisabled, mode]);
  
  // --- EXTERNAL SETTERS & INPUT HANDLERS ---
  
  const setStartDate = useCallback((date: JalaliDate | null) => {
      if (date && isDateDisabled(date)) return;
      if (!date) {
          setSelection({ start: null, end: null });
      } else {
          setSelection(prev => ({ ...prev, start: date }));
      }
  }, [isDateDisabled]);

  const setEndDate = useCallback((date: JalaliDate | null) => {
      if (date && isDateDisabled(date)) return;
      setSelection(prev => ({ ...prev, end: date }));
  }, [isDateDisabled]);


  // --- CALENDAR VIEW & NAVIGATION LOGIC ---

  /**
   * Generates the array of days for a given month view.
   * @param dateForMonth The month to generate the calendar for.
   * @returns An array of objects representing days.
   */
  const getCalendarDays = useCallback((dateForMonth: JalaliDate) => {
    const monthStart = dateForMonth.clone().startOf('jMonth');
    const monthEnd = dateForMonth.clone().endOf('jMonth');
    const startDate = monthStart.clone().startOf('week');
    const endDate = monthEnd.clone().endOf('week');

    const calendarDays = [];
    const day = startDate.clone();

    while (day.isSameOrBefore(endDate)) {
      calendarDays.push({
        date: day.clone(),
        isCurrentMonth: day.isSame(dateForMonth),
      });
      day.add(1, 'day');
    }
    return calendarDays;
  }, []);

  const leftCalendarDays = useMemo(() => getCalendarDays(viewDates.left), [viewDates.left, getCalendarDays]);
  const rightCalendarDays = useMemo(() => (viewDates.right && isDualViewPossible) ? getCalendarDays(viewDates.right) : [], [viewDates.right, getCalendarDays, isDualViewPossible]);

  const goToNextMonth = useCallback(() => {
    setViewDates(current => {
      const newLeft = current.left.clone().add(1, 'jMonth');
      if (maxDate && newLeft.isAfter(maxDate)) {
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
    setViewDates(current => {
      const newLeft = current.left.clone().subtract(1, 'jMonth');
      if (minDate && newLeft.isBefore(minDate)) {
        return current; // Don't go past min date
      }
      const newRight = current.right ? newLeft.clone().add(1, 'jMonth') : null;
      return { left: newLeft, right: newRight };
    });
  }, [minDate]);

  const setViewMonth = useCallback((side: 'left' | 'right', monthIndex: number) => {
      setViewDates(current => {
          const newDates = {...current};
          const targetDate = (side === 'left' ? newDates.left : newDates.right)?.clone().jMonth(monthIndex);

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
          } else { // side === 'right'
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
  }, [minDate, maxDate]);
  
  const setViewYear = useCallback((side: 'left' | 'right', year: number) => {
      setViewDates(current => {
          const newDates = {...current};
          const targetDate = (side === 'left' ? newDates.left : newDates.right)?.clone().jYear(year);

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
  const getDayTooltip = useCallback((date: JalaliDate): string => {
    if (mode === 'single') return '';
    const { start, end } = selection;

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
    return '';
  }, [selection, focusedInput, mode]);
  
  /**
   * Checks if a day is part of the selected range (between start and end).
   * @param day The day to check.
   * @returns True if the day is in the selected range.
   */
  const isDateInRange = useCallback((day: JalaliDate): boolean => {
    if (mode !== 'range' || !selection.start || !selection.end) return false;
    return day.isBetween(selection.start, selection.end, 'day', '()');
  }, [selection, mode]);
  
  /**
   * Checks if a day is part of the currently hovered range preview.
   * @param day The day to check.
   * @returns True if the day is in the hovered range.
   */
  const isDateInHoverRange = useCallback((day: JalaliDate): boolean => {
    if (mode !== 'range' || !selection.start || selection.end || !hoveredDate) return false;
    const start = selection.start;
    if (hoveredDate.isBefore(start)) return false;
    return day.isBetween(start, hoveredDate, 'day', '()');
  }, [selection, hoveredDate, mode]);

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
 * A mock DateInput component as requested.
 */
const DateInput = React.forwardRef<HTMLInputElement, { value: string; onChange: (value: string) => void; onFocus: () => void; placeholder: string; hasError?: boolean }>(
  ({ value, onChange, onFocus, placeholder, hasError }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className={`w-full p-2 border rounded-md text-center transition-colors ${hasError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
        />
        {value && (
          <button onClick={() => onChange('')} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        )}
      </div>
    );
  }
);
DateInput.displayName = "DateInput";


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
      {PERSIAN_WEEKDAYS_SHORT.map(day => (
        <div key={day} className="font-semibold text-gray-500 text-sm">{day}</div>
      ))}
      {calendarDays.map(({ date, isCurrentMonth }) => {
        const isDisabled = !isCurrentMonth || isDateDisabled(date);
        const isStart = selection.start?.isSame(date, 'day');
        const isEnd = selection.end?.isSame(date, 'day');
        const isInRange = isDateInRange(date);
        const isInHoverRange = isDateInHoverRange(date);
        const tooltipText = getDayTooltip(date);

        const dayClasses = [
          'relative w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150',
          isDisabled ? 'text-gray-300' : 'cursor-pointer',
          isCurrentMonth ? 'text-gray-800' : 'text-gray-400',
          !isDisabled && (isStart || isEnd) ? 'bg-blue-600 text-white font-bold' : '',
          !isDisabled && !(isStart || isEnd) && isInRange ? 'bg-blue-100' : '',
          !isDisabled && !(isStart || isEnd) && !isInRange && isInHoverRange ? 'bg-blue-50' : '',
          !isDisabled && !isStart && !isEnd ? 'hover:bg-gray-200' : '',
          isStart ? 'rounded-r-none' : '',
          isEnd ? 'rounded-l-none' : '',
        ].filter(Boolean).join(' ');
        
        return (
          <div key={date.format()} className={`flex items-center justify-center ${(isStart && isEnd) ? '' : isStart ? 'bg-blue-100 rounded-l-full' : isEnd ? 'bg-blue-100 rounded-r-full' : isInRange ? 'bg-blue-100' : ''}`}>
            <button
              type="button"
              onClick={() =>  onDayClick(date)}
              onMouseEnter={() => onDayHover(date)}
              // disabled={isDisabled}
              className={dayClasses}
              data-tooltip={tooltipText}
            >
              {date.jDate()}
              {tooltipText && <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">{tooltipText}</span>}
            </button>
          </div>
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
            const isDisabled = (minDate && monthDate.isBefore(minDate, 'jMonth')) || (maxDate && monthDate.isAfter(maxDate, 'jMonth'));
            return { name, index, isDisabled };
        });
    }, [viewDate, minDate, maxDate]);

    const canGoPrev = !minDate || viewDate.clone().subtract(1, 'jMonth').isSameOrAfter(minDate, 'jMonth');
    const canGoNext = !maxDate || viewDate.clone().add(1, 'jMonth').isSameOrBefore(maxDate, 'jMonth');

    return (
        <div className="flex items-center justify-between px-2 py-2">
            {isLeft && (
                <button onClick={onPrev} disabled={!canGoPrev} className="p-1 rounded-full hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed">
                    <ChevronLeft size={20} />
                </button>
            )}
            <div className="flex items-center gap-2">
                <select value={currentMonth} onChange={e => onMonthChange(parseInt(e.target.value))} className="p-1 border-none bg-transparent rounded-md focus:ring-0">
                    {months.map(month => (
                        <option key={month.index} value={month.index} disabled={month.isDisabled}>{month.name}</option>
                    ))}
                </select>
                <select value={currentYear} onChange={e => onYearChange(parseInt(e.target.value))} className="p-1 border-none bg-transparent rounded-md focus:ring-0">
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            {!isLeft && (
                <button onClick={onNext} disabled={!canGoNext} className="p-1 rounded-full hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed">
                    <ChevronRight size={20} />
                </button>
            )}
        </div>
    );
};


// --- THE MAIN COMPONENT: PersianDatePicker ---

const PersianDatePicker = ({
  mode = 'single',
  view = 'dual',
  min,
  max,
  defaultValue,
  onChange,
}: PersianDatePickerProps) => {

  const minDate = useMemo(() => parseJalaliDate(min), [min]);
  const maxDate = useMemo(() => parseJalaliDate(max), [max]);
  const initialSelection = useMemo(() => ({
    start: parseJalaliDate(defaultValue?.start),
    end: mode === 'range' ? parseJalaliDate(defaultValue?.end) : null,
  }), [defaultValue, mode]);

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
          if (parsed && hook.selection.start && parsed.isBefore(hook.selection.start)) {
              hook.setStartDate(parsed);
              hook.setEndDate(null);
              hook.setFocusedInput('end');
          } else {
              hook.setEndDate(parsed);
          }
      }
  };


  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-fit font-sans" onMouseLeave={() => hook.setHoveredDate(null)}>
      {/* --- Inputs Header --- */}
      <div className={`flex gap-4 mb-4 ${mode === 'single' ? 'justify-center' : 'justify-between'}`}>
        {mode === 'range' && (
          <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1 text-right">تاریخ شروع</p>
              <DateInput
                  ref={startInputRef}
                  value={formatJalaliDate(hook.selection.start) || ''}
                  onChange={handleStartDateChange}
                  onFocus={() => hook.setFocusedInput('start')}
                  placeholder="روز/ماه/سال"
              />
          </div>
        )}
        <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1 text-right">{mode === 'single' ? 'تاریخ' : 'تاریخ پایان'}</p>
            <DateInput
                ref={endInputRef}
                value={formatJalaliDate(mode === 'single' ? hook.selection.start : hook.selection.end) || ''}
                onChange={mode === 'single' ? (v) => hook.setStartDate(parseJalaliDate(v)) : handleEndDateChange}
                onFocus={() => hook.setFocusedInput(mode === 'single' ? 'start' : 'end')}
                placeholder="روز/ماه/سال"
            />
        </div>
      </div>

      {/* --- Calendar Views --- */}
      <div className="flex gap-8 justify-center">
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
                    isLeft={true}
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

        {/* Right or Single Calendar */}
        <div className="flex-1">
             <CalendarControls
                viewDate={hook.isDualViewPossible && mode === 'range' ? hook.viewDates.right : hook.viewDates.left}
                onPrev={hook.goToPrevMonth} // This will be hidden
                onNext={hook.goToNextMonth}
                onMonthChange={(m) => hook.setViewMonth(hook.isDualViewPossible && mode === 'range' ? 'right' : 'left', m)}
                onYearChange={(y) => hook.setViewYear(hook.isDualViewPossible && mode === 'range' ? 'right' : 'left', y)}
                minDate={hook.minDate}
                maxDate={hook.maxDate}
                isLeft={false}
            />
            <CalendarView
                calendarDays={hook.isDualViewPossible && mode === 'range' ? hook.rightCalendarDays : hook.leftCalendarDays}
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
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
          <button 
            className="px-6 py-2 bg-teal-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!hook.isValid}
          >
            اعمال بازه
          </button>
      </div>
    </div>
  );
};


// --- EXAMPLE USAGE ---

export function App() {
  const [rangeSelection, setRangeSelection] = useState({ start: '1403/05/10', end: '1403/05/20' });
  const [singleSelection, setSingleSelection] = useState({ start: '1403/02/15', end: null });

  const handleRangeChange = (selection) => {
    console.log("Range changed:", selection);
    setRangeSelection(selection);
  };
  
  const handleSingleChange = (selection) => {
    console.log("Single date changed:", selection);
    setSingleSelection(selection);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex flex-col items-center gap-12">
      <div className="flex flex-wrap justify-center items-start gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Range Selection Mode</h2>
          <PersianDatePicker
            mode="range"
            view="dual"
            min="1403/01/05"
            max="1404/12/20"
            defaultValue={rangeSelection}
            onChange={handleRangeChange}
          />
          <div className="mt-4 p-4 bg-white rounded-md shadow-sm text-sm text-gray-700">
            <p><strong>Selected Start:</strong> {rangeSelection.start || 'None'}</p>
            <p><strong>Selected End:</strong> {rangeSelection.end || 'None'}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Single Selection Mode</h2>
          <PersianDatePicker
            mode="single"
            min="1403/02/01"
            max="1404/03/25"
            defaultValue={singleSelection}
            onChange={handleSingleChange}
          />
           <div className="mt-4 p-4 bg-white rounded-md shadow-sm text-sm text-gray-700">
            <p><strong>Selected Date:</strong> {singleSelection.start || 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
