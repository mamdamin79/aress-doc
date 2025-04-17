import { Meta, StoryObj } from '@storybook/react/*';
import { ReturnTable } from './ReturnTable';
import { schema } from './ReturnTable.constants';
import { addFormatsToRows } from 'design-system';

const meta: Meta<typeof ReturnTable> = {
  title: 'Components/ReturnTable',
  component: ReturnTable,
};

export default meta;

type Story = StoryObj<typeof ReturnTable>;

export const Default: Story = {
  render: (args) => (
    <ReturnTable
      data={addFormatsToRows(
        [
          {
            index: -1,
            format: { type: 'percent', precision: 0, signed: false },
          },
          {
            index: -2,
            format: { type: 'percent', precision: 0, signed: false },
          },
        ],
        args.data,
      )}
      // we should pass a sample of data so it can generate years keys from data
      schema={schema(args.data[0])}
    />
  ),
  args: {
    data: [
      {
        name: 'صندوق سهم آشنا',
        '1398': null,
        '1399': 25.5,
        '1400': -27.7,
        '1401': 25.0,
        '1402': 24.0,
        '1403': 21.5,
        average: null,
        stdDev: 23,
      },
      {
        name: 'صندوق های سهامی',
        '1398': null,
        '1399': 23.3,
        '1400': -24.5,
        '1401': 24.5,
        '1402': 21.5,
        '1403': 21.1,
        average: null,
        stdDev: 23,
      },
      {
        name: 'شاخص کل',
        '1398': null,
        '1399': 21.3,
        '1400': -21.0,
        '1401': 24.5,
        '1402': 24.7,
        '1403': 21.2,
        average: null,
        stdDev: 23,
      },
      {
        name: 'رتبه چارکی صندوق',
        '1398': 3,
        '1399': 1,
        '1400': 2,
        '1401': 2,
        '1402': 4,
        '1403': 1,
        average: 2,
        stdDev: 3,
        format: 'quarterSymbol',
      },
      {
        name: 'رتبه درصدی صندوق',
        '1398': 34,
        '1399': 27,
        '1400': 25,
        '1401': 22,
        '1402': 21,
        '1403': 20,
        average: 24,
        stdDev: 23,
      },
      {
        name: 'میانگین اهرم صندوق',
        '1398': 2.4,
        '1399': 2.6,
        '1400': 2.7,
        '1401': 2.6,
        '1402': 2.7,
        '1403': 2.7,
        average: 2.6,
        stdDev: 23,
      },
    ],
  },
};
