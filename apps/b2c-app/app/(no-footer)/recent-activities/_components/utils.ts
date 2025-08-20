import { FilterSection } from '../../docs/_components/FilterAccordionItems';

export const createFilterSections = (
  selectedFundTypes: string[],
  selectedOrderTypes: string[],
  selectedPaymentMethodTypes: string[],
  selectedwithdrawalTypes: string[],
  selectedTimeFilters: string[],
  onFundTypeChange: (value: string) => void,
  onOrderTypeChange: (value: string) => void,
  onPaymentMethodTypeChange: (value: string) => void,
  onwithdrawalTypeChange: (value: string) => void,
  onTimeFilterChange: (value: string) => void,
): FilterSection[] => [
  {
    id: 'fund-type',
    title: 'نوع سفارش',
    options: [
      { id: 'fixedIncome', label: 'درآمد ثابت', value: 'fixedIncome' },
      { id: 'equity', label: 'سهامی', value: 'equity' },
      { id: 'commodity', label: 'کالایی', value: 'commodity' },
      { id: 'mixed', label: 'مختلط', value: 'mixed' },
    ],
    selectedValues: selectedFundTypes,
    onValueChange: onFundTypeChange,
  },
  {
    id: 'order-type',
    title: 'نوع صندوق',
    options: [
      { id: 'buy', label: 'خرید', value: 'buy' },
      { id: 'sell', label: 'فروش', value: 'sell' },
    ],
    selectedValues: selectedOrderTypes,
    onValueChange: onOrderTypeChange,
  },
  {
    id: 'payment-method',
    title: 'روش پرداخت',
    options: [
      { id: 'bank-receipts', label: 'فیش بانکی', value: 'bank-receipts' },
      { id: 'bank-gateway', label: 'درگاه بانکی', value: 'bank-gateway' },
    ],
    selectedValues: selectedPaymentMethodTypes,
    onValueChange: onPaymentMethodTypeChange,
  },
  {
    id: 'withdrawal-method',
    title: 'نوع برداشت',
    options: [
      {
        id: 'pay-adjustment',
        label: 'واریز مابالتفاوت',
        value: 'pay-adjustment',
      },
      {
        id: 'customer-request',
        label: 'درخواست مشتری',
        value: 'customer-request',
      },
    ],
    selectedValues: selectedwithdrawalTypes,
    onValueChange: onwithdrawalTypeChange,
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
