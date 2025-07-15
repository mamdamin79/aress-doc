'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AddReportButton } from 'design-system';

type SortableAddReportButtonProps = {
  slotId: string;
  onClick: () => void;
};

export const SortableAddReportButton: React.FC<SortableAddReportButtonProps> = ({
  slotId,
  onClick,
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
        className="absolute left-0 top-0 z-10 h-14 w-full cursor-grab"
        {...attributes}
        {...listeners}
      />
      <AddReportButton onClick={onClick} />
    </div>
  );
};
