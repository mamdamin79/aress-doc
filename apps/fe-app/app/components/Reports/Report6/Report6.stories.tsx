import { Meta, StoryObj } from '@storybook/nextjs';
import { Report6 } from './Report6';

const meta: Meta<typeof Report6> = {
  component: Report6,
};

export default meta;

type Story = StoryObj<typeof Report6>;

export const Default: Story = {
  args: {
    data: {
      data: [
        {
          dt: '2025-06-28',
          indexValue: 2984605.4,
          netFlow: -21029069838598,
        },
        {
          dt: '2025-06-29',
          indexValue: 2984605.4,
          netFlow: -17965255919854,
        },
        {
          dt: '2025-06-30',
          indexValue: 2984605.4,
          netFlow: -47107096710076,
        },
        {
          dt: '2025-07-01',
          indexValue: 2984605.4,
          netFlow: -62606584961446,
        },
        {
          dt: '2025-07-02',
          indexValue: 2922629.1,
          netFlow: -90901711933910,
        },
      ],
    },
    filters: [
      {
        parentTitle: 'نمودار خطی',
        title: 'نام شاخص',
        searchable: false,
        options: [
          {
            identifier: '1',
            title: 'شاخص کل',
          },
          {
            identifier: '2',
            title: 'شاخص کل (هم وزن)',
          },
          {
            identifier: '3',
            title: 'شاخص قیمت(وزنی-ارزشی)',
          },
          {
            identifier: '4',
            title: 'شاخص قیمت (هم وزن)',
          },
        ],
        selectedOption: {
          identifier: '1',
          title: 'شاخص کل',
        },
        optionType: 'IndexNameFilterOption',
      },
      {
        parentTitle: 'نمودار میله ای',
        title: 'نوع سرمایه گذار',
        searchable: false,
        options: [
          {
            identifier: '1',
            title: 'حقیقی',
          },
          {
            identifier: '2',
            title: 'حقوقی',
          },
        ],
        selectedOption: {
          identifier: '1',
          title: 'حقیقی',
        },
        optionType: 'ClientTypeFilterOption',
      },
      {
        parentTitle: null,
        title: 'تفکیک زمانی',
        searchable: false,
        options: [
          {
            identifier: '1',
            title: 'روزانه',
          },
          {
            identifier: '2',
            title: 'هفتگی',
          },
          {
            identifier: '3',
            title: 'ماهانه',
          },
          {
            identifier: '4',
            title: 'سالانه',
          },
        ],
        selectedOption: {
          identifier: '1',
          title: 'روزانه',
        },
        optionType: 'JDateRangeSeparatedFilerOption',
      },
    ],
  },
};
