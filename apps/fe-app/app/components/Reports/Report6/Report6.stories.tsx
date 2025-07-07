import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Report6 } from './Report6';
import {
  Report6CalculationResult,
  useReportsServiceGetReportsByReportId,
} from '@openapi';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../../lib/react-query';

const meta: Meta<typeof Report6> = {
  component: Report6,
  title: 'Reports/Report6',
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Report6>;

const Report6WithData = () => {
  const { data, isLoading } = useReportsServiceGetReportsByReportId({
    reportId: 6,
  });

  if (isLoading || !data) return <div>Loading...</div>;

  const report6Data = data.reportCalculation
    ?.calculation as Report6CalculationResult;

  return <Report6 data={report6Data.data} />;
};

export const Default: Story = {
  render: () => <Report6WithData />,
};
