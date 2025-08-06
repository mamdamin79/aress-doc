'use client';
import moment from 'moment';
import { cn } from '../../../utils';
import { useEffect, useRef, useState } from 'react';
import { CustomDate, DatePickerProps } from './DateInput.types';
import { Icon } from '../Icon';
import { formatDay, formatMonth, formatYear } from './DateInput.utils';
import {
  dayRegex,
  isJalali,
  monthRegex,
  yearRegex,
} from './DateInput.constants';

const isCustomDate = (value: unknown): value is CustomDate => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'day' in value &&
    'month' in value &&
    'year' in value &&
    typeof (value as CustomDate).day === 'number' &&
    typeof (value as CustomDate).month === 'number' &&
    typeof (value as CustomDate).year === 'number'
  );
};
export const DateInput: React.FC<DatePickerProps> = ({
  defaultValue,
  errorHandler,
  focus,
  equalInput,
  placeholder,
  errorText,
  errors,
  onChange,
  clearDate,
  min,
  max,
  active,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  const [minDate, setMinDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });
  const [maxDate, setMaxDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });
  const dayRef = useRef<HTMLInputElement | null>(null);
  const monthRef = useRef<HTMLInputElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);
  const [isArrowKeyPressed, setIsArrowKeyPressed] = useState(false);
  const [activeInput, setActiveInput] = useState(active || false);
  const [focusInput, setFocusInput] = useState(focus || false);

  useEffect(() => {
    if (defaultValue) {
      if (typeof defaultValue?.trim() === 'string') {
        setDay(+defaultValue.slice(8, 10));
        setMonth(+defaultValue.slice(5, 7));
        setYear(+defaultValue.slice(0, 4));
        if (day && month && year) {
          if (max && defaultValue.replace(/-/g, '') > max?.replace(/-/g, '')) {
            errorHandler({ minError: false, maxError: true });
          }
          if (min && defaultValue.replace(/-/g, '') < min?.replace(/-/g, '')) {
            errorHandler({ minError: true, maxError: false });
          }

          onChange(defaultValue);
        }
        dayRef.current?.blur();
      }
    } else {
      setDay(0);
      setMonth(0);
      setYear(0);
    }
  }, [defaultValue]);

  useEffect(() => {
    setActiveInput(!!active);
  }, [active]);

  useEffect(() => {
    if (!focus) {
      setActiveIndex(null);
      dayRef?.current?.blur();
      yearRef.current?.setAttribute('disabled', 'disabled');
    } else {
      yearRef.current?.removeAttribute('disabled');
    }
    setFocusInput(focus);
  }, [focus]);

  // focus day input
  useEffect(() => {
    if (!day) {
      dayRef?.current?.focus();
      setActiveIndex(1);
    }
  }, [day, focus]);

  // set min date
  useEffect(() => {
    if (min) {
      if (isJalali(min).isValid()) {
        if (isJalali(min).month() + 1 > 6) {
          if (isJalali(min).date() > 31) {
            setMinDate({
              day: 31,
              month: isJalali(min).month() + 1,
              year: isJalali(min).year(),
            });
          }
        } else {
          setMinDate({
            day: isJalali(min).date(),
            month: isJalali(min).month() + 1,
            year: isJalali(min).year(),
          });
        }
      }
    }
  }, [min]);

  // set max date
  useEffect(() => {
    if (max) {
      const shamsiDate = isJalali(max);
      if (shamsiDate.isValid()) {
        if (shamsiDate.month() + 1 > 6) {
          if (shamsiDate.date() > 31) {
            setMaxDate({
              day: 31,
              month: shamsiDate.month() + 1,
              year: shamsiDate.year(),
            });
          } else {
            setMaxDate({
              day: shamsiDate.date(),
              month: shamsiDate.month() + 1,
              year: shamsiDate.year(),
            });
          }
        }
        setMaxDate({
          day: shamsiDate.date(),
          month: shamsiDate.month() + 1,
          year: shamsiDate.year(),
        });
      }
    }
  }, [max]);

  let tempMinError = false;
  let tempMaxError = false;

  // Function handler to change the input day value
  const changeDayInput = (e: number, arrowChange?: boolean) => {
    // Validate day input (1-31)
    if (dayRegex.test(String(e))) {
      setDay(e);
    }

    // Check for minimum date constraints
    if (minDate.year && minDate.month && minDate.day) {
      if (
        year + String(month).padStart(2, '0') + String(e).padStart(2, '0') <
        minDate.year +
          String(minDate.month).padStart(2, '0') +
          String(minDate.day).padStart(2, '0')
      ) {
        tempMinError = true;
      } else tempMinError = false;
    }
    // Check for maximum date constraints
    if (maxDate.year && maxDate.month && maxDate.day) {
      if (
        year + String(month).padStart(2, '0') + String(e).padStart(2, '0') >
        maxDate.year +
          String(maxDate.month).padStart(2, '0') +
          String(maxDate.day).padStart(2, '0')
      ) {
        tempMaxError = true;
      } else tempMaxError = false;
    }

    // Handle specific day constraints for Jalali calendar
    if (month) {
      if (month > 6 && e === 31) setDay(30);
      if (month > 6 && month <= 8 && e === 31) setDay(30);
      if (dayRegex.test(String(e)) && day !== 31) {
        setDay(e);
      }
    }

    // Move focus to the next input field when day input is two digits and arrow change occurs
    if (String(e).length === 2 && arrowChange) {
      if (!month) {
        setActiveIndex(2);
        monthRef.current?.focus();
      } else if (!year) {
        setActiveIndex(3);
        yearRef.current?.focus();
      }
    }

    errorHandler({
      minError: tempMinError,
      maxError: tempMaxError,
    });

    // Format and pass the date if year, month, and day are provided
    if (year && month && e) {
      onChange(
        `${String(year).length === 4 && year}-${
          month < 10 ? `0${month}` : month
        }-${e < 10 ? `0${e}` : e}`,
      );
    }
    if (!e) {
      setDay(0);
    }

    // Handle day overflow (e.g., 31st in months with 30 days)
    if ((e === 31 || (e && isCustomDate(e) && e === 31)) && month > 6)
      setDay(30);
  };

  // Function handler to change the input month value
  const changeMonthInput = (e: number, arrowChange?: boolean) => {
    // Validate month input
    if (monthRegex.test(String(e))) {
      setMonth(e);
    }
    // Check for minimum date constraints
    if (minDate.year && minDate.month && minDate.day) {
      if (
        year + String(e).padStart(2, '0') + String(day).padStart(2, '0') <
        minDate.year +
          String(minDate.month).padStart(2, '0') +
          String(minDate.day).padStart(2, '0')
      ) {
        tempMinError = true;
      } else tempMinError = false;
    }
    // Check for maximum date constraints
    if (maxDate.year && maxDate.month && maxDate.day) {
      if (
        year + String(e).padStart(2, '0') + String(day).padStart(2, '0') >
        maxDate.year +
          String(maxDate.month).padStart(2, '0') +
          String(maxDate.day).padStart(2, '0')
      ) {
        tempMaxError = true;
      } else tempMaxError = false;
    }

    // Reset month if no value is provided
    if (!e) {
      setMonth(0);
    }
    errorHandler({
      minError: tempMinError,
      maxError: tempMaxError,
    });

    // Format and pass the date if year, month, and day are provided
    if (year && e && day) {
      onChange(
        `${String(year).length === 4 && year}-${e < 10 ? `0${e}` : e}-${
          day < 10 ? `0${day}` : day
        }`,
      );
    }

    // Move focus to next input field if two-digit month input is entered
    if (String(e).length === 2 && arrowChange) {
      if (!day) {
        setActiveIndex(1);
        dayRef.current?.focus();
      } else if (!year) {
        setActiveIndex(3);
        yearRef.current?.focus();
      }
    }

    // Handle leap year and specific month-day constraints for Jalali calendar
    if (
      String(year).length === 4 &&
      e === 12 &&
      !moment([year]).isLeapYear() &&
      day > 30
    )
      setDay(30);
    if (
      String(year).length === 4 &&
      e === 12 &&
      moment([year]).isLeapYear() &&
      day > 29
    ) {
      setDay(29);
    }
    if (e > 6 && e < 12 && day === 31) setDay(30);
  };

  const changeYearInput = (e: number, arrowChangg?: boolean) => {
    if (yearRegex.test(String(e))) {
      setYear(e);
    }
    // Check for minimum date constraints
    if (minDate.year && minDate.month && minDate.day) {
      if (
        e + String(month).padStart(2, '0') + String(day).padStart(2, '0') <
        minDate.year +
          String(minDate.month).padStart(2, '0') +
          String(minDate.day).padStart(2, '0')
      ) {
        tempMinError = true;
      } else tempMinError = false;
    }
    // Check for maximum date constraints
    if (maxDate.year && maxDate.month && maxDate.day) {
      if (
        year + String(e).padStart(2, '0') + String(day).padStart(2, '0') >
        maxDate.year +
          String(maxDate.month).padStart(2, '0') +
          String(maxDate.day).padStart(2, '0')
      ) {
        tempMaxError = true;
      } else tempMaxError = false;
    }

    // Handle errors related to minimum and maximum date constraints
    errorHandler({
      minError: tempMinError,
      maxError: tempMaxError,
    });

    if (!e) {
      setYear(0);
    }

    // Format and pass the date if year, month, and day are provided
    if (String(e).length === 4 && month && day) {
      onChange(
        `${String(e).length === 4 && e}-${month < 10 ? `0${month}` : month}-${
          day < 10 ? `0${day}` : day
        }`,
      );
    }

    // Move focus to the next input field (month or day) when year input reaches 4 digits
    if (String(e).length === 4 && arrowChangg) {
      if (
        minDate.year &&
        maxDate.year &&
        e >= minDate.year + 1 &&
        e <= maxDate.year + 1
      ) {
        if (!month) {
          setActiveIndex(2);
          monthRef.current?.focus();
          yearRef.current?.blur();
        } else if (!day) {
          setActiveIndex(1);
          dayRef.current?.focus();
          yearRef.current?.blur();
        }
      }
    }

    // Handle leap year and specific month-day constraints for the Jalali calendar
    if (String(e).length === 4 && day === 31 && month && month > 6) setDay(30);
    if (
      String(e).length === 4 &&
      !moment([year]).isLeapYear() &&
      month === 12 &&
      day === 31
    )
      setDay(30);
    if (
      String(e).length === 4 &&
      moment([year]).isLeapYear() &&
      month === 12 &&
      (day === 31 || day === 30)
    )
      setDay(29);
  };

  const keydownHandler = (e: KeyboardEvent) => {
    if (activeIndex && activeIndex) {
      if (e.key === 'ArrowLeft') {
        setIsArrowKeyPressed(false);
        if (activeIndex === 1) {
          setActiveIndex(2);
          monthRef?.current?.focus();
          dayRef?.current?.blur();
        }
        if (activeIndex === 2) {
          setActiveIndex(3);
          yearRef?.current?.focus();
          monthRef?.current?.blur();
        }
      }
      if (e.key === 'ArrowRight') {
        setIsArrowKeyPressed(false);
        if (activeIndex === 2) {
          dayRef?.current?.focus();
          dayRef?.current?.setSelectionRange(2, 2);
          monthRef?.current?.blur();
        }
        if (activeIndex === 3) {
          monthRef?.current?.focus();
          monthRef?.current?.setSelectionRange(2, 2);
          yearRef?.current?.blur();
        }
        if (activeIndex > 1) {
          setActiveIndex(activeIndex - 1);
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeIndex === 3) {
          changeYearInput(year ? year + 1 : 1);
        }
        if (activeIndex === 2) {
          changeMonthInput(
            month ? (month >= 1 && month < 12 ? month + 1 : month) : 1,
          );
        }
        if (activeIndex === 1) {
          changeDayInput(day + 1);
        }
        setIsArrowKeyPressed(false);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeIndex === 1) {
          changeDayInput(day ? (day >= 1 && day <= 31 ? day - 1 : 2) : 0);
          setIsArrowKeyPressed(false);
        }
        if (activeIndex === 3) {
          changeYearInput(year ? year - 1 : 0);
          setIsArrowKeyPressed(false);
        }
        if (activeIndex === 2) {
          changeMonthInput(
            month ? (month >= 1 && month <= 12 ? month - 1 : 0) : 0,
          );
          setIsArrowKeyPressed(false);
        }
      }
    }
  };

  useEffect(() => {
    if (isArrowKeyPressed) {
      return;
    }
    window.addEventListener('keydown', keydownHandler);

    // Clean up the event listener when the component is unmounted or dependencies change
    return () => {
      window.removeEventListener('keydown', keydownHandler);
      document.body.style.overflow = 'scroll';
    };
  }, [isArrowKeyPressed, activeIndex, day, month, year, keydownHandler]);

  const clearInputDate = () => {
    setDay(0);
    setMonth(0);
    setYear(0);
    clearDate();
    setActiveIndex(1);
  };

  return (
    <div>
      <div
        onClick={() => {
          if (active) {
            setFocusInput(true);
            setFocusInput(true);
            if (!activeIndex) setActiveIndex(1);
          }
        }}
        className={cn(
          'bg-surface-neutral-primary border-surface-neutral-primary flex w-40 select-none items-center gap-1 rounded-md border px-4 py-2',
          {
            'border-border-message-error-primary-600':
              day &&
              month &&
              year &&
              focusInput &&
              (errors.minError || equalInput || errors?.maxError),
            'border-border-brand-primary-600':
              focusInput &&
              !errors?.maxError &&
              !errors?.minError &&
              !equalInput,
            'border-border-neutral-secondary':
              year &&
              day &&
              month &&
              !focusInput &&
              !errors.maxError &&
              !errors.minError &&
              !equalInput,
          },
        )}
      >
        {activeInput ? (
          <>
            <input
              disabled={!activeInput}
              onClick={() => {
                if (activeIndex) setActiveIndex(1);
                dayRef?.current?.setSelectionRange(2, 2);
              }}
              ref={dayRef}
              value={formatDay(day)}
              onChange={(e) => changeDayInput(+e.target.value, true)}
              placeholder="روز"
              className={cn(
                'placeholder:text-text-neutral-primary bg-surface-neutral-primary -mx-1 block w-5 border-none pb-0.5 outline-none',
                activeIndex === 1 && focusInput && 'bg-surface-accent-blue-600',
              )}
            />
            /
            <input
              disabled={!activeInput}
              onClick={() => {
                setActiveIndex(2);
                monthRef?.current?.setSelectionRange(2, 2);
              }}
              ref={monthRef}
              value={formatMonth(month)}
              onChange={(e) => changeMonthInput(+e.target.value, true)}
              placeholder="ماه"
              className={cn(
                'placeholder:text-text-neutral-primary bg-surface-neutral-primary -mx-1 block w-5 border-none pb-0.5 outline-none',
                activeIndex === 2 && focusInput && 'bg-surface-accent-blue-600',
              )}
            />
            /
            <input
              disabled={!activeInput}
              onClick={() => {
                setActiveIndex(3);
                yearRef?.current?.setSelectionRange(
                  yearRef?.current?.value.length,
                  yearRef?.current?.value.length,
                );
              }}
              ref={yearRef}
              value={formatYear(year)}
              onChange={(e) => changeYearInput(+e.target.value, true)}
              placeholder="سال"
              className={cn(
                'placeholder:text-text-neutral-primary bg-surface-neutral-primary -mx-1 w-10 border-none pb-0.5 outline-none',
                activeIndex === 3 && focusInput && 'bg-surface-accent-blue-600',
              )}
            />
            {day && month && year ? (
              <div
                onClick={() => {
                  clearInputDate();
                }}
                className="text-text-neutral-primary mr-4 cursor-pointer"
              >
                <Icon name="x" size="lg" />
              </div>
            ) : (
              ''
            )}
          </>
        ) : (
          <span
            onClick={() => {
              if (active === undefined) {
                setActiveInput(true);
                setFocusInput(true);
                setActiveIndex(1);
              }
            }}
            className="text-md select-none py-0.5 text-gray-700"
          >
            {placeholder}
          </span>
        )}
      </div>
      <div
        className={cn('invisible h-[22px]', {
          visible: day && month && year && focusInput,
        })}
      >
        <div className="absolute my-1 text-xs text-red-600">{errorText}</div>
      </div>
    </div>
  );
};
