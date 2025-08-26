'use client';
import moment from 'moment';
import { cn } from '../../../utils';
import { useEffect, useRef, useState } from 'react';
import { CustomDate, DatePickerProps } from './DateInput.types';
import { Icon } from '../Icon';
import { formatDay, formatMonth, formatYear } from './DateInput.utils';
import { isJalali, isMiladi } from './DateInput.constants';
import { Dialog } from '@headlessui/react';

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
  onClick,
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
  const [inputValue, setInputValue] = useState('');
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
  const [toggleFlag, setToggleFlag] = useState(false);
  const [yearFocus, setYearFocus] = useState(false);
  const [dayFocus, setDayFocus] = useState(false);
  const [monthFocus, setMonthFocus] = useState(false);

  useEffect(() => {
    if (typeof defaultValue !== 'string' || defaultValue.trim() === '') {
      setDay(0);
      setMonth(0);
      setYear(0);
      return;
    }
    if (defaultValue) {
      if (typeof defaultValue?.trim() === 'string') {
        if (isJalali(defaultValue).isValid()) {
          const dateJalali = isJalali(defaultValue);
          const dateMiladi = isMiladi(defaultValue);
          changeDayInput(dateJalali.date(), true);
          changeMonthInput(dateJalali.month() + 1, true);
          changeYearInput(dateJalali.year(), true);
          if (day && month && year) {
            if (
              max &&
              +defaultValue.replace(/[-/]/g, '') > +max?.replace(/[-/]/g, '')
            ) {
              errorHandler({ minError: false, maxError: true });
            }
            if (
              min &&
              +defaultValue.replace(/[-/]/g, '') < +min?.replace(/[-/]/g, '')
            ) {
              errorHandler({ minError: true, maxError: false });
            }

            onChange(
              `${dateMiladi.year()}/${
                dateMiladi.month() + 1 < 10
                  ? `0${dateMiladi.month() + 1}`
                  : dateMiladi.month() + 1
              }/${
                dateMiladi.date() < 10
                  ? `0${dateMiladi.date()}`
                  : dateMiladi.date()
              }`,
            );
          }
          dayRef.current?.blur();
        }
      } else {
        setDay(0);
        setMonth(0);
        setYear(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    setActiveInput(!!active);
  }, [active]);

  useEffect(() => {
    if (!focus) {
      setActiveIndex(null);
    } else {
      setActiveIndex(1);
    }
    setFocusInput(focus);
  }, [focus]);

  // focus day input
  useEffect(() => {
    if (!day) {
      dayRef?.current?.focus();
      setActiveIndex(1);
    }
  }, [day]);

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
    const digits = e.toString().replace(/\D/g, ''); // Remove all non-digit characters
    const lastDigit = digits.slice(-1); // Get the last digit
    let newInput = digits;

    if (!arrowChange) {
      if (!dayFocus) {
        setDayFocus(true); // Set focus on day input
        setDay(+e.toString().slice(-1)); // Set day to the last entered digit
        if (+e.toString().slice(-1) > 3) {
          dayRef.current?.blur(); // Blur day input
          monthRef.current?.focus(); // Move focus to month input
          setActiveIndex(2); // Update active input index
        }
      } else {
        // --- If the previous value was two digits and user entered a new number ---
        if (Number(inputValue) >= 10 && digits.length === 1) {
          newInput = lastDigit; // Replace previous number with new one
        }

        // Add leading zero if needed (e.g., 2 -> 02)
        if (newInput.length === 1) {
          newInput = newInput.padStart(2, '0');
        }

        setInputValue(newInput);

        const num = Number(newInput);

        if (num >= 1 && num <= 30) {
          if (num > 3) {
            dayRef.current?.blur();
            monthRef.current?.focus();
            setActiveIndex(2);
          }
          setDay(num);
        } else {
          // Fallback for invalid input
          const lastOne = lastDigit;
          setInputValue(lastOne);
          const n = Number(lastOne);
          if (n >= 1 && n <= 9) {
            setDay(n);
            if (n > 3) {
              dayRef.current?.blur();
              monthRef.current?.focus();
              setActiveIndex(2);
            }
          } else {
            setDay(0);
          }
        }
      }
    } else {
      if (e <= 31) {
        setDay(e); // Directly set day if arrowChange is true
      }
    }

    // Check minimum date constraint
    if (minDate.year && minDate.month && minDate.day) {
      if (
        +(year + String(month).padStart(2, '0') + String(e).padStart(2, '0')) <
        +(
          minDate.year +
          String(minDate.month).padStart(2, '0') +
          String(minDate.day).padStart(2, '0')
        )
      ) {
        tempMinError = true;
      } else tempMinError = false;
    }

    // Check maximum date constraint
    if (maxDate.year && maxDate.month && maxDate.day) {
      if (
        +(year + String(month).padStart(2, '0') + String(e).padStart(2, '0')) >
        +(
          maxDate.year +
          String(maxDate.month).padStart(2, '0') +
          String(maxDate.day).padStart(2, '0')
        )
      ) {
        tempMaxError = true;
      } else tempMaxError = false;
    }

    // Move focus to next input if day input has 2 digits and arrow change
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

    const num = Number(newInput);

    // Format and emit the full date if all fields are filled
    if (year && month && e) {
      if (!arrowChange) {
        onChange(
          `${String(year).length === 4 && year}/${month < 10 ? `0${month}` : month}/${
            !dayFocus
              ? +e.toString().slice(-1) < 10
                ? `0${+e.toString().slice(-1)}`
                : +e.toString().slice(-1)
              : num > 0 && num <= 31
                ? +e < 10
                  ? `0${e}`
                  : e
                : +lastDigit >= 1 &&
                  +lastDigit <= 9 &&
                  (+lastDigit < 10 ? `0${lastDigit}` : lastDigit)
          }`,
        );
      } else {
        onChange(
          `${String(year).length === 4 && year}/${month < 10 ? `0${month}` : month}/${+e < 10 ? `0${e}` : e}`,
        );
      }
    }

    if (!e) {
      setDay(0);
    }

    // Handle day overflow for months with less than 31 days
    if ((e === 31 || (e && isCustomDate(e) && e === 31)) && month > 6) {
      setDay(30);
    }
  };

  // Function handler to change the input month value
  const changeMonthInput = (e: number, arrowChange?: boolean) => {
    const digits = e.toString().replace(/\D/g, '');
    const lastDigit = digits.slice(-1);
    let lastTwo = digits.slice(-2);

    if (!arrowChange) {
      if (!monthFocus) {
        setMonthFocus(true);
        setMonth(+e.toString().slice(-1));
        if (+e.toString().slice(-1) > 1) {
          monthRef.current?.blur();
          yearRef.current?.focus();
          setActiveIndex(3);
        }
      } else {
        if (inputValue === '11' && lastDigit === '1' && !toggleFlag) {
          lastTwo = '01';
          setToggleFlag(true); // دفعه بعد toggle نده
        } else {
          setToggleFlag(false); // هر ورودی جدید reset toggle
        }

        setInputValue(lastTwo);

        if (lastTwo.length === 0) {
          setMonth(0);
        } else {
          const num = Number(lastTwo);
          if (num >= 1 && num <= 12) {
            setMonth(num);
          } else {
            const lastOne = digits.slice(-1);
            setInputValue(lastOne);
            const n = Number(lastOne);
            if (n >= 1 && n <= 9) {
              setMonth(n);
            } else {
              setMonth(0);
            }
          }
        }

        setInputValue(lastTwo);

        if (lastTwo.length === 0) {
          setMonth(0);
        } else {
          const num = Number(lastTwo);

          if (num >= 1 && num <= 12) {
            if (!arrowChange && num > 1) {
              monthRef.current?.blur();
              yearRef.current?.focus();
              setActiveIndex(3);
            }
            setMonth(num);
          } else {
            const lastOne = digits.slice(-1);
            setInputValue(lastOne);
            const n = Number(lastOne);
            if (n >= 1 && n <= 9) {
              setMonth(n);
              if (!arrowChange && n > 1) {
                monthRef.current?.blur();
                yearRef.current?.focus();
                setActiveIndex(3);
              }
            } else {
              setMonth(0);
            }
          }
        }
      }
    } else setMonth(e);

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

    const num = +digits;

    // Format and pass the date if year, month, and day are provided
    if (year && e && day) {
      if (arrowChange) {
        onChange(
          `${String(year).length === 4 && year}/${e < 10 ? `0${e}` : e}/${
            day < 10 ? `0${day}` : day
          }`,
        );
      } else {
        onChange(
          `${String(year).length === 4 && year}/${
            !monthFocus
              ? +e.toString().slice(-1) < 10
                ? `0${e.toString().slice(-1)}`
                : e.toString().slice(-1)
              : num > 0 && num <= 12
                ? e < 10
                  ? `0${e}`
                  : e
                : +lastDigit >= 1 && +lastDigit <= 12 && +lastDigit < 10
                  ? `0${lastDigit}`
                  : lastDigit
          }/${day < 10 ? `0${day}` : day}`,
        );
      }
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

  // Function handler to change the input year value
  const changeYearInput = (e: number, arrowChangg?: boolean) => {
    let dijital = e;
    if (!arrowChangg) {
      const str = e.toString();

      const minYearStr = minDate.year.toString();
      const maxYearStr = maxDate.year.toString();

      if (!yearFocus) {
        setYearFocus(true);
        setYear(parseInt(e.toString().slice(-1)));
      } else {
        if (str.length === 2) {
          const firstTwo = parseInt(str);
          if (
            firstTwo >= +minYearStr.slice(0, 2) &&
            firstTwo <= +maxYearStr.slice(0, 2)
          ) {
            setYear(parseInt(str)); // فقط همین عدد 55
          } else {
            const newYear = parseInt(minYearStr.slice(0, 2) + str);
            dijital = newYear;
            setYear(newYear);
          }
        } else setYear(+str.slice(-4));
      }
    } else setYear(e);

    // Check for minimum date constraints
    if (minDate.year && minDate.month && minDate.day) {
      if (
        +(
          dijital +
          String(month).padStart(2, '0') +
          String(day).padStart(2, '0')
        ) <
        +(
          minDate.year +
          String(minDate.month).padStart(2, '0') +
          String(minDate.day).padStart(2, '0')
        )
      ) {
        tempMinError = true;
      } else tempMinError = false;
    }
    // Check for maximum date constraints
    if (maxDate.year && maxDate.month && maxDate.day) {
      if (
        +(
          dijital +
          String(month).padStart(2, '0') +
          String(day).padStart(2, '0')
        ) >
        +(
          maxDate.year +
          String(maxDate.month).padStart(2, '0') +
          String(maxDate.day).padStart(2, '0')
        )
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
    if (String(dijital).length && month && day) {
      if (arrowChangg) {
        onChange(
          `${String(e).length === 4 && dijital}/${month < 10 ? `0${month}` : month}/${
            day < 10 ? `0${day}` : day
          }`,
        );
      } else {
        onChange(
          `${String(e).length > 4 ? dijital.toString().slice(-4) : dijital.toString().length === 4 ? dijital : ''}/${month < 10 ? `0${month}` : month}/${
            day < 10 ? `0${day}` : day
          }`,
        );
      }
    }

    // Move focus to the next input field (month or day) when year input reaches 4 digits
    if (String(dijital).length === 4 && arrowChangg) {
      if (
        minDate.year &&
        maxDate.year &&
        dijital >= minDate.year + 1 &&
        dijital <= maxDate.year + 1
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
    if (String(dijital).length === 4 && day === 31 && month && month > 6)
      setDay(30);
    if (
      String(Dialog).length === 4 &&
      !moment([year]).isLeapYear() &&
      month === 12 &&
      day === 31
    )
      setDay(30);
    if (
      String(dijital).length === 4 &&
      moment([year]).isLeapYear() &&
      month === 12 &&
      (day === 31 || day === 30)
    )
      setDay(29);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const keydownHandler = (e: KeyboardEvent) => {
    if (activeIndex && activeIndex) {
      if (e.key === 'ArrowLeft') {
        setIsArrowKeyPressed(false);
        if (activeIndex === 1) {
          setDayFocus(false);
          setActiveIndex(2);
          monthRef?.current?.focus();
          dayRef?.current?.blur();
        }
        if (activeIndex === 2) {
          setMonthFocus(false);
          setActiveIndex(3);
          yearRef?.current?.focus();
          monthRef?.current?.blur();
        }
      }
      if (e.key === 'ArrowRight') {
        setIsArrowKeyPressed(false);
        if (activeIndex === 2) {
          setMonthFocus(false);
          dayRef?.current?.focus();
          dayRef?.current?.setSelectionRange(0, 2);
          monthRef?.current?.blur();
        }
        if (activeIndex === 3) {
          setYearFocus(false);
          monthRef?.current?.focus();
          monthRef?.current?.setSelectionRange(0, 2);
          yearRef?.current?.blur();
        }
        if (activeIndex > 1) {
          setActiveIndex(activeIndex - 1);
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeIndex === 3) {
          changeYearInput(year ? year + 1 : 1, true);
        }
        if (activeIndex === 2) {
          changeMonthInput(
            month ? (month >= 1 && month < 12 ? month + 1 : month) : 1,
            true,
          );
        }
        if (activeIndex === 1) {
          changeDayInput(day + 1, true);
        }
        setIsArrowKeyPressed(false);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeIndex === 1) {
          changeDayInput(day ? (day >= 1 && day <= 31 ? day - 1 : 2) : 0, true);
          setIsArrowKeyPressed(false);
        }
        if (activeIndex === 3) {
          changeYearInput(year ? year - 1 : 0, true);
          setIsArrowKeyPressed(false);
        }
        if (activeIndex === 2) {
          changeMonthInput(
            month ? (month >= 1 && month <= 12 ? month - 1 : 0) : 0,
            true,
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
    <div className="select-none relative" onClick={onClick}>
      {
        !focus &&
        <div 
        onClick={onClick}
        className='absolute right-0 top-0 w-[80%] h-[65%]'></div>
      }
      <div
        className={cn(
          'border-brand-600 bg-surface-neutral-primary flex h-[46px] w-40 select-none items-center gap-1 rounded-md border-2 px-4 py-2',
          {
            'border-border-message-error-primary-600':
              (day && month && year && errors?.minError) || errors?.maxError,
            'border-border-brand-primary-600':
              focus && active && !errors?.maxError && !errors?.minError,
            'border-border-neutral-secondary':
              activeInput &&
              year &&
              day &&
              month &&
              !focusInput &&
              !errors.maxError &&
              !errors.minError,
          },
        )}
      >
        {activeInput ? (
          <>
            <input
              disabled={!activeInput || !focus}
              onClick={() => {
                if (focus) {
                  setMonthFocus(false);
                  setYearFocus(false);
                  if (activeIndex) setActiveIndex(1);
                  dayRef?.current?.setSelectionRange(2, 2);
                }
              }}
              ref={dayRef}
              value={formatDay(day)}
              onChange={(e) => changeDayInput(+e.target.value)}
              placeholder="روز"
              className={cn(
                'placeholder:text-text-neutral-primary disabled:bg-surface-neutral-primary -mx-1 block w-5 select-none border-none pb-0.5 outline-none',
                activeIndex === 1 &&
                  activeIndex &&
                  focus &&
                  'bg-coloropacity-surface-accent-blue-600-20per',
              )}
            />
            /
            <input
              disabled={!activeInput || !focus}
              onClick={() => {
                if (focus) {
                  setDayFocus(false);
                  setYearFocus(false);
                  setActiveIndex(2);
                  monthRef?.current?.setSelectionRange(2, 2);
                }
              }}
              ref={monthRef}
              value={formatMonth(month)}
              onChange={(e) => changeMonthInput(+e.target.value, false)}
              placeholder="ماه"
              className={cn(
                'placeholder:text-text-neutral-primary disabled:bg-surface-neutral-primary -mx-1 block w-5 select-none border-none pb-0.5 outline-none',
                activeIndex === 2 &&
                  activeIndex &&
                  'bg-coloropacity-surface-accent-blue-600-20per',
              )}
            />
            /
            <input
              disabled={!activeInput || !focus}
              onClick={() => {
                if (focus) {
                  setDayFocus(false);
                  setMonthFocus(false);
                  setActiveIndex(3);
                  yearRef?.current?.setSelectionRange(
                    yearRef?.current?.value.length,
                    yearRef?.current?.value.length,
                  );
                }
              }}
              ref={yearRef}
              value={formatYear(year)}
              onChange={(e) => changeYearInput(+e.target.value)}
              placeholder="سال"
              className={cn(
                'placeholder:text-text-neutral-primary disabled:bg-surface-neutral-primary -mx-1 block w-10 select-none border-none pb-0.5 outline-none',
                activeIndex === 3 &&
                  activeIndex &&
                  'bg-coloropacity-surface-accent-blue-600-20per',
              )}
            />
            {day && month && year ? (
              <div
                onClick={() => {
                  clearInputDate();
                }}
                className="mr-4 cursor-pointer"
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
