import type { Meta, StoryObj } from '@storybook/react';
import { ColoredAnalysisTable } from './ColoredAnalysisTable';
import { data, schema } from './ColoredAnalysisTable.constants';

const meta: Meta<typeof ColoredAnalysisTable> = {
  title: 'Components/ColoredAnalysisTable',
  component: ColoredAnalysisTable,
};

export default meta;

type Story = StoryObj<typeof ColoredAnalysisTable>;

export const Default: Story = {
  render: () => <ColoredAnalysisTable data={data} schema={schema} />,

};
