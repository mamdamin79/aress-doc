export const getFirstAndLastDayOfWeek = (index: number) => {
  const firstDayIndex = index - (index % 7);
  const lastDayIndex = firstDayIndex + 6;
  return { firstDayIndex, lastDayIndex };
};

export const DateDifference = (startDate: string, endDate: string) => {
  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);
  const timeDifference = +endDateTime - +startDateTime;
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
};

export const updatedCurrentMonthDays = (
  days: { day: number; dayName: string }[]
) => {
  return days.map((day) => ({
    ...day,
    status: 'current',
  }));
};
