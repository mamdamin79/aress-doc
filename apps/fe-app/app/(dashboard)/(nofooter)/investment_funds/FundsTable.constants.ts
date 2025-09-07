import { ColumnDef } from '@tanstack/react-table';
import { Person } from './types';

export const columnVisibility: Record<string, boolean> = {
  profitPerUnit: false,
  investmentPolicy: false,
  fundCategory: false,
  trustee: false,
  fundManager: false,
  liquidityGuarantor: false,
  auditor: false,
  participationBonds: false,
  bankDeposit: false,
  commodityDeposit: false,
  cash: false,
  otherStocks: false,
  otherAssets: false,
  statisticalPrice: false,
  customRangeReturn: false,
  customRangeAlpha: false,
  weeklyStdDev: false,
  customRangeStdDev: false,
  weeklyMaxDrawdown: false,
  customRangeMaxDrawdown: false,
  weeklyLeverage: false,
  monthlyLeverage: false,
  quarterlyLeverage: false,
  yearlyLeverage: false,
  customRangeLeverage: false,
  weeklySharpeRatio: false,
  monthlySharpeRatio: false,
  quarterlySharpeRatio: false,
  customRangeSharpeRatio: false,
  weeklyInfoRatio: false,
  monthlyInfoRatio: false,
  quarterlyInfoRatio: false,
  customRangeInfoRatio: false,
};

export const filterList = 
[
  {
    title: "نوع صندوق",
    singleOpen: true,
    options: [
      { label: "درآمد ثابت", select: true, min_amount: null, max_amount: null },
      { label: "سهامی", select: false, min_amount: null, max_amount: null },
      { label: "مختلط", select: false, min_amount: null, max_amount: null },
      { label: "ETF", select: false, min_amount: null, max_amount: null },
    ],
  },
  {
    title: "ریسک صندوق",
    singleOpen: false,
    options: [
      { label: "کم‌ریسک", select: false, min_amount: null, max_amount: null },
      { label: "متوسط", select: false, min_amount: null, max_amount: null },
      { label: "پرریسک", select: true, min_amount: null, max_amount: null },
    ],
  },
  {
    title: "حداقل سرمایه‌گذاری",
    singleOpen: false,
    options: [
      { label: "کمتر از ۱ میلیون", select: false, min_amount: 0, max_amount: 1000000 },
      { label: "۱ تا ۵ میلیون", select: false, min_amount: 1000000, max_amount: 5000000 },
      { label: "۵ تا ۱۰ میلیون", select: false, min_amount: 5000000, max_amount: 10000000 },
      { label: "بیشتر از ۱۰ میلیون", select: false, min_amount: 10000000, max_amount: null },
    ],
  },
  {
    title: "بازدهی سالانه",
    singleOpen: false,
    options: [
      { label: "کمتر از ۱۰٪", select: false, min_amount: 0, max_amount: 10 },
      { label: "۱۰٪ تا ۲۰٪", select: false, min_amount: 10, max_amount: 20 },
      { label: "۲۰٪ تا ۳۰٪", select: false, min_amount: 20, max_amount: 30 },
      { label: "بیشتر از ۳۰٪", select: false, min_amount: 30, max_amount: null },
    ],
  },
  {
    title: "امکان صدور/ابطال آنلاین",
    singleOpen: true,
    options: [
      { label: "دارد", select: false, min_amount: null, max_amount: null },
      { label: "ندارد", select: false, min_amount: null, max_amount: null },
    ],
  },
];

