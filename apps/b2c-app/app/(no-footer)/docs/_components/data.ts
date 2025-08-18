import { DocContainerProps } from './DocContainer';
export interface DocumentSection {
  date: string;
  documents: DocContainerProps[];
}

export const documentsData: DocumentSection[] = [
  {
    date: '14 فروردین 1404',
    documents: [
      {
        title: 'گزارش حسابداری ماهانه',
        subtitle: 'اردیبهشت ماه',
        icon: 'calculator',
        downloadButtons: [
          {
            title: 'دانلود',
            icon: 'file-down',
          },
        ],
      },
      {
        title: 'گزارش عملکرد ماهانه',
        subtitle: 'اردیبهشت ماه',
        icon: 'chart-no-axes-combined',
        downloadButtons: [
          {
            title: 'دانلود',
            icon: 'file-down',
          },
        ],
      },
    ],
  },
  {
    date: '10 فروردین 1404',
    documents: [
      {
        title: 'فیش بانکی',
        subtitle: 'بانک ملت',
        icon: 'CustomMellat',
        downloadButtons: [
          {
            title: 'دانلود',
            icon: 'file-down',
          },
        ],
      },
      {
        title: 'مدارک صندوق',
        subtitle: 'صندوق حکمت',
        icon: 'folder',
        downloadButtons: [
          {
            title: 'امیدنامه',
            icon: 'file-down',
          },
          {
            title: 'اساسنامه',
            icon: 'file-down',
          },
          {
            title: 'بیانیه ریسک',
            icon: 'file-down',
          },
        ],
      },
      {
        title: 'گزارش عملکرد فصلی',
        subtitle: 'فصل زمستان',
        icon: 'trending-up',
        downloadButtons: [
          {
            title: 'دانلود',
            icon: 'file-down',
          },
        ],
      },
    ],
  },
  {
    date: '25 اسفند 1403',
    documents: [
      {
        title: 'گزارش سالانه',
        subtitle: 'سال 1403',
        icon: 'calendar',
        downloadButtons: [
          {
            title: 'دانلود',
            icon: 'file-down',
          },
        ],
      },
      {
        title: 'صورت‌های مالی',
        subtitle: 'سال مالی 1403',
        icon: 'calculator',
        downloadButtons: [
          {
            title: 'دانلود',
            icon: 'file-down',
          },
        ],
      },
    ],
  },
  {
    date: '15 اسفند 1403',
    documents: [
      {
        title: 'گزارش ماهانه سرمایه‌گذاری',
        subtitle: 'اسفند ماه',
        icon: 'trending-up',
        downloadButtons: [
          {
            title: 'دانلود',
            icon: 'file-down',
          },
        ],
      },
      {
        title: 'بیانیه ریسک به‌روزرسانی شده',
        subtitle: 'ویرایش جدید',
        icon: 'alert-triangle',
        downloadButtons: [
          {
            title: 'دانلود',
            icon: 'file-down',
          },
        ],
      },
    ],
  },
  {
    date: '01 اسفند 1403',
    documents: [
      {
        title: 'گزارش عملکرد دوره‌ای',
        subtitle: 'دوره 6 ماهه',
        icon: 'bar-chart-3',
        downloadButtons: [
          {
            title: 'دانلود',
            icon: 'file-down',
          },
        ],
      },
      {
        title: 'مدارک هویتی',
        subtitle: 'مدارک شناسایی',
        icon: 'user',
        downloadButtons: [
          {
            title: 'دانلود',
            icon: 'file-down',
          },
        ],
      },
    ],
  },
];
