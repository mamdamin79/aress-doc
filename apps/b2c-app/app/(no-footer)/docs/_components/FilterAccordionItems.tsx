import { DatePickerTrigger } from '../../../../components';
import { Checkbox, Icon, cn, AccordionItem } from 'design-system';
import React from 'react';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onValueChange: (value: string) => void;
}

export const FilterAccordionItem = (section: FilterSection): AccordionItem => {
  return {
    trigger: (isOpen: boolean) => (
      <div className="flex h-16 items-center justify-between px-2">
        <span className="text-md font-semibold">{section.title}</span>
        <div className="flex items-center gap-4">
          {section.selectedValues.length > 0 && (
            <div className="bg-surface-neutral-secondary text-text-neutral-primary h-6 w-6 rounded-full text-sm font-medium">
              {section.selectedValues.length}
            </div>
          )}
          <span
            className={cn(
              'text-icon-neutral-primary group-hover:text-icon-brand-primary-600 flex items-center justify-center transition-transform duration-300',
              {
                'rotate-0': !isOpen,
                'rotate-180': isOpen,
              },
            )}
          >
            <Icon name="chevron-down" size="lg" />
          </span>
        </div>
      </div>
    ),
    content: (
      <div className="flex flex-col">
        {section.options.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-start px-2 py-3"
          >
            <Checkbox
              className="text-text-neutral-primary"
              content={option.label}
              checked={section.selectedValues.includes(option.value)}
              onChange={() => section.onValueChange(option.value)}
            />
          </div>
        ))}
        {section.id === 'time-filters' && (
          <div className="flex items-center justify-center pb-4 pl-3 pr-10 pt-4">
            <DatePickerTrigger
              mode="range"
              title={['تاریخ شروع', 'تاریخ پایان']}
            />
          </div>
        )}
      </div>
    ),
  };
};

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
      { id: 'fund-docs', label: 'مدارک صندوق', value: 'fund-docs' },
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
