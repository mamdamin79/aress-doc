import { ColumnDef } from "@tanstack/react-table";
import { Person } from "./components/makeData";

export const columnVisibility = {
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

export const filterList = [
  { title: 'ویدیو بررسی', options: ['دارد', 'ندارد'], singleSelect: true },
  {
    singleSelect: false,
    title: 'بازه اضافه یک ساله نسبت به شاخص کل',
    options: [
      'بازده منفی',
      'از صفر تا 5 درصد',
      'از 5 تا 10 درصد',
      'از 10 تا 20 درصد',
      'از 20 تا 50 درصد',
      'بیشتر از 50 درصد',
    ],
  },
  {
    singleSelect: false,
    title: 'بازده یک ساله',
    options: [
      'بازده منفی',
      'از صفر تا 30 درصد',
      'از 30 تا 50 درصد',
      'از 50 تا 100 درصد',
      'از 100 تا 200 درصد',
      'بیشتر از 200 درصد',
    ],
  },
  {
    title: 'شیوه سرمایه گذاری',
    options: ['قابل معامله (ETF)', 'صدور و ابطال'],
    singleSelect: true
  },
];

export const columns: ColumnDef<Person>[] = [
  {
    header: 'نام صندوق',
    accessorKey: 'nameFund',
    cell: ({ row }) => {
      return row.original.hasVideo;
    },
  },
  {
    header: 'مشخصات صندوق',
    columns: [
      { accessorKey: 'unitCount', header: 'تعداد واحد' },
      { accessorKey: 'startDate', header: 'تاریخ آغاز فعالیت' },
      { accessorKey: 'profitPerUnit', header: 'سود هر واحد صندوق' },
      { accessorKey: 'netAssetValue', header: 'کل ارزش خالص دارایی‌ها' },
      { accessorKey: 'investmentPolicy', header: 'سیاست سرمایه‌گذاری' },
      { accessorKey: 'fundCategory', header: 'دسته‌بندی صندوق' },
    ],
  },
  {
    header: 'ارکان صندوق',
    columns: [
      { accessorKey: 'trustee', header: 'متولی' },
      { accessorKey: 'fundManager', header: 'مدیر صندوق' },
      { accessorKey: 'liquidityGuarantor', header: 'ضامن نقدشوندگی' },
      { accessorKey: 'auditor', header: 'حسابرس' },
    ],
  },
  {
    header: 'سهم پرتفوی صندوق',
    columns: [
      { accessorKey: 'participationBonds', header: 'اوراق مشارکت' },
      { accessorKey: 'bankDeposit', header: 'سپرده بانکی' },
      { accessorKey: 'commodityDeposit', header: 'گواهی سپرده کالایی' },
      { accessorKey: 'cash', header: 'وجه نقد' },
      { accessorKey: 'otherStocks', header: 'سایر سهام' },
      { accessorKey: 'otherAssets', header: 'سایر دارایی‌ها' },
    ],
  },
  {
    header: 'قیمت',
    columns: [
      { accessorKey: 'statisticalPrice', header: 'آماری' },
      { accessorKey: 'cancellationPrice', header: 'ابطال' },
      { accessorKey: 'issuancePrice', header: 'صدور' },
    ],
  },
  {
    header: 'بازده',
    columns: [
      { accessorKey: 'dailyReturn', header: 'روزانه' },
      { accessorKey: 'weeklyReturn', header: 'هفتگی' },
      { accessorKey: 'monthlyReturn', header: 'ماهانه' },
      { accessorKey: 'quarterlyReturn', header: 'سه ماهه' },
      { accessorKey: 'yearlyReturn', header: 'یک ساله' },
      { accessorKey: 'customRangeReturn', header: 'بازه دلخواه' },
    ],
  },
  {
    header: 'آلفا',
    columns: [
      { accessorKey: 'dailyAlpha', header: 'روزانه' },
      { accessorKey: 'weeklyAlpha', header: 'هفتگی' },
      { accessorKey: 'monthlyAlpha', header: 'ماهانه' },
      { accessorKey: 'quarterlyAlpha', header: 'سه ماهه' },
      { accessorKey: 'yearlyAlpha', header: 'یک ساله' },
      { accessorKey: 'customRangeAlpha', header: 'بازه دلخواه' },
    ],
  },
  {
    header: 'انحراف معیار',
    columns: [
      { accessorKey: 'weeklyStdDev', header: 'هفتگی' },
      { accessorKey: 'monthlyStdDev', header: 'ماهانه' },
      { accessorKey: 'quarterlyStdDev', header: 'سه ماهه' },
      { accessorKey: 'yearlyStdDev', header: 'یک ساله' },
      { accessorKey: 'customRangeStdDev', header: 'بازه دلخواه' },
    ],
  },
  {
    header: 'بیشترین ریزش',
    columns: [
      { accessorKey: 'weeklyMaxDrawdown', header: 'هفتگی' },
      { accessorKey: 'monthlyMaxDrawdown', header: 'ماهانه' },
      { accessorKey: 'quarterlyMaxDrawdown', header: 'سه ماهه' },
      { accessorKey: 'yearlyMaxDrawdown', header: 'یک ساله' },
      { accessorKey: 'customRangeMaxDrawdown', header: 'بازه دلخواه' },
    ],
  },
  {
    header: 'میانگین اهرم',
    columns: [
      { accessorKey: 'weeklyLeverage', header: 'هفتگی' },
      { accessorKey: 'monthlyLeverage', header: 'ماهانه' },
      { accessorKey: 'quarterlyLeverage', header: 'سه ماهه' },
      { accessorKey: 'yearlyLeverage', header: 'یک ساله' },
      { accessorKey: 'customRangeLeverage', header: 'بازه دلخواه' },
    ],
  },
  {
    header: 'نسبت شارپ',
    columns: [
      { accessorKey: 'weeklySharpeRatio', header: 'هفتگی' },
      { accessorKey: 'monthlySharpeRatio', header: 'ماهانه' },
      { accessorKey: 'quarterlySharpeRatio', header: 'سه ماهه' },
      { accessorKey: 'yearlySharpeRatio', header: 'یک ساله' },
      { accessorKey: 'customRangeSharpeRatio', header: 'بازه دلخواه' },
    ],
  },
  {
    header: 'نسبت اطلاعاتی',
    columns: [
      { accessorKey: 'weeklyInfoRatio', header: 'هفتگی' },
      { accessorKey: 'monthlyInfoRatio', header: 'ماهانه' },
      { accessorKey: 'quarterlyInfoRatio', header: 'سه ماهه' },
      { accessorKey: 'yearlyInfoRatio', header: 'یک ساله' },
      { accessorKey: 'customRangeInfoRatio', header: 'بازه دلخواه' },
    ],
  },
];
