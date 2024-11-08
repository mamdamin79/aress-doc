import moment from 'moment';
import { cn } from '../../../utils';
import { act, useEffect, useRef, useState } from 'react';
import { CustomDate } from './DateInput.types';

interface Props {
  value: string | Date | CustomDate;
  onChange: (value: string | Date) => void;
  mode: 'jalali' | 'miladi';
  min?: string;
  max?: string;
}

const isCustomDate = (value: any): value is CustomDate => {
  return (
    value &&
    typeof value.day === 'number' &&
    typeof value.month === 'number' &&
    typeof value.year === 'number'
  );
};
export const DateInput: React.FC<Props> = ({
  value,
  onChange,
  mode,
  min,
  max,
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

  const [yearError, setYearError] = useState<boolean>(false);
  const [dayError, setDayError] = useState<boolean>(false);
  const [monthError, setMonthError] = useState<boolean>(false);
  const dayRef = useRef<HTMLInputElement | null>(null);
  const monthRef = useRef<HTMLInputElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);
  const [isArrowKeyPressed, setIsArrowKeyPressed] = useState(false);

  useEffect(() => {
    if (value instanceof Date) {
      const regex = /^(?:[1-9]|[12][0-9]|3[01])?$/;
      if (regex.test(String(value.getDate()))) {
        setDay(value.getDate());
        setMonth(+value.getMonth() + 1);
        setYear(+value.getFullYear());
        setActiveIndex(null);
      }
    } else if (isCustomDate(value)) {
      setDay(value.day);
      setMonth(value.month);
      setYear(value.year);
      setActiveIndex(null);
    }
  }, [value]);

  useEffect(() => {
    if (!day) {
      dayRef.current && dayRef.current.focus();
    }
  }, [day]);

  const isMiladi = (date: string) => moment(date, 'YYYY-MM-DD', true);
  const isShamsi = (date: string) => moment(date, 'jYYYY/jM/jD');

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
      if (isShamsi(min).isValid()) {
        if (isShamsi(min).month() + 1 > 6) {
          if (isShamsi(min).date() > 31) {
            setMinDate({
              day: 31,
              month: isShamsi(min).month(),
              year: isShamsi(min).year(),
            });
          } else
            setMinDate({
              day: isShamsi(min).date(),
              month: isShamsi(min).month(),
              year: isShamsi(min).year(),
            });
        }
        setMinDate({
          day: isMiladi(min).date(),
          month: isMiladi(min).month(),
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
        const shamsiDate = isShamsi(max);
        if (shamsiDate.isValid()) {
          if (shamsiDate.month() + 1 > 6) {
            if (shamsiDate.date() > 31) {
              setMaxDate({
                day: 31,
                month: shamsiDate.month(),
                year: shamsiDate.year(),
              });
            } else
              setMaxDate({
                day: shamsiDate.date(),
                month: shamsiDate.month(),
                year: shamsiDate.year(),
              });
          }
          setMaxDate({
            day: shamsiDate.date(),
            month: shamsiDate.month(),
            year: shamsiDate.year(),
          });
        }
      }
    }
  }, [max, mode]);

  const changeMonthInput = (e: number) => {
    const regex = /^(0?[1-9]|1[0-2])?$/;

    if (regex.test(String(e))) {
      setMonth(e);
    }

    if (
      minDate.year ||
      minDate.day ||
      minDate.month ||
      maxDate.day ||
      maxDate.month ||
      maxDate.year
    ) {
      if (String(e).length === 2) {
        if (
          (year === minDate.year &&
            minDate.month &&
            e === minDate.month + 1 &&
            day &&
            minDate.day &&
            day <= minDate.day) ||
          (year === maxDate.year &&
            maxDate.month &&
            e === maxDate.month + 1 &&
            day &&
            maxDate.day &&
            day >= maxDate.day)
        ) {
          setDayError(true);
        } else {
          if (
            (year === minDate.year && minDate.month && e < minDate.month + 1) ||
            (year === maxDate.year && maxDate.month && e > maxDate.month + 1)
          ) {
            setMonthError(true);
          } else {
            setMonthError(false);
            if (!day) {
              setActiveIndex(1);
              dayRef.current?.focus();
            } else if (!year) {
              setActiveIndex(3);
              yearRef.current?.focus();
            } else setActiveIndex(null);
          }
        }
      } else if (String(value)) {
        if (
          (year === minDate.year &&
            minDate.month &&
            e === minDate.month + 1 &&
            day &&
            minDate.day &&
            day <= minDate.day) ||
          (year === maxDate.year &&
            maxDate.month &&
            e === maxDate.month + 1 &&
            day &&
            maxDate.day &&
            day >= maxDate.day)
        ) {
          setDayError(true);
        } else if (
          (year === minDate.year && minDate.month && e < minDate.month + 1) ||
          (year === maxDate.year && maxDate.month && e > maxDate.month + 1)
        ) {
          setMonthError(true);
        } else {
          setDayError(false);
          setMonthError(false);
        }
      }
    } else {
      if (String(value).length === 2) {
        setMonthError(false);
        if (!day) {
          setActiveIndex(1);
          dayRef.current?.focus();
        } else if (!year) {
          setActiveIndex(3);
          yearRef.current?.focus();
        } else setActiveIndex(null);
      }
    }

    if (!e) {
      setMonth(null);
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
      )
        setDay(29);
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

  const changeDayInput = (e: number, mode?: string) => {
    const regex = /^(?:[1-9]|[12][0-9]|3[01])?$/;

    if (regex.test(String(e))) {
      setDay(e);
    }

    if (
      (year === minDate.year &&
        minDate.month &&
        month === minDate.month + 1 &&
        minDate.day &&
        e <= minDate.day) ||
      (year === maxDate.year &&
        maxDate.month &&
        month === maxDate.month + 1 &&
        maxDate.day &&
        e >= maxDate.day)
    ) {
      setDayError(true);
    } else {
      setDayError(false);
      if (
        (year === maxDate.year &&
          maxDate.month &&
          month &&
          month > maxDate.month + 1) ||
        (year === minDate.year &&
          minDate.month &&
          month &&
          month < minDate.month + 1)
      ) {
        setMonthError(true);
      } else setMonthError(false);
    }

    if (mode === 'jalali') {
      if (month && month > 6 && e === 31) setDay(30);
      if (month && month > 6 && month <= 8 && e === 31) setDay(30);
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
    if (String(e).length === 2 && mode === 'changeNumber') {
      if (!month) {
        setActiveIndex(2);
        monthRef.current?.focus();
      } else if (!year) {
        setActiveIndex(3);
        yearRef.current?.focus();
      }
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

  const changeYearInput = (e: number) => {
    if (/^\d{0,4}$/.test(String(e))) {
      setYear(e);
    }
    if (
      minDate.year ||
      minDate.day ||
      minDate.month ||
      maxDate.day ||
      maxDate.month ||
      maxDate.year
    ) {
      if (String(e).length === 4) {
        if (
          (minDate.year === e &&
            minDate.month &&
            month &&
            month === minDate.month + 1 &&
            day &&
            minDate.day &&
            day <= minDate.day) ||
          (maxDate.year === e &&
            maxDate.month &&
            month &&
            month === maxDate.month + 1 &&
            day &&
            maxDate.day &&
            day >= maxDate.day)
        ) {
          setDayError(true);
        } else {
          setDayError(false);
        }

        if (
          (e === maxDate.year &&
            day &&
            month &&
            maxDate.month &&
            month > maxDate.month + 1) ||
          (e === minDate.year &&
            day &&
            month &&
            minDate.month &&
            month < minDate.month + 1)
        ) {
          setMonthError(true);
        } else {
          setMonthError(false);
        }
        if (
          (minDate.year && e < minDate.year) ||
          (maxDate.year && e > maxDate.year)
        ) {
          setYearError(true);
        } else {
          setYearError(false);
          if (!day) {
            setActiveIndex(1);
            dayRef.current?.focus();
          } else if (!month) {
            setActiveIndex(2);
            monthRef.current?.focus();
          } else setActiveIndex(null);
        }
      } else setYearError(true);
    } else {
      if (String(e).length === 4) {
        setYearError(false);
        if (!month) {
          setActiveIndex(1);
          monthRef.current?.focus();
        } else if (!day) {
          setActiveIndex(2);
          dayRef.current?.focus();
        } else setActiveIndex(null);
      } else setYearError(true);
    }

    if (String(e).length === 4) {
      if (
        (minDate.year && e < minDate.year) ||
        (maxDate.year && e > maxDate.year)
      ) {
        setYearError(true);
      } else {
        setYearError(false);
        if (!month) {
          setActiveIndex(2);
          monthRef.current?.focus();
        } else if (!day) {
          dayRef.current?.focus();
          setActiveIndex(1);
        } else setActiveIndex(null);
      }
    } else setYearError(true);

    if (!e) {
      setYear(null);
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

  const keydownHandler = (e: KeyboardEvent) => {
    if (activeIndex) {
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
          monthRef?.current?.blur();
        }
        if (activeIndex === 3) {
          monthRef?.current?.focus();
          yearRef?.current?.blur();
        }
        if (activeIndex === 2) {
          monthRef?.current?.blur();
          dayRef?.current?.focus();
        }
        if (activeIndex > 1) {
          setActiveIndex(activeIndex - 1);
        }
      }
      if (e.key === 'ArrowUp') {
        // year change
        if (activeIndex === 3) {
          changeYearInput(year ? year + 1 : 1);
        }
        // // // month change
        if (activeIndex === 2) {
          changeMonthInput(
            month ? (month >= 1 && month < 12 ? month + 1 : month) : 1
          );
        }

        // // change day
        if (activeIndex === 1) {
          changeDayInput(day + 1);
        }
        setIsArrowKeyPressed(false);
      }
      if (e.key === 'ArrowDown') {
        if (activeIndex === 1) {
          changeDayInput(day ? (day >= 1 && day < 31 ? day - 1 : 2) : 0);
          setIsArrowKeyPressed(false);
        }
        if (activeIndex === 3)
        {
          changeYearInput(year ? year - 1 : 0)
        }
      }
    }
  };

  useEffect(() => {
    if (isArrowKeyPressed) {
      return;
    }
    window.addEventListener('keydown', keydownHandler);

    return () => window.removeEventListener('keydown', keydownHandler);
  }, [isArrowKeyPressed, activeIndex, day, month, year]);

  return (
    <div
      className={cn(
        'w-40 rounded-md border-2 flex items-center gap-1 border-brand-600 py-2 px-4',
        { 'border-red-600': dayError || monthError || yearError }
      )}
    >
      <input
        dir="rtl"
        onClick={() => setActiveIndex(1)}
        ref={dayRef}
        value={formatDay(day)}
        onChange={(e) => changeDayInput(+e.target.value, 'changeNumber')}
        type="text"
        placeholder="روز"
        className={cn(
          'w-5 outline-none pb-0.5 placeholder:text-black block',
          activeIndex === 1 && 'bg-blue-200'
        )}
      />
      /
      <input
        dir="rtl"
        onClick={() => setActiveIndex(2)}
        ref={monthRef}
        value={formatMonth(month)}
        onChange={(e) => changeMonthInput(+e.target.value)}
        type="text"
        placeholder="ماه"
        className={cn(
          'w-5 outline-none pb-0.5 placeholder:text-black block',
          activeIndex === 2 && 'bg-blue-200'
        )}
      />
      /
      <input
        dir="rtl"
        onClick={() => setActiveIndex(3)}
        ref={yearRef}
        value={year ?? ''}
        onChange={(e) => changeYearInput(+e.target.value)}
        type="text"
        placeholder="سال"
        className={cn(
          'w-8 outline-none pb-0.5 placeholder:text-black block',
          activeIndex === 3 && 'bg-blue-200'
        )}
      />
    </div>
  );
};
