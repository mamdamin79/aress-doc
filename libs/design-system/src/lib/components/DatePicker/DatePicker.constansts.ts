import { PickerLocale } from 'drm-datepickerjs';

export const weeksTitle = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

export const locale: PickerLocale = () => ({
  months: {
    1: { name: 'فروردین', numberOfDays: 31 },
    2: { name: 'اردیبهشت', numberOfDays: 31 },
    3: { name: 'خرداد', numberOfDays: 31 },
    4: { name: 'تیر', numberOfDays: 31 },
    5: { name: 'مرداد', numberOfDays: 31 },
    6: { name: 'شهریور', numberOfDays: 31 },
    7: { name: 'مهر', numberOfDays: 30 },
    8: { name: 'آبان', numberOfDays: 30 },
    9: { name: 'آذر', numberOfDays: 30 },
    10: { name: 'دی', numberOfDays: 30 },
    11: { name: 'بهمن', numberOfDays: 30 },
    12: { name: 'اسفند', numberOfDays: 30 },
  },
});
