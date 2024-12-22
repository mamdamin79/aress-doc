import { useState, useCallback } from 'react';
import jalaali from 'jalaali-js';

enum DayName {
  Saturday = 1,
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
}

enum MonthName {
  Farvardin = 1,
  Ordibehesht,
  Khordad,
  Tir,
  Mordad,
  Shahrivar,
  Mehr,
  Aban,
  Azar,
  Dey,
  Bahman,
  Esfand,
}

type DateObject = {
  year: number;
  month: number;
  day: number;
};

const usePersianCalendar = (min: DateObject, max: DateObject) => {
  const [startDate, setStartDateRaw] = useState<DateObject | null>(null);
  const [endDate, setEndDateRaw] = useState<DateObject | null>(null);
  const [currentDate, setCurrentDateRaw] = useState<DateObject>(min);

  const getDayName = useCallback(
    (year: number, month: number, day: number): DayName => {
      const { gy, gm, gd } = jalaali.toGregorian(year, month, day);
      return (new Date(gy, gm - 1, gd).getDay() + 1) as DayName; // Adjust to 1-based week starting Saturday
    },
    []
  );

  const calculateDaysInMonth = useCallback(
    (year: number, month: number): 29 | 30 | 31 => {
      return jalaali.jalaaliMonthLength(year, month) as 29 | 30 | 31;
    },
    []
  );

  const setStartDate = useCallback(
    (date: DateObject | '') => {      
      if (date) {
        if (
          endDate &&
          (date.year > endDate.year ||
            (date.year === endDate.year && date.month > endDate.month) ||
            (date.year === endDate.year &&
              date.month === endDate.month &&
              date.day >= endDate.day))
        ) {
          setEndDateRaw(null);
        }        
        setStartDateRaw(date);
      } else setStartDateRaw(null);
    },
    [endDate]
  );

  const setEndDate = useCallback(
    (date: DateObject | '') => {
      if (date) {
        if (
          !startDate ||
          date.year < startDate.year ||
          (date.year === startDate.year && date.month < startDate.month) ||
          (date.year === startDate.year &&
            date.month === startDate.month &&
            date.day <= startDate.day)
        ) {
          setStartDateRaw(date);
          setEndDateRaw(null);
        } else {
          setEndDateRaw(date);
        }
      } else setEndDateRaw(null);
    },
    [startDate]
  );

  const setCurrentDate = useCallback(
    (value: Date | number | MonthName | string) => {
      let newDate: DateObject = currentDate;
  
      if (value instanceof Date) {
        newDate = {
          year: value.getFullYear(),
          month: value.getMonth() + 1,
          day: 1,
        };
      } else if (typeof value === 'number') {
        const newMonth = currentDate.month + value;
        
        const adjustedYear = currentDate.year + Math.floor((newMonth - 1) / 12);
        const adjustedMonth = ((newMonth - 1) % 12 + 12) % 12 + 1;
  
        newDate = { year: adjustedYear, month: adjustedMonth, day: 1 };
      } else if (Object.values(MonthName).includes(+value as MonthName)) {
        newDate = { year: currentDate.year, month: +value as number, day: 1 };
      } else if (typeof value === 'string') {
        const [year, month] = value.split('-').map(Number);
        newDate = { year, month, day: 1 };
      }
  
      if (
        (newDate.year > min.year ||
          (newDate.year === min.year && newDate.month >= min.month)) &&
        (newDate.year < max.year ||
          (newDate.year === max.year && newDate.month <= max.month))
      ) {
        setCurrentDateRaw(newDate);
      }
    },
    [currentDate, min, max]
  );

  const getCalendarRange = useCallback((year: number, month: number) => {
    return `${year}-${month < 10 ? `0${month}` : month}-${1}`;
  }, []);

  const calendars = [
    getCalendarRange(currentDate.year, currentDate.month),
    getCalendarRange(
      currentDate.month === 12 ? currentDate.year + 1 : currentDate.year,
      currentDate.month === 12 ? 1 : currentDate.month + 1
    ),
  ];

  // Helper function to check if a date is inside the range
  const isDateInRange = useCallback(
    (date: DateObject) => {
      const isAfterMin =
        date.year > min.year ||
        (date.year === min.year && date.month > min.month) ||
        (date.year === min.year && date.month === min.month && date.day >= min.day);

      const isBeforeMax =
        date.year < max.year ||
        (date.year === max.year && date.month < max.month) ||
        (date.year === max.year && date.month === max.month && date.day <= max.day);

      return isAfterMin && isBeforeMax;
    },
    [min, max]
  );

  const isCurrentDateInRange = useCallback(() => {
    return isDateInRange(currentDate);
  }, [currentDate, isDateInRange]);

  const isCustomDateInRange = useCallback(
    (date: DateObject) => {
      return isDateInRange(date);
    },
    [isDateInRange]
  );

  return {
    startDate,
    endDate,
    currentDate,
    calendars,
    getDayName,
    isDateInRange,
    setStartDate,
    setEndDate,
    setCurrentDate,
    isCurrentDateInRange,
    isCustomDateInRange,
    calculateDaysInMonth
  };
};

export { usePersianCalendar, DayName, MonthName };
