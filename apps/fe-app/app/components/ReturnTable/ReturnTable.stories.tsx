import { Meta, StoryObj } from '@storybook/react/*';
import { ReturnTable } from './ReturnTable';

const meta: Meta<typeof ReturnTable> = {
  title: 'Components/ReturnTable',
  component: ReturnTable,
};

export default meta;

type story = StoryObj<typeof ReturnTable>;
const dataStructure = {
  rows: [
    'صندوق سهم آشنا',
    'صندوق های سهامی',
    'شاخص کل',
    'رتبه چارکی صندوق',
    'رتبه درصدی صندوق',
    'میانگین اهرم صندوق',
  ],
  columns: [
    '1398',
    '1399',
    '1400',
    '1401',
    '1402',
    '1403',
    'میانگین',
    'انحراف معیار از میانگین',
  ],
  data: [
    [null, +25, 25, 1, 25, 1, 34, 23], // Data for "صندوق سهم آشنا"
    [null, -23, 23, 3, 23, 5, 43, 12], // Data for "صندوق های سهامی"
    [null, 67, -67, 2, 67, 3, 12, 23], // Data for "شاخص کل"
    [null, 1, 3, 2, 4, 1, 2, 3], // Data for "رتبه چارکی صندوق"
    [null, 45, 45, 1, 45, 1, 7, 3], // Data for "رتبه درصدی صندوق"
    [null, 67, 67, 2, 67, 2, 5, 2], // Data for "میانگین اهرم صندوق"
  ],
};
export const Default: story = {
  render: () => (
    <ReturnTable
      columns={dataStructure.columns}
      data={dataStructure.data}
      rows={dataStructure.rows}
    />
  ),
};
