'use client';
import {
  AddReportButton,
  AutoRotateSwitch,
  HorizontalScrollBar,
} from 'design-system';
import React, { useEffect, useRef, useState } from 'react';
import { DashboardNumberAndName } from './DashboardNumberAndName';

export const SlidersBox: React.FC = () => {
  const [activeRotate, setActiveRotate] = useState<number | null>(null);
  const [currIndex, setCurrIndex] = useState(0);
  const slides = 6;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            const gridNumber = window.innerWidth >= 1280 ? 2 : 1;
            const calculatedIndex = Math.floor(index / gridNumber);
            setCurrIndex(calculatedIndex);
            window.location.hash = `slide-${calculatedIndex}`;
          }
        });
      },
      { threshold: 0.95 },
    );

    const elements = containerRef.current?.children;
    if (elements) {
      Array.from(elements).forEach((el) => observer.observe(el));
    }

    return () => {
      if (elements) {
        Array.from(elements).forEach((el) => observer.unobserve(el));
      }
    };
  }, []);
  const scrollStep = window.innerWidth >= 1280 ? 2 : 1;
  const barsNumber = Math.ceil(slides / scrollStep);
  const handleScroll = (index: number) => {
    const targetElement = document.getElementById(`slide-${index}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  return (
    <>
      <div className="flex w-full justify-between">
        <DashboardNumberAndName number={2} title="صندوق کالایی" />
        <AutoRotateSwitch
          onChange={(item) => setActiveRotate(item)}
          rotateOptions={[5, 10, 15]}
          initialValue={activeRotate}
        />
      </div>
      <section className="mt-8 flex w-fit justify-center">
        <div
          ref={containerRef}
          className="grid w-[616px] grid-cols-1 gap-6 xl:w-[1256px] xl:grid-cols-2"
        >
          {Array.from({ length: slides }).map((_, index) => (
            <div
              key={index}
              data-index={index}
              id={`slide-${index}`}
              className="shadow-6xl h-[336px] overflow-hidden rounded-2xl border-2 border-gray-200"
            >
              <AddReportButton onClick={() => {}} />
            </div>
          ))}
        </div>
      </section>

      <div className="fixed right-4 top-1/2">
        <HorizontalScrollBar
          onChangeIndex={(index) => handleScroll(index)}
          barsNumber={barsNumber}
          externalIndex={currIndex}
        />
      </div>
    </>
  );
};
