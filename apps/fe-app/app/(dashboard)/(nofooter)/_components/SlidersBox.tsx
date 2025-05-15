'use client';

import {
  AddReportButton,
  AutoRotateSwitch,
  AutoRotationOff,
  HorizontalScrollBar,
} from 'design-system';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DashboardNumberAndName } from './DashboardNumberAndName';
import Image from 'next/image';
import { ReportSelectionPopup } from '../../../components';
import { tempData } from './ReportCardTestData';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Item {
  id: string;
  type: 'image' | 'button';
  content: string;
}

function SortableItem({ item }: { item: Item }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transition,
    zIndex: isDragging ? 10 : undefined,
    transform: CSS.Translate.toString(transform),
    rotate: isDragging ? '-8deg' : undefined,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="shadow-6xl relative h-[336px] w-full overflow-hidden rounded-2xl border-2 border-gray-200"
    >
      {item.type === 'image' && (
        <Image
          fill
          src={item.content}
          alt="slider-image"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

const CARD_HEIGHT = 336;

export const SlidersBox: React.FC = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const [activeRotate, setActiveRotate] = useState<number | null>(null);
  const [barsNumber, setBarsNumber] = useState(0);
  const [isProgamScroll, setIsProgramScroll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialImages = [
    '/charts/Report 6.png?v=2',
    '/charts/Report 7.png?v=2',
    '/charts/Report 8.png?v=2',
    '/charts/Report 9.png?v=2',
    '/charts/Report 10.png?v=2',
  ];
  const [items, setItems] = useState<Item[]>(
    initialImages.map((url, index) => ({
      id: `image-${index}`,
      type: 'image',
      content: url,
    })),
  );
  const [isReportSelectionPopupOpen, setIsReportSelectionPopupOpen] =
    useState(false);
  function generateTooltips(totalSlides: number): string[] {
    const slidesPerGroup = window.matchMedia('(min-width: 1280px)').matches
      ? 4
      : 2;
    const groups = Math.ceil(totalSlides / slidesPerGroup);
    const tooltips: string[] = [];
    for (let i = 0; i < groups; i++) {
      const start = i * slidesPerGroup + 1;
      const end = Math.min((i + 1) * slidesPerGroup, totalSlides);
      if (start !== end) {
        tooltips.push(`اسلاید ${end}-${start}`);
      } else {
        tooltips.push(`اسلاید ${end}`);
      }
    }
    return tooltips;
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Compute number of scroll positions
  useEffect(() => {
    const calculateBars = () => {
      const total = items.length + 1; // include AddReportButton
      const cols = window.matchMedia('(min-width: 1280px)').matches ? 4 : 2;
      setBarsNumber(Math.ceil(total / cols));
    };
    calculateBars();
    window.addEventListener('resize', calculateBars);
    return () => window.removeEventListener('resize', calculateBars);
  }, [items]);

  // Manual scroll sync and stop auto-rotate
  useEffect(() => {
    let scrollTimeout: number | null = null;

    const onScroll = () => {
      if (isProgamScroll) {
        // Ignore this scroll event, reset the flag after a short delay
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(() => setIsProgramScroll(false), 300);
        return;
      }
      if (activeRotate !== null) {
        // User scrolled during auto-rotate, stop auto-rotation
        setActiveRotate(null);
      }
      const index = Math.floor(((window.scrollY / CARD_HEIGHT) * 2) / 3);
      const bounded = Math.min(Math.max(index, 0), barsNumber - 1);
      if (bounded !== currIndex) {
        setCurrIndex(bounded);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onScroll();
      }
    };

    window.addEventListener('keydown', handleEsc, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', handleEsc);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [barsNumber, currIndex, activeRotate, isProgamScroll]);

  const handleScroll = useCallback(
    (index: number) => {
      const bounded = Math.min(Math.max(index, 0), barsNumber - 1);
      setCurrIndex(bounded);
      setIsProgramScroll(true);
      window.scrollTo({
        top: bounded * CARD_HEIGHT * 1.5 + 80,
        behavior: 'smooth',
      });
    },
    [barsNumber],
  );

  // Auto-rotate index increment
  const scrollProgammaticly = () => {
    setIsProgramScroll(true);
    setCurrIndex((prev) => (prev + 1) % barsNumber);
  };
  useEffect(() => {
    if (activeRotate !== null && barsNumber > 1) {
      const intervalId = setInterval(() => {
        scrollProgammaticly();
      }, activeRotate * 1000);
      return () => clearInterval(intervalId);
    }
  }, [activeRotate, barsNumber]);

  // Auto-scroll on index change
  useEffect(() => {
    if (activeRotate !== null) {
      setIsProgramScroll(true);
      window.scrollTo({
        top: currIndex * CARD_HEIGHT * 1.5 + 80,
        behavior: 'smooth',
      });
    }
  }, [currIndex, activeRotate]);

  const handleRotation = (seconds: number | null) => {
    setActiveRotate(seconds);
    if (seconds !== null) {
      setCurrIndex(-1);
      setTimeout(() => {
        setCurrIndex(0);
      }, 50);

      window.scrollTo({ top: CARD_HEIGHT, behavior: 'smooth' });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((list) => {
        const oldIdx = list.findIndex((i) => i.id === active.id);
        const newIdx = list.findIndex((i) => i.id === over.id);
        return arrayMove(list, oldIdx, newIdx);
      });
      setCurrIndex(0);
      setActiveRotate(null);
    }
  };

  return (
    <>
      <div className="flex w-full justify-between">
        <DashboardNumberAndName number={2} title="صندوق کالایی" />
        <AutoRotateSwitch
          onChange={handleRotation}
          rotateOptions={[5, 10, 15]}
          initialValue={activeRotate}
        />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <section className="mt-6 flex w-fit justify-center">
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={rectSortingStrategy}
          >
            <div
              ref={containerRef}
              className="grid grid-cols-1 gap-6 xl:grid-cols-2"
            >
              {items.map((item) => (
                <SortableItem key={item.id} item={item} />
              ))}
              <div className="shadow-6xl relative h-[336px] w-full overflow-hidden rounded-2xl border-2 border-gray-200">
                <AddReportButton
                  onClick={() => setIsReportSelectionPopupOpen(true)}
                />
              </div>
            </div>
          </SortableContext>
        </section>
      </DndContext>

      <div className="fixed right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-2">
        <HorizontalScrollBar
          onChangeIndex={handleScroll}
          barsNumber={barsNumber}
          externalIndex={currIndex}
          autoRotate={Boolean(activeRotate)}
          autoRotateDuration={activeRotate || undefined}
          tooltips={generateTooltips(initialImages.length)}
          onAddReportClick={() => setIsReportSelectionPopupOpen(true)}
        />
        {activeRotate && (
          <AutoRotationOff onClick={() => setActiveRotate(null)} />
        )}
      </div>

      <ReportSelectionPopup
        isOpen={isReportSelectionPopupOpen}
        category="درآمد ثابت"
        isNew
        onSubmit={() => setIsReportSelectionPopupOpen(false)}
        onClose={() => setIsReportSelectionPopupOpen(false)}
        summary="این گزارش نرخ بازده تا سررسید (YTM) اوراق با درآمد ثابت را به نمایش گذاشته است. این نرخ به ساختار اقتصادی کشور مربوط می‌باشد و اگر تغییرات شدید نرخ با عدم تغییر ساختار اقتصادی همراه باشد به میانگین تاریخی خود باز می‌گردد."
        title="سهم تاثیر بازدهی صنایع در شاخص"
        video
        report={tempData}
      />
    </>
  );
};