export const columns: ColumnDef<Person>[] = [
  { accessorKey: 'nameFund', header: 'نام صندوق', meta: { group: null } },

  {
    accessorKey: 'unitCount',
    header: 'تعداد واحد',
    meta: { group: 'مشخصات صندوق' },
  },
  {
    accessorKey: 'startDate',
    header: 'تاریخ آغاز فعالیت',
    meta: { group: 'مشخصات صندوق' },
  },
  {
    accessorKey: 'profitPerUnit',
    header: 'سود هر واحد صندوق',
    meta: { group: 'مشخصات صندوق' },
  },
  {
    accessorKey: 'netAssetValue',
    header: 'کل ارزش خالص دارایی‌ها',
    meta: { group: 'مشخصات صندوق' },
  },
  {
    accessorKey: 'investmentPolicy',
    header: 'سیاست سرمایه‌گذاری',
    meta: { group: 'مشخصات صندوق' },
  },
  {
    accessorKey: 'fundCategory',
    header: 'دسته‌بندی صندوق',
    meta: { group: 'مشخصات صندوق' },
  },

  { accessorKey: 'trustee', header: 'متولی', meta: { group: 'ارکان صندوق' } },
  {
    accessorKey: 'fundManager',
    header: 'مدیر صندوق',
    meta: { group: 'ارکان صندوق' },
  },
  {
    accessorKey: 'liquidityGuarantor',
    header: 'ضامن نقدشوندگی',
    meta: { group: 'ارکان صندوق' },
  },
  { accessorKey: 'auditor', header: 'حسابرس', meta: { group: 'ارکان صندوق' } },

  {
    accessorKey: 'participationBonds',
    header: 'اوراق مشارکت',
    meta: { group: 'سهم پرتفوی صندوق' },
  },
  {
    accessorKey: 'bankDeposit',
    header: 'سپرده بانکی',
    meta: { group: 'سهم پرتفوی صندوق' },
  },
  {
    accessorKey: 'commodityDeposit',
    header: 'گواهی سپرده کالایی',
    meta: { group: 'سهم پرتفوی صندوق' },
  },
  {
    accessorKey: 'cash',
    header: 'وجه نقد',
    meta: { group: 'سهم پرتفوی صندوق' },
  },
  {
    accessorKey: 'otherStocks',
    header: 'سایر سهام',
    meta: { group: 'سهم پرتفوی صندوق' },
  },
  {
    accessorKey: 'otherAssets',
    header: 'سایر دارایی‌ها',
    meta: { group: 'سهم پرتفوی صندوق' },
  },

  { accessorKey: 'statisticalPrice', header: 'آماری', meta: { group: 'قیمت' } },
  {
    accessorKey: 'cancellationPrice',
    header: 'ابطال',
    meta: { group: 'قیمت' },
  },
  { accessorKey: 'issuancePrice', header: 'صدور', meta: { group: 'قیمت' } },

  { accessorKey: 'dailyReturn', header: 'روزانه', meta: { group: 'بازده' } },
  { accessorKey: 'weeklyReturn', header: 'هفتگی', meta: { group: 'بازده' } },
  { accessorKey: 'monthlyReturn', header: 'ماهانه', meta: { group: 'بازده' } },
  {
    accessorKey: 'quarterlyReturn',
    header: 'سه ماهه',
    meta: { group: 'بازده' },
  },
  { accessorKey: 'yearlyReturn', header: 'یک ساله', meta: { group: 'بازده' } },
  {
    accessorKey: 'customRangeReturn',
    header: 'بازه دلخواه',
    meta: { group: 'بازده' },
  },

  { accessorKey: 'dailyAlpha', header: 'روزانه', meta: { group: 'آلفا' } },
  { accessorKey: 'weeklyAlpha', header: 'هفتگی', meta: { group: 'آلفا' } },
  { accessorKey: 'monthlyAlpha', header: 'ماهانه', meta: { group: 'آلفا' } },
  { accessorKey: 'quarterlyAlpha', header: 'سه ماهه', meta: { group: 'آلفا' } },
  { accessorKey: 'yearlyAlpha', header: 'یک ساله', meta: { group: 'آلفا' } },
  {
    accessorKey: 'customRangeAlpha',
    header: 'بازه دلخواه',
    meta: { group: 'آلفا' },
  },

  {
    accessorKey: 'weeklyStdDev',
    header: 'هفتگی',
    meta: { group: 'انحراف معیار' },
  },
  {
    accessorKey: 'monthlyStdDev',
    header: 'ماهانه',
    meta: { group: 'انحراف معیار' },
  },
  {
    accessorKey: 'quarterlyStdDev',
    header: 'سه ماهه',
    meta: { group: 'انحراف معیار' },
  },
  {
    accessorKey: 'yearlyStdDev',
    header: 'یک ساله',
    meta: { group: 'انحراف معیار' },
  },
  {
    accessorKey: 'customRangeStdDev',
    header: 'بازه دلخواه',
    meta: { group: 'انحراف معیار' },
  },

  {
    accessorKey: 'weeklyMaxDrawdown',
    header: 'هفتگی',
    meta: { group: 'بیشترین ریزش' },
  },
  {
    accessorKey: 'monthlyMaxDrawdown',
    header: 'ماهانه',
    meta: { group: 'بیشترین ریزش' },
  },
  {
    accessorKey: 'quarterlyMaxDrawdown',
    header: 'سه ماهه',
    meta: { group: 'بیشترین ریزش' },
  },
  {
    accessorKey: 'yearlyMaxDrawdown',
    header: 'یک ساله',
    meta: { group: 'بیشترین ریزش' },
  },
  {
    accessorKey: 'customRangeMaxDrawdown',
    header: 'بازه دلخواه',
    meta: { group: 'بیشترین ریزش' },
  },

  {
    accessorKey: 'weeklyLeverage',
    header: 'هفتگی',
    meta: { group: 'میانگین اهرم' },
  },
  {
    accessorKey: 'monthlyLeverage',
    header: 'ماهانه',
    meta: { group: 'میانگین اهرم' },
  },
  {
    accessorKey: 'quarterlyLeverage',
    header: 'سه ماهه',
    meta: { group: 'میانگین اهرم' },
  },
  {
    accessorKey: 'yearlyLeverage',
    header: 'یک ساله',
    meta: { group: 'میانگین اهرم' },
  },
  {
    accessorKey: 'customRangeLeverage',
    header: 'بازه دلخواه',
    meta: { group: 'میانگین اهرم' },
  },

  {
    accessorKey: 'weeklySharpeRatio',
    header: 'هفتگی',
    meta: { group: 'نسبت شارپ' },
  },
  {
    accessorKey: 'monthlySharpeRatio',
    header: 'ماهانه',
    meta: { group: 'نسبت شارپ' },
  },
  {
    accessorKey: 'quarterlySharpeRatio',
    header: 'سه ماهه',
    meta: { group: 'نسبت شارپ' },
  },
  {
    accessorKey: 'yearlySharpeRatio',
    header: 'یک ساله',
    meta: { group: 'نسبت شارپ' },
  },
  {
    accessorKey: 'customRangeSharpeRatio',
    header: 'بازه دلخواه',
    meta: { group: 'نسبت شارپ' },
  },

  {
    accessorKey: 'weeklyInfoRatio',
    header: 'هفتگی',
    meta: { group: 'نسبت اطلاعاتی' },
  },
  {
    accessorKey: 'monthlyInfoRatio',
    header: 'ماهانه',
    meta: { group: 'نسبت اطلاعاتی' },
  },
  {
    accessorKey: 'quarterlyInfoRatio',
    header: 'سه ماهه',
    meta: { group: 'نسبت اطلاعاتی' },
  },
  {
    accessorKey: 'yearlyInfoRatio',
    header: 'یک ساله',
    meta: { group: 'نسبت اطلاعاتی' },
  },
  {
    accessorKey: 'customRangeInfoRatio',
    header: 'بازه دلخواه',
    meta: { group: 'نسبت اطلاعاتی' },
  },
];
