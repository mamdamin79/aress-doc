import { Meta, StoryObj } from '@storybook/react/*';
import { ReturnTable } from './ReturnTable';
import { data, schema } from './ReturnTable.constants';

const meta: Meta<typeof ReturnTable> = {
  title: 'Components/ReturnTable',
  component: ReturnTable,
};

export default meta;

type Story = StoryObj<typeof ReturnTable>;

export const Default: Story = {
  render: () => <ReturnTable data={data} schema={schema} />,
};
