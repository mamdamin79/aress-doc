'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DynamicReportRenderer } from './DynamicReportRenderer';
import { FinancialReportCalculationApiModel } from '@openapi';

type SortableReportProps = {
  slotId: string;
  identifier: string;
  title: string;
  data: FinancialReportCalculationApiModel['calculation'];
  filters: FinancialReportCalculationApiModel['filters'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (changedOptions: Record<string, any>) => Promise<boolean>;
  onRemoveReport: () => void;
};

export const SortableReport: React.FC<SortableReportProps> = ({
  slotId,
  identifier,
  title,
  data,
  filters,
  onSubmit,
  onRemoveReport,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slotId });

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 10 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        className="absolute right-0 top-0 z-10 h-14 w-[550px] cursor-grab"
        {...attributes}
        {...listeners}
      />
      <DynamicReportRenderer
        title={title}
        identifier={identifier}
        data={data}
        filters={filters}
        onSubmit={onSubmit}
        onRemove={onRemoveReport}
      />
    </div>
  );
};
