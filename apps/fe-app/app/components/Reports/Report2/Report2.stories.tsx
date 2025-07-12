import type { Meta, StoryObj } from '@storybook/react';
import { Report2 } from './index';

const meta: Meta<typeof Report2> = {
  component: Report2, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof Report2>;

export const Default: Story = {
  args: {
    data: {
      data: [
        {
          sectorTitle: "بانکها و موسسات اعتباری",
          netFlow: 29492819697469
        },
        {
          sectorTitle: "فلزات اساسی",
          netFlow: 15819346429593
        },
        {
          sectorTitle: "خودرو و ساخت قطعات",
          netFlow: 14738775433916
        },
        {
          sectorTitle: "سرمایه گذاریها",
          netFlow: 8679872170677
        },
        {
          sectorTitle: "استخراج کانه های فلزی",
          netFlow: 8601825829526
        }
      ]
    },
    filters : [
      {
        parentTitle: null,
        title: 'جریان پول',
        searchable: false,
        options: [
          { identifier: '1', title: 'ورود' },
          { identifier: '2', title: 'خروج' },
        ],
        selectedOption: {
          identifier: '1',
          title: 'ورود',
        },
        optionType: 'InflowOutflowFilterOption',
      },
      {
        parentTitle: 'نمودار میله‌ای',
        title: 'نوع سرمایه‌گذار',
        searchable: false,
        options: [
          { identifier: '1', title: 'حقیقی' },
          { identifier: '2', title: 'حقوقی' },
        ],
        selectedOption: {
          identifier: '1',
          title: 'حقیقی',
        },
        optionType: 'ClientTypeFilterOption',
      },
      {
        parentTitle: null,
        title: 'بازه زمانی',
        searchable: false,
        options: [
          { identifier: '1', title: 'یک ماه اخیر' },
          { identifier: '2', title: 'سه ماه اخیر' },
          { identifier: '3', title: 'شش ماه اخیر' },
          { identifier: '4', title: 'نه ماه اخیر' },
          { identifier: '5', title: 'یک سال اخیر' },
        ],
        selectedOption: {
          identifier: '1',
          title: 'یک ماه اخیر',
        },
        optionType: 'JDateRangeFilterOption',
      },
    ],
    title: 'بیشترین ورود سرمایه‌گذار حقیقی در صنایع - شش ماه گذشته',
  },
};