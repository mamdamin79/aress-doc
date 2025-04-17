import { Column, GeneralTable, RowData, TableRow } from 'design-system';
import React from 'react';
interface ReturnTableProps {
  data: RowData<TableRow>[];
  schema: Column<TableRow>[];
}
export const ReturnTable: React.FC<ReturnTableProps> = ({ data, schema }) => {
  return (
    <GeneralTable
      data={data}
      schema={schema}
    />
  );
};
