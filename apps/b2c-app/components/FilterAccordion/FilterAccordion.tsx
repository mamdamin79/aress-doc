import { DatePickerTrigger } from '../DatePicker';
import { Checkbox, Radio, Icon, cn, AccordionItem } from 'design-system';
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

export const FilterAccordion = (section: FilterSection): AccordionItem => {
  return {
    trigger: (isOpen: boolean) => (
      <div className="text-text-neutral-primary bg-surface-neutral-background hover:bg-surface-brand-100 flex h-16 items-center justify-between rounded-2xl px-2 transition-colors">
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
            {section.id === 'time-filters' ? (
              <Radio
                id={`${section.id}-${option.id}`}
                name={section.id}
                value={option.value}
                content={option.label}
                checked={section.selectedValues.includes(option.value)}
                onChange={() => section.onValueChange(option.value)}
                className="text-text-neutral-primary"
              />
            ) : (
              <Checkbox
                className="text-text-neutral-primary"
                content={option.label}
                checked={section.selectedValues.includes(option.value)}
                onChange={() => section.onValueChange(option.value)}
              />
            )}
          </div>
        ))}
        {section.id === 'time-filters' && (
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              {
                '-translate-y-6 opacity-0': !(
                  section.id === 'time-filters' &&
                  section.selectedValues.includes('custom-range')
                ),
                'translate-y-0 opacity-100':
                  section.id === 'time-filters' &&
                  section.selectedValues.includes('custom-range'),
              },
            )}
          >
            <div className="flex items-center justify-center pb-4 pl-3 pr-10 pt-4">
              <DatePickerTrigger
                mode="range"
                title={['تاریخ شروع', 'تاریخ پایان']}
              />
            </div>
          </div>
        )}
      </div>
    ),
  };
};
