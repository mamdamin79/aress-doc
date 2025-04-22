export const formatDay = (day: number | null | undefined) => {
  if (!day) return '';
  return String(day).length === 1 ? `0${day}` : day;
};
export const formatMonth = (month: number | null | undefined) => {
  if (!month) return '';
  return String(month).length === 1 ? `0${month}` : month;
};
export const formatYear = (year: number | null | undefined) => {
  if (!year) return '';
  return String(year).padStart(4, '0');
};
