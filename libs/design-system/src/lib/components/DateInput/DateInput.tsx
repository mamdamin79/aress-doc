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
  duplicateInputError,
  errorHandler,
  focus,
  placeholder,
  minErrorText,
  maxErrorText,
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
const [inputValue, setInputValue] = useState(""); 
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
  const [toggleFlag, setToggleFlag] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      if (typeof defaultValue?.trim() === 'string') {
        if (isJalali(defaultValue).isValid()) {
          const dateJalali = isJalali(defaultValue);
          changeDayInput(dateJalali.date());
          changeMonthInput(dateJalali.month() + 1);
          changeYearInput(dateJalali.year());
          if (day && month && year) {
            if (
              max &&
              defaultValue.replace(/-/g, '') > max?.replace(/-/g, '')
            ) {
              errorHandler({ minError: false, maxError: true });
            }
            if (
              min &&
              defaultValue.replace(/-/g, '') < min?.replace(/-/g, '')
            ) {
              errorHandler({ minError: true, maxError: false });
            }

            onChange(
              `${dateJalali.year()}-${
                dateJalali.month() + 1 < 10
                  ? `0${dateJalali.month() + 1}`
                  : dateJalali.month() + 1
              }-${
                dateJalali.date() < 10
                  ? `0${dateJalali.date()}`
                  : dateJalali.date()
              }`
            );
          }
          dayRef.current?.blur();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

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
          } else
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
  const digits = e.toString().replace(/\D/g, "");
const lastDigit = digits.slice(-1);
let newInput = digits;

// --- اگر عدد قبلی دو رقمی بود و کاربر عدد جدید زده ---
if (Number(inputValue) >= 10 && digits.length === 1) {
  newInput = lastDigit; // عدد جدید جایگزین عدد قبلی می‌شود
}

// اگر عدد جدید به شکل ۱۱، ۱۲، ... و غیره بود و نیاز به leading zero داریم
if (newInput.length === 1) {
  newInput = newInput.padStart(2, "0"); // مثلا 2 -> 02
}

setInputValue(newInput);

const num = Number(newInput);

if (num >= 1 && num <= 30) {
  if (!arrowChange && num > 3) {
    dayRef.current?.blur();
    monthRef.current?.focus();
    setActiveIndex(2);
  }
  setDay(num);
} else {
  // fallback اگر کاربر عدد نامعتبر زد
  const lastOne = lastDigit;
  setInputValue(lastOne);
  const n = Number(lastOne);
  if (n >= 1 && n <= 9) {
    setDay(n);
    if (!arrowChange && n > 3) {
      dayRef.current?.blur();
      monthRef.current?.focus();
      setActiveIndex(2);
    }
  } else {
    setDay(0);
  }
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
        }-${e < 10 ? `0${e}` : e}`
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

  const digits = e.toString().replace(/\D/g, "");
  const lastDigit = digits.slice(-1);
  let lastTwo = digits.slice(-2);

  if (inputValue === "11" && lastDigit === "1" && !toggleFlag) {
    lastTwo = "01";
    setToggleFlag(true);  // دفعه بعد toggle نده
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
        }      setMonth(num);
    } else {
      const lastOne = digits.slice(-1);
      setInputValue(lastOne);
      const n = Number(lastOne);
      console.log(n);
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
        }`
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

  // Function handler to change the input year value
  const changeYearInput = (e: number, arrowChangg?: boolean) => {
const digits = e.toString().replace(/\D/g, "");
const lastDigit = digits.slice(-1);

const currentYear = inputValue.padStart(4, "0"); // همیشه ۴ رقمی

// shift کردن ارقام به چپ و قرار دادن رقم جدید در آخر
const newYear = currentYear.slice(1) + lastDigit;

if (!arrowChangg){

  setInputValue(newYear);
  setYear(Number(newYear));
} else {
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
        e + String(month).padStart(2, '0') + String(day).padStart(2, '0') >
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
        }`
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          dayRef?.current?.setSelectionRange(0, 2);
          monthRef?.current?.blur();
        }
        if (activeIndex === 3) {
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
            month ? (month >= 1 && month < 12 ? month + 1 : month) : 1
          , true);
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
            month ? (month >= 1 && month <= 12 ? month - 1 : 0) : 0, true
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

  useEffect(() => {
    if (!focus) setActiveIndex(null);
  }, [focus]);

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
        className={cn(
          'w-40 rounded-md bg-white border-2 flex items-center gap-1 py-2 px-4',
          {
            'border-red-600':
              (day && month && year && errors.minError) ||
              errors?.maxError ||
              duplicateInputError,
            'border-brand-600':
              activeIndex &&
              focus &&
              !errors?.maxError &&
              !errors?.minError &&
              !duplicateInputError,
            'border-gray-500':
              year &&
              day &&
              month &&
              !focus &&
              !errors.maxError &&
              !errors.minError &&
              !duplicateInputError,
          }
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
              onChange={(e) => changeDayInput(+e.target.value)}
              placeholder="روز"
              className={cn(
                'w-5 outline-none border-none pb-0.5 -mx-1 placeholder:text-black block',
                activeIndex === 1 && activeIndex && 'bg-blue-200'
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
              onChange={(e) => changeMonthInput(+e.target.value, false)}
              placeholder="ماه"
              className={cn(
                'w-5 outline-none border-none pb-0.5 -mx-1 placeholder:text-black block',
                activeIndex === 2 && activeIndex && 'bg-blue-200'
              )}
            />
            /
            <input
              disabled={!activeInput}
              onClick={() => {
                setActiveIndex(3);
                yearRef?.current?.setSelectionRange(
                  yearRef?.current?.value.length,
                  yearRef?.current?.value.length
                );
              }}
              ref={yearRef}
              value={formatYear(year)}
              onChange={(e) => changeYearInput(+e.target.value)}
              placeholder="سال"
              className={cn(
                'w-10 outline-none border-none pb-0.5 -mx-1 placeholder:text-black block',
                activeIndex === 3 && activeIndex && 'bg-blue-200'
              )}
            />
            {day && month && year ? (
              <div
                onClick={() => {
                  clearInputDate();
                }}
                className="cursor-pointer mr-4"
              >
                <Icon name="x" size="lg" />
              </div>
            ) : (
              ''
            )}
          </>
        ) : (
          <span
            onClick={() => active === undefined && setActiveInput(true)}
            className="text-md text-gray-700 select-none"
          >
            {placeholder}
          </span>
        )}
      </div>
      <div>
        {errors?.minError && day && year && month ? (
          <div className="text-red-600 text-xs">{minErrorText}</div>
        ) : (
          ''
        )}
        {errors?.maxError && day && year && month ? (
          <div className="text-red-600 text-xs">{maxErrorText}</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
