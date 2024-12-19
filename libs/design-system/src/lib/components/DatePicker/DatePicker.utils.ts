import moment from 'jalali-moment';

export const getFirstAndLastDayOfWeek = (index: number) => {
  const firstDayIndex = index - (index % 7);
  const lastDayIndex = firstDayIndex + 6;
  return { firstDayIndex, lastDayIndex };
};

export const convertToISODate = (date: string) => {
  return moment
    .from(date, 'fa', 'YYYY/MM/DD')
    .locale('en')
    .format('YYYY-MM-DD');
};

export const formatDateToPersian = (date: string): string => {
  return convertToISODate(date).replace(/-/g, '');
};

export const DateDifference = (
  startDate: string | Date,
  endDate: string | Date
) => {
  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);
  const timeDifference = +endDateTime - +startDateTime;
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
};
