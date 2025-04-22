import moment from 'moment';

export const dayRegex = /^(?:[1-9]|[12][0-9]|3[01])?$/;
export const monthRegex = /^(0?[1-9]|1[0-2])?$/;
export const yearRegex = /^\d{0,4}$/;
export const isJalali = (date: string) => moment(date, 'jYYYY/jM/jD');
