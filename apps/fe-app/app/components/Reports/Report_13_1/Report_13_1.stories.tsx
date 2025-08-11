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
      currencyUnit: 'میلیارد',
      lastDay: {
        totalTrades: 49138070581247,
        totalBuyIndividual: 15852582021815,
        totalBuyCorporate: 33285972463432,
        totalSellIndividual: 28242177089143,
        totalSellCorporate: 20896377396104,
      },
      lastDayNormalized: {
        totalTradesNormalized: 0.1403125747333915,
        totalBuyIndividualNormalized: 0.4734868690846156,
        totalBuyCorporateNormalized: 0.1448665114465125,
        totalSellIndividualNormalized: 0.20129651994813003,
        totalSellCorporateNormalized: 0.1555132331318542,
      },
      maxValue: {
        totalTrades: 291356275822320,
        totalBuyIndividual: 29044829508446,
        totalBuyCorporate: 213059155749514,
        totalSellIndividual: 119946541442356,
        totalSellCorporate: 122157443815604,
      },
      minValue: {
        totalTrades: 9604794851250,
        totalBuyIndividual: 3988953952797,
        totalBuyCorporate: 2830944958495,
        totalSellIndividual: 5130008594324,
        totalSellCorporate: 2249032704515,
      },
      averageValue: {
        totalTrades: 74306661184635.58,
        totalBuyIndividual: 14445879540391.445,
        totalBuyCorporate: 55236261029643.664,
        totalSellIndividual: 32793795426285.277,
        totalSellCorporate: 36888345143749.836,
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
