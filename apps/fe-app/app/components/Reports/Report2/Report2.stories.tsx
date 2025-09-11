import type { Meta, StoryObj } from '@storybook/nextjs';
import { Report2 } from './index';

// Meta configuration for the Report2 component in Storybook
const meta: Meta<typeof Report2> = {
  component: Report2, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof Report2>;

export const Default: Story = {
  args: {
    data: {
      unit: 'میایون ریال',
      data: [
        {
          sectorTitle: 'بانکها و موسسات اعتباری',
          netFlow: 24645530863580,
        },
        {
          sectorTitle: 'فلزات اساسی',
          netFlow: 13613389147168,
        },
        {
          sectorTitle: 'خودرو و ساخت قطعات',
          netFlow: 10104172037745,
        },
        {
          sectorTitle: 'استخراج کانه های فلزی',
          netFlow: 8168074509902,
        },
        {
          sectorTitle: 'محصولات شیمیایی',
          netFlow: 6887404412862,
        },
      ],
    },
    filters: [
      {
        parentTitle: null,
        title: 'جریان پول',
        searchable: false,

        options: [
          {
            identifier: '1',
            title: 'ورود',
          },
          {
            identifier: '2',
            title: 'خروج',
          },
        ],

        selectedOption: {
          identifier: '2',
          title: 'خروج',
        },

        optionType: 'InflowOutflowFilterOption',
      },
      {
        parentTitle: null,
        title: 'نوع سرمایه‌گذار',
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
        title: 'بازه زمانی',
        searchable: false,

        options: [
          {
            identifier: '1',
            title: 'یک ماه اخیر',
          },
          {
            identifier: '2',
            title: 'سه ماه اخیر',
          },
          {
            identifier: '3',
            title: 'شش ماه اخیر',
          },
          {
            identifier: '4',
            title: 'نه ماه اخیر',
          },
          {
            identifier: '5',
            title: 'یک سال اخیر',
          },
        ],

        selectedOption: {
          identifier: '1',
          title: 'یک ماه اخیر',
        },

        optionType: 'JDateRangeFilterOption',
      },
    ],
  },
};
