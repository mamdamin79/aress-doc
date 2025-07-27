import type { Meta, StoryObj } from '@storybook/nextjs';
import { Report_13_1 } from './Report_13_1';
const meta: Meta<typeof Report_13_1> = {
  component: Report_13_1,
};

export default meta;

type Story = StoryObj<typeof Report_13_1>;

export const Default: Story = {
  args: {
    data: {
      lastDay: {
        totalTrades: 33442937749254,
        totalBuyIndividual: 6078251748115,
        totalBuyCorporate: 2830944958495,
        totalSellIndividual: 5130008594324,
        totalSellCorporate: 3779188112286,
      },
      lastDayNormalized: {
        totalTradesNormalized: 0.1147836532948024,
        totalBuyIndividualNormalized: 0.08338554327018738,
        totalBuyCorporateNormalized: 0,
        totalSellIndividualNormalized: 0,
        totalSellCorporateNormalized: 0.012761034806418953,
      },
      maxValue: {
        totalTrades: 291356275822320,
        totalBuyIndividual: 29044829508446,
        totalBuyCorporate: 213059155749514,
        totalSellIndividual: 119946541442356,
        totalSellCorporate: 122157443815604,
      },
      minValue: {
        totalTrades: 0,
        totalBuyIndividual: 3988953952797,
        totalBuyCorporate: 2830944958495,
        totalSellIndividual: 5130008594324,
        totalSellCorporate: 2249032704515,
      },
      averageValue: {
        totalTrades: 58250524591859.62,
        totalBuyIndividual: 13386222065752.867,
        totalBuyCorporate: 57661777728622.4,
        totalSellIndividual: 33452947457511.867,
        totalSellCorporate: 37595052336863.4,
      },
    },
    filters: [
      {
        parentTitle: null,
        title: 'نوع بازار',
        searchable: false,
        options: [
          {
            identifier: '1',
            title: 'کل بازار',
          },
          {
            identifier: '2',
            title: 'بورس',
          },
          {
            identifier: '3',
            title: 'فرابورس',
          },
        ],
        selectedOption: {
          identifier: '2',
          title: 'بورس',
        },
        optionType: 'InflowOutflowFilterOption',
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
