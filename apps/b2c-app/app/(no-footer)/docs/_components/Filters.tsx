'use client';
import { Button, Icon, SelectionChips, Accordion } from 'design-system';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  FilterAccordionItem,
  createFilterSections,
} from './FilterAccordionItems';

export interface FiltersRef {
  clearAllFilters: () => void;
}

export const Filters = forwardRef<FiltersRef>(
  ({ onClearFilters }: { onClearFilters?: () => void }, ref) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedReportTypes, setSelectedReportTypes] = useState<string[]>(
      [],
    );
    const [selectedAccountingTypes, setSelectedAccountingTypes] = useState<
      string[]
    >([]);
    const [selectedOtherTypes, setSelectedOtherTypes] = useState<string[]>([]);
    const [selectedTimeFilters, setSelectedTimeFilters] = useState<string[]>(
      [],
    );

    const handleItemClick = (itemId: string) => {
      setSelectedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId],
      );
    };

    const handleReportTypeChange = (reportType: string) => {
      setSelectedReportTypes((prev) =>
        prev.includes(reportType)
          ? prev.filter((type) => type !== reportType)
          : [...prev, reportType],
      );
    };

    const handleAccountingTypeChange = (accountingType: string) => {
      setSelectedAccountingTypes((prev) =>
        prev.includes(accountingType)
          ? prev.filter((type) => type !== accountingType)
          : [...prev, accountingType],
      );
    };

    const handleOtherTypeChange = (otherType: string) => {
      setSelectedOtherTypes((prev) =>
        prev.includes(otherType)
          ? prev.filter((type) => type !== otherType)
          : [...prev, otherType],
      );
    };

    const handleTimeFilterChange = (timeFilter: string) => {
      setSelectedTimeFilters((prev) =>
        prev.includes(timeFilter) ? [] : [timeFilter],
      );
    };

    const clearAllFilters = () => {
      setSelectedItems([]);
      setSelectedReportTypes([]);
      setSelectedAccountingTypes([]);
      setSelectedOtherTypes([]);
      setSelectedTimeFilters([]);
      onClearFilters?.();
    };

    useImperativeHandle(ref, () => ({
      clearAllFilters,
    }));

    const filterSections = createFilterSections(
      selectedReportTypes,
      selectedAccountingTypes,
      selectedOtherTypes,
      selectedTimeFilters,
      handleReportTypeChange,
      handleAccountingTypeChange,
      handleOtherTypeChange,
      handleTimeFilterChange,
    );

    const accordionItems = filterSections.map((section) =>
      FilterAccordionItem(section),
    );

    return (
      <>
        <div className="flex flex-col items-end gap-[27px]">
          <div className="hidden gap-3 lg:flex">
            <Button mode="secondary" className="w-[170px]" size="sm">
              <div className="flex items-center gap-2 font-medium">
                <span>درخواست گزارش</span>
                <Icon name="file-plus-2" size="lg" />
              </div>
            </Button>
          </div>
          <div className="border-border-neutral-secondary hidden w-full items-center justify-between border-b pb-4 pr-4 lg:flex">
            <span className="text-text-neutral-secondary text-lg font-semibold">
              فیلترها
            </span>
            <Button
              mode="secondary"
              size="sm"
              theme="error"
              className="w-[120px] font-medium"
              onClick={clearAllFilters}
            >
              حذف فیلترها
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col px-2 pb-4">
          <span className="text-md pb-4 font-semibold">فیلتر فوری</span>
          <SelectionChips
            variant="filter"
            items={[
              { id: '1', label: 'گزارش حسابداری' },
              { id: '2', label: 'گزارش عملکرد' },
              { id: '3', label: 'مدارک صندوق' },
            ]}
            selectedItems={selectedItems}
            onItemClick={handleItemClick}
          />
        </div>
        <div className="flex w-full flex-col px-2">
          <Accordion
            className="-space-y-6"
            defaultOpenItems={[0, 1, 2, 3]}
            items={accordionItems}
            singleOpen={false}
            allowMultiple={true}
          />
        </div>
      </>
    );
  },
);
