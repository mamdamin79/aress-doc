import moment from 'moment';
import { cn } from '../../../utils';
import { useEffect, useRef, useState } from 'react';
import { CustomDate } from './DateInput.types';

interface Props {
  defaultValue?: string | Date | CustomDate;
  onChange: (value: string | Date) => void;
  mode: 'jalali' | 'miladi';
  min?: string;
  active: boolean;
  focus: boolean;
  invalidStartDate: string;
  invalidEndDate: string;
  mosaviDate: string;
  errors: {
    minError: boolean;
    maxError: boolean;
  };
  placeholder: string;
  max?: string;
  errorHandler: (e: { minError: boolean; maxError: boolean }) => void;
}

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
export const DateInput: React.FC<Props> = ({
  defaultValue,
  invalidEndDate,
  invalidStartDate,
  mosaviDate,
  errorHandler,
  focus,
  placeholder,
  errors,
  onChange,
  mode,
  min,
  max,
  active,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number | null>();
  const [year, setYear] = useState<number | null>();

  const [minDate, setMinDate] = useState({
    day,
    month,
    year,
  });
  const [maxDate, setMaxDate] = useState({
    day,
    month,
    year,
  });

  const dayRef = useRef<HTMLInputElement | null>(null);
  const monthRef = useRef<HTMLInputElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);
  const [isArrowKeyPressed, setIsArrowKeyPressed] = useState(false);

  const isMiladi = (date: string) => moment(date, 'YYYY-MM-DD', true);
  const isJalali = (date: string) => moment(date, 'jYYYY/jM/jD');

  useEffect(() => {
    if (defaultValue instanceof Date) {
      const regex = /^(?:[1-9]|[12][0-9]|3[01])?$/;
      if (regex.test(String(defaultValue.getDate()))) {
        changeDayInput(defaultValue.getDate());
        changeMonthInput(+defaultValue.getMonth() + 1);
        changeYearInput(+defaultValue.getFullYear());
        setActiveIndex(null);
      }
    } else if (isCustomDate(defaultValue)) {
      changeDayInput(defaultValue.day);
      changeMonthInput(defaultValue.month);
      changeYearInput(defaultValue.year);
      setActiveIndex(null);
      dayRef.current?.blur();
    } else if (typeof defaultValue?.trim() === 'string') {
      if (mode === 'miladi' && isMiladi(defaultValue).isValid()) {
        const dateMiladi = isMiladi(defaultValue);
        changeDayInput(dateMiladi.date());
        changeMonthInput(dateMiladi.month() + 1);
        changeYearInput(dateMiladi.year());
        // setActiveIndex(null);
        dayRef.current?.blur();
      }

      if (mode === 'jalali' && isJalali(defaultValue).isValid()) {
        const dateJalali = isJalali(defaultValue);
        changeDayInput(dateJalali.date());
        changeMonthInput(dateJalali.month() + 1);
        changeYearInput(dateJalali.year());
        if (day && month && year) {
          if (max && defaultValue.replace(/-/g, '') > max?.replace(/-/g, '')) {
            errorHandler({ minError: false, maxError: true });
          }
          if (min && defaultValue.replace(/-/g, '') < min?.replace(/-/g, '')) {
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
        // setActiveIndex(null);
        dayRef.current?.blur();
      } else {
        setDay(0);
        setMonth(0);
        setYear(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, defaultValue]);

  useEffect(() => {
    if (!day) {
      dayRef?.current?.focus();
      setActiveIndex(1);
    }
  }, [day, active]);

  useEffect(() => {
    if (min && mode === 'miladi') {
      if (isMiladi(min).isValid()) {
        setMinDate({
          day: isMiladi(min).date(),
          month: isMiladi(min).month(),
          year: isMiladi(min).year(),
        });
      }
    }
    if (min && mode === 'jalali') {
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
        setMinDate({
          day: isMiladi(min).date(),
          month: isMiladi(min).month() + 1,
          year: isMiladi(min).year(),
        });
      }
    }
  }, [min, mode]);

  useEffect(() => {
    if (max) {
      const miladiDate = isMiladi(max);
      if (miladiDate.isValid()) {
        setMaxDate({
          day: miladiDate.date(),
          month: miladiDate.month(),
          year: miladiDate.year(),
        });
      }
      if (mode === 'jalali') {
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
    }
  }, [max, mode]);

  let tempMinError = false;
  let tempMaxError = false;

  const changeMonthInput = (e: number, arrowChange?: boolean) => {
    const regex = /^(0?[1-9]|1[0-2])?$/;

    if (regex.test(String(e))) {
      setMonth(e);
    }

    if (maxDate.month && maxDate.year && maxDate.day) {
      if (maxDate.month === e && year === maxDate.year && day > maxDate.day) {
        tempMaxError = true;
      }
      if (e > maxDate.month && year === maxDate.year) {
        tempMaxError = true;
      }

      if (year && year > maxDate.year) tempMaxError = true;

      if (year === maxDate.year && e < maxDate.month) tempMaxError = false;
    }

    if (minDate.month && minDate.year && minDate.day) {
      if (minDate.month === e && year === minDate.year && day < minDate.day) {
        tempMinError = true;
      }
      if (e < minDate.month && year === minDate.year) {
        tempMinError = true;
      }

      // if (year && year > minDate.year) tempMinError = false;
      if (year && year < minDate.year) tempMinError = true;
      if (year && year === minDate.year && e > minDate.month) {
        tempMinError = false;
      }
      if (
        year &&
        year === minDate.year &&
        e === minDate.month &&
        day >= minDate.day
      )
        tempMinError = false;
    }

    if (!e) {
      setMonth(null);
    }
    errorHandler({
      minError: tempMinError,
      maxError: tempMaxError,
    });

    if (year && e && day) {
      onChange(
        `${String(year).length === 4 && year}-${e < 10 ? `0${e}` : e}-${
          day < 10 ? `0${day}` : day
        }`
      );
    }

    if (String(e).length === 2 && arrowChange) {
      if (!day) {
        setActiveIndex(1);
        dayRef.current?.focus();
      } else if (!year) {
        setActiveIndex(3);
        yearRef.current?.focus();
      }
    }

    if (mode === 'jalali') {
      if (
        year &&
        String(year).length === 4 &&
        e === 12 &&
        !moment([year]).isLeapYear() &&
        day &&
        day > 30
      )
        setDay(30);
      if (
        year &&
        String(year).length === 4 &&
        e === 12 &&
        moment([year]).isLeapYear() &&
        day &&
        day > 29
      ) {
        setDay(29);
      }
      if (e > 6 && e < 12 && day === 31 && mode) setDay(30);
    }

    if (mode === 'miladi') {
      if (
        String(year).length === 4 &&
        year &&
        moment([year]).isLeapYear() &&
        e === 2 &&
        day &&
        day > 28
      ) {
        setDay(29);
      } else if (
        String(year).length === 4 &&
        year &&
        !moment([year]).isLeapYear() &&
        e === 2 &&
        day &&
        day > 28
      ) {
        setDay(28);
      }
      if ((e === 6 || e === 11 || e === 4 || e === 9) && day === 31) setDay(30);
    }
  };

  const changeDayInput = (e: number, arrowChange?: boolean) => {
    const regex = /^(?:[1-9]|[12][0-9]|3[01])?$/;

    if (regex.test(String(e))) {
      setDay(e);
    }

    if (minDate.year && minDate.month && minDate.day) {
      if (year && year < minDate.year) tempMinError = true;
      if (year === minDate.year && month === minDate.month && e < minDate.day) {
        console.log(e, minDate.day);
        tempMinError = true;
      } else {
        tempMinError = false;
      }
    }

    if (maxDate.year && maxDate.month && maxDate.day) {
      if (year === maxDate.year && month === maxDate.month && e > maxDate.day) {
        tempMaxError = true;
      }

      if (year && year > maxDate.year) tempMaxError = true;
    }

    if (mode === 'jalali' && month) {
      if (month > 6 && e === 31) setDay(30);
      if (month > 6 && month <= 8 && e === 31) setDay(30);
      if (regex.test(String(e)) && day !== 31) {
        setDay(e);
      }
    }
    if (mode === 'miladi') {
      if (
        String(year).length === 4 &&
        month &&
        year &&
        month === 2 &&
        moment([year]).isLeapYear() &&
        /^(?:[1-9]|1[0-9]|2[0-9])?$/.test(String(e))
      )
        setDay(e);
      if (
        String(year).length === 4 &&
        month &&
        year &&
        month === 2 &&
        !moment([year]).isLeapYear() &&
        /^(?:[1-9]|1[0-9]|2[0-8])?$/.test(String(e))
      )
        setDay(e);
      if (
        String(year).length === 4 &&
        ((month && month === 6) ||
          month === 11 ||
          month === 4 ||
          month === 9) &&
        e === 31
      )
        setDay(30);
    }
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
    if (
      (e === 31 || (e && isCustomDate(e) && e.day === 31)) &&
      month &&
      month > 6
    )
      setDay(30);
  };

  const changeYearInput = (e: number, arrowChangg?: boolean) => {
    if (/^\d{0,4}$/.test(String(e))) {
      setYear(e);
    }

    if (minDate.year && minDate.month && minDate.day) {
      if (e === minDate.year && month === minDate.month && day < minDate.day) {
        tempMinError = true;
      }
      if (
        e === minDate.year &&
        day >= minDate.day &&
        month &&
        month < minDate.month
      ) {
        tempMinError = true;
      }

      if (e > minDate.year) tempMinError = false;

      if (e < minDate.year) tempMinError = true;
    }

    if (maxDate.year && maxDate.month && maxDate.day) {
      if (e === maxDate.year && month === maxDate.month && day > maxDate.day) {
        tempMaxError = true;
      }

      if (
        e === maxDate.year &&
        day <= maxDate.day &&
        month &&
        month > maxDate.month
      ) {
        tempMaxError = true;
      }
      if (e > maxDate.year) tempMaxError = true;

      if (e < maxDate.year) tempMaxError = false;
    }
    errorHandler({
      minError: tempMinError,
      maxError: tempMaxError,
    });

    if (!e) {
      setYear(null);
    }

    if (String(e).length === 4 && month && day) {
      onChange(
        `${String(e).length === 4 && e}-${
          month && month < 10 ? `0${month}` : month
        }-${day < 10 ? `0${day}` : day}`
      );
    }

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

    if (mode === 'miladi') {
      if (
        String(e).length === 4 &&
        ((month && month === 6) ||
          month === 11 ||
          month === 4 ||
          month === 9) &&
        day === 31
      ) {
        setDay(30);
      }
      if (
        String(e).length === 4 &&
        moment([e]).isLeapYear() &&
        month &&
        month === 2 &&
        day &&
        day > 28
      ) {
        setDay(29);
      } else if (
        String(e).length === 4 &&
        !moment([e]).isLeapYear() &&
        month &&
        month === 2 &&
        day &&
        day > 28
      ) {
        setDay(28);
      }
    }
    if (mode === 'jalali') {
      if (String(e).length === 4 && day === 31 && month && month > 6)
        setDay(30);
      if (
        String(e).length === 4 &&
        year &&
        !moment([year]).isLeapYear() &&
        month &&
        month === 12 &&
        day === 31
      )
        setDay(30);
      if (
        String(e).length === 4 &&
        year &&
        moment([year]).isLeapYear() &&
        month &&
        month === 12 &&
        (day === 31 || day === 30)
      )
        setDay(29);
    }
  };

  const formatDay = (day: number | null | undefined) => {
    if (!day) return '';
    return String(day).length === 1 ? `0${day}` : day;
  };

  const formatMonth = (month: number | null | undefined) => {
    if (!month) return '';
    return String(month).length === 1 ? `0${month}` : month;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const keydownHandler = (e: KeyboardEvent) => {
    if (activeIndex && active) {
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
        document.body.style.overflow = 'hidden';
        if (activeIndex === 3) {
          changeYearInput(year ? year + 1 : 1);
        }
        if (activeIndex === 2) {
          changeMonthInput(
            month ? (month >= 1 && month < 12 ? month + 1 : month) : 1
          );
        }
        if (activeIndex === 1) {
          changeDayInput(day + 1);
        }
        setIsArrowKeyPressed(false);
      }
      if (e.key === 'ArrowDown') {
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
            month ? (month >= 1 && month <= 12 ? month - 1 : 0) : 0
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

    return () => {
      window.removeEventListener('keydown', keydownHandler);
      document.body.style.overflow = 'scroll';
    };
  }, [isArrowKeyPressed, activeIndex, day, month, year, keydownHandler]);

  useEffect(() => {
    if (!focus) setActiveIndex(null);
  }, [focus]);

  return (
    <div>
      <div
        className={cn(
          'w-40 rounded-md bg-white border-2 flex items-center gap-1 py-2 px-4',
          {
            'border-red-600':
              errors?.maxError ||
              errors?.minError ||
              mosaviDate ||
              invalidEndDate ||
              invalidStartDate,
            'border-brand-600':
              active &&
              focus &&
              !errors.maxError &&
              !errors.minError &&
              !mosaviDate &&
              !invalidEndDate &&
              !invalidStartDate,
            'border-gray-500': year && day && month && !focus,
          }
        )}
      >
        {active ? (
          <>
            <input
              dir="rtl"
              onClick={() => {
                if (active) setActiveIndex(1);
                dayRef?.current?.setSelectionRange(2, 2);
              }}
              disabled={!active}
              ref={dayRef}
              value={formatDay(day)}
              onChange={(e) => changeDayInput(+e.target.value, true)}
              type="text"
              placeholder="روز"
              className={cn(
                'w-5 outline-none pb-0.5 -mx-1 placeholder:text-black block',
                activeIndex === 1 && active && 'bg-blue-200'
              )}
            />
            /
            <input
              dir="rtl"
              disabled={!active}
              onClick={() => {
                setActiveIndex(2);
                monthRef?.current?.setSelectionRange(2, 2);
              }}
              ref={monthRef}
              value={formatMonth(month)}
              onChange={(e) => changeMonthInput(+e.target.value, true)}
              type="text"
              placeholder="ماه"
              className={cn(
                'w-5 outline-none pb-0.5 px-0 -mx-1 placeholder:text-black block',
                activeIndex === 2 && active && 'bg-blue-200'
              )}
            />
            /
            <input
              dir="rtl"
              disabled={!active}
              onClick={() => {
                setActiveIndex(3);
                yearRef?.current?.setSelectionRange(
                  yearRef?.current?.value.length,
                  yearRef?.current?.value.length
                );
              }}
              ref={yearRef}
              value={year ?? ''}
              onChange={(e) => changeYearInput(+e.target.value, true)}
              type="text"
              placeholder="سال"
              className={cn(
                'w-10 outline-none -mx-1 pb-0.5 placeholder:text-black block',
                activeIndex === 3 && active && 'bg-blue-200'
              )}
            />
          </>
        ) : (
          <span className="text-md text-gray-700">{placeholder}</span>
        )}
      </div>
    </div>
  );
};
