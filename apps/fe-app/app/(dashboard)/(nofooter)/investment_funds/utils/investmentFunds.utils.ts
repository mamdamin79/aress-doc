import { useState } from 'react';
import { DragPosition } from '../types';
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDndMonitor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

export const useTableDragSensors = () => {
  return useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 250,
        distance: 0,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );
};

export const dragOverRef = {
  columnId: null as string | null,
  position: null as DragPosition | null,
};

export const useDragIndicator = () => {
  const [, forceRender] = useState({});

  useDndMonitor({
    onDragOver(event) {
      const overId = event.over?.id;
      const activeId = event.active?.id;
      const clientX = (event.activatorEvent as PointerEvent).clientX;

      if (!overId || !activeId || !clientX) return;

      const overEl = document.querySelector(
        `[data-column-id="${overId}"]`,
      ) as HTMLElement;
      if (!overEl) return;

      const overRect = overEl.getBoundingClientRect();
      const midpoint = overRect.left + overRect.width / 2;

      const pos: DragPosition = clientX > midpoint ? 'right' : 'left';

      if (dragOverRef.columnId !== overId || dragOverRef.position !== pos) {
        dragOverRef.columnId = String(overId);
        dragOverRef.position = pos;
        forceRender({});
      }
    },
    onDragEnd() {
      dragOverRef.columnId = null;
      dragOverRef.position = null;
      forceRender({});
    },
  });

  return dragOverRef;
};

