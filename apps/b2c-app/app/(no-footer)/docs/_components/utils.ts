import { FilterSection } from '../../../../components';

export const createFilterSections = (
  selectedReportTypes: string[],
  selectedAccountingTypes: string[],
  selectedOtherTypes: string[],
  selectedTimeFilters: string[],
  onReportTypeChange: (value: string) => void,
  onAccountingTypeChange: (value: string) => void,
  onOtherTypeChange: (value: string) => void,
  onTimeFilterChange: (value: string) => void,
): FilterSection[] => [
  {
    id: 'performance-reports',
    title: 'نوع گزارش عملکرد',
    options: [
      { id: 'monthly', label: 'ماهانه', value: 'monthly' },
      { id: 'quarterly', label: 'فصلی', value: 'quarterly' },
      { id: 'yearly', label: 'سالانه', value: 'yearly' },
    ],
    selectedValues: selectedReportTypes,
    onValueChange: onReportTypeChange,
  },
  {
    id: 'accounting-reports',
    title: 'نوع گزارش حسابداری',
    options: [
      { id: 'monthly-acc', label: 'ماهانه', value: 'monthly' },
      { id: 'quarterly-acc', label: 'فصلی', value: 'quarterly' },
      { id: 'yearly-acc', label: 'سالانه', value: 'yearly' },
    ],
    selectedValues: selectedAccountingTypes,
    onValueChange: onAccountingTypeChange,
  },
  {
    id: 'other-documents',
    title: 'سایر',
    options: [
      { id: 'bank-receipts', label: 'فیش بانکی', value: 'bank-receipts' },
      { id: 'regulations', label: 'قوانین و مقررات', value: 'regulations' },
      { id: 'brochure', label: 'بروشور', value: 'brochure' },
    ],
    selectedValues: selectedOtherTypes,
    onValueChange: onOtherTypeChange,
  },
  {
    id: 'time-filters',
    title: 'فیلتر زمانی',
    options: [
      { id: 'all', label: 'همه', value: 'all' },
      { id: 'last-week', label: 'هفته گذشته', value: 'last-week' },
      { id: 'last-30-days', label: '30 روز گذشته', value: 'last-30-days' },
      { id: 'last-60-days', label: '60 روز گذشته', value: 'last-60-days' },
      { id: 'custom-range', label: 'بازه زمانی', value: 'custom-range' },
    ],
    selectedValues: selectedTimeFilters,
    onValueChange: onTimeFilterChange,
  },
];
