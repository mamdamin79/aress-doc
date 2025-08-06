import { Meta, StoryObj } from '@storybook/nextjs';
import { Report13_3 } from './Report13_3';

const meta: Meta<typeof Report13_3> = {
  component: Report13_3,
};

export default meta;

type Story = StoryObj<typeof Report13_3>;

export const Default: Story = {
  args: {
    data: {
      data: [
        {
          mean: 7.05653181542992,
          points: [
            { date: '2025-06-28', value: 30788784785779 },
            { date: '2025-06-29', value: 30405281689754 },
            { date: '2025-06-30', value: 87194219214295 },
            { date: '2025-07-01', value: 117202322640183 },
            { date: '2025-07-02', value: 242103985257960 },
            { date: '2025-07-03', value: 106557396483695 },
            { date: '2025-07-04', value: 69988139907382 },
            { date: '2025-07-05', value: 9566794851250 },
            { date: '2025-07-06', value: 73321292901219 },
            { date: '2025-07-07', value: 58848569449577 },
            { date: '2025-07-08', value: 80458353616971 },
            { date: '2025-07-09', value: 75856680940561 },
            { date: '2025-07-10', value: 7869499505404 },
            { date: '2025-07-11', value: 8909196706610 },
          ],
        },
      ],
    },
    filters: [
      {
        parentTitle: null,
        title: 'ارزش کل معاملات: ',
        searchable: false,
        options: [
          {
            identifier: '1',
            title: 'ارزش کل معاملات',
          },
          {
            identifier: '2',
            title: 'ارزش کل خرید حقیقی',
          },
          {
            identifier: '3',
            title: 'ارزش کل خرید حقوقی',
          },
          {
            identifier: '4',
            title: 'ارزش کل فروش حقیقی',
          },
          {
            identifier: '5',
            title: 'ارزش کل فروش حقوقی',
          },
        ],
        selectedOption: {
          identifier: '1',
          title: 'ارزش کل معاملات',
        },
        optionType: 'JDateRangeSeparatedFilerOption',
      },
      {
        parentTitle: null,
        title: 'کل بازار:‌',
        searchable: false,
        options: [
          {
            identifier: '1',
            title: 'کل بازار',
          },
          {
            identifier: '2',
            title: 'بازار بورس',
          },
          {
            identifier: '3',
            title: 'بازار فرابورس',
          },
        ],
        selectedOption: {
          identifier: '1',
          title: 'کل بازار',
        },
        optionType: 'JDateRangeSeparatedFilerOption',
      },
      {
        parentTitle: null,
        title: 'بازه زمانی: ',
        searchable: false,
        options: [
          {
            identifier: '1',
            title: 'یک ماه',
          },
          {
            identifier: '2',
            title: 'سه ماه',
          },
          {
            identifier: '3',
            title: 'شش ماه',
          },
          {
            identifier: '4',
            title: 'نه ماه',
          },
          {
            identifier: '5',
            title: 'یک سال',
          },
        ],
        selectedOption: {
          identifier: '3',
          title: 'شش ماه',
        },
        optionType: 'JDateRangeSeparatedFilerOption',
      },
    ],
  },
};
