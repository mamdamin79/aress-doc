'use client';
import { Button, SelectionChips, Accordion } from 'design-system';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { createFilterSections } from './utils';
import { FilterAccordion } from '../../../../components/FilterAccordion';

export interface FiltersRef {
  clearAllFilters: () => void;
}

export const Filters = forwardRef<FiltersRef>(
  ({ onClearFilters }: { onClearFilters?: () => void }, ref) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedFundTypes, setSelectedFundTypes] = useState<string[]>([]);
    const [selectedOrderTypes, setSelectedOrderTypes] = useState<string[]>([]);
    const [selectedPaymentMethodTypes, setSelectedPaymentMethodTypes] =
      useState<string[]>([]);
    const [selectedwithdrawalTypes, setSelectedwithdrawalTypes] = useState<
      string[]
    >([]);
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

    const handleFundTypeChange = (fundType: string) => {
      setSelectedFundTypes((prev) =>
        prev.includes(fundType)
          ? prev.filter((type) => type !== fundType)
          : [...prev, fundType],
      );
    };

    const handleOrderTypeChange = (orderType: string) => {
      setSelectedOrderTypes((prev) =>
        prev.includes(orderType)
          ? prev.filter((type) => type !== orderType)
          : [...prev, orderType],
      );
    };

    const handlePaymentMethodTypeChange = (paymentMethodType: string) => {
      setSelectedPaymentMethodTypes((prev) =>
        prev.includes(paymentMethodType)
          ? prev.filter((type) => type !== paymentMethodType)
          : [...prev, paymentMethodType],
      );
    };

    const handlewithdrawalTypeChange = (withdrawalType: string) => {
      setSelectedwithdrawalTypes((prev) =>
        prev.includes(withdrawalType)
          ? prev.filter((type) => type !== withdrawalType)
          : [...prev, withdrawalType],
      );
    };

    const handleTimeFilterChange = (timeFilter: string) => {
      setSelectedTimeFilters((prev) =>
        prev.includes(timeFilter) ? [] : [timeFilter],
      );
    };

    const clearAllFilters = () => {
      setSelectedItems([]);
      setSelectedFundTypes([]);
      setSelectedOrderTypes([]);
      setSelectedPaymentMethodTypes([]);
      setSelectedwithdrawalTypes([]);
      setSelectedTimeFilters([]);
      onClearFilters?.();
    };

    useImperativeHandle(ref, () => ({
      clearAllFilters,
    }));

    const filterSections = createFilterSections(
      selectedFundTypes,
      selectedOrderTypes,
      selectedPaymentMethodTypes,
      selectedwithdrawalTypes,
      selectedTimeFilters,
      handleFundTypeChange,
      handleOrderTypeChange,
      handlePaymentMethodTypeChange,
      handlewithdrawalTypeChange,
      handleTimeFilterChange,
    );

    const accordionItems = filterSections.map((section) =>
      FilterAccordion(section),
    );

    return (
      <>
        <div className="flex flex-col items-end gap-[27px]">
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
        <div className="text-text-neutral-primary -mb-2 flex w-full flex-col px-2">
          <span className="text-md pb-4 font-semibold">فیلتر فوری</span>
          <SelectionChips
            variant="filter"
            items={[
              { id: '1', label: 'خرید' },
              { id: '2', label: 'فروش' },
              { id: '4', label: 'سود تقسیمی' },
              { id: '7', label: 'برداشت وجه' },
              { id: '8', label: 'واریز وجه' },
            ]}
            selectedItems={selectedItems}
            onItemClick={handleItemClick}
          />
        </div>
        <div className="flex w-full flex-col px-2">
          <Accordion
            className="-space-y-6"
            defaultOpenItems={[0, 1, 2, 3, 4]}
            items={accordionItems}
            singleOpen={false}
            allowMultiple={true}
          />
        </div>
      </>
    );
  },
);
