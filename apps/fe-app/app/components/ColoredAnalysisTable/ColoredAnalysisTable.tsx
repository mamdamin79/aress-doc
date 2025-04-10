import { Column, GeneralTable, RowData, TableRow } from 'design-system';
import React from 'react';
interface ColoredAnalysisTableProps {
  data: RowData<TableRow>[];
  schema: Column<TableRow>[];
}
export const ColoredAnalysisTable: React.FC<ColoredAnalysisTableProps> = ({
  data,
  schema,
}) => {
  return (
    <GeneralTable
      data={data}
      schema={schema}
      tableDataStyleClasses="pl-4"
      border={true}
    />
  );
};
