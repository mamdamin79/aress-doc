'use client';

import {
  AddReportButton,
  AutoRotateSwitch,
  AutoRotationOff,
  HorizontalScrollBar,
} from 'design-system';
import React, { useEffect, useRef, useState } from 'react';
import { DashboardNumberAndName } from './DashboardNumberAndName';

export const SlidersBox: React.FC = () => {
  const [activeRotate, setActiveRotate] = useState<number | null>(null);
  const [currIndex, setCurrIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const slides = 6;
  const containerRef = useRef<HTMLDivElement>(null);

  // Handles user manual scrolling
  const onUserScroll = () => {
    if (activeRotate !== null && !isAutoScrolling) {
      setActiveRotate(null);
    }
  };

  useEffect(() => {
    // Scroll event listener
    window.addEventListener('scroll', onUserScroll);
    return () => {
      window.removeEventListener('scroll', onUserScroll);
    };
  }, [activeRotate, isAutoScrolling]);

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

    let intervalId: NodeJS.Timeout | null = null;
    if (activeRotate !== null) {
      intervalId = setInterval(() => {
        setCurrIndex((prev) => {
          const nextIndex = (prev + 1) % slides;
          handleScroll(nextIndex);
          return nextIndex;
        });
      }, activeRotate * 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (elements) {
        Array.from(elements).forEach((el) => observer.unobserve(el));
      }
    };
  }, [activeRotate]);

  const handleRotation = (time: number | null) => {
    setActiveRotate(time);
  };

  const scrollStep =
    typeof window !== 'undefined' && window.innerWidth >= 1280 ? 2 : 1;
  const barsNumber = Math.ceil(slides / scrollStep);

  const handleScroll = (index: number) => {
    setIsAutoScrolling(true);

    const targetElement = document.getElementById(`slide-${index}`);
    if (targetElement) {
      const blockPosition = scrollStep === 2 ? 'start' : 'center';
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: blockPosition,
      });

      // Reset `isAutoScrolling` after a delay
      setTimeout(() => setIsAutoScrolling(false), 800);
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
              <AddReportButton onClick={() => console.log('add')} />
            </div>
          ))}
        </div>
      </section>

      <div className="fixed right-4 top-1/2 flex flex-col items-center justify-center gap-2">
        <HorizontalScrollBar
          onChangeIndex={handleScroll}
          barsNumber={barsNumber}
          externalIndex={currIndex}
          autoRotate={Boolean(activeRotate)}
          autoRotateDuration={activeRotate || undefined}
        />
        {activeRotate && (
          <AutoRotationOff onClick={() => setActiveRotate(null)} />
        )}
      </div>
    </>
  );
};
