'use client';

import {
  AddReportButton,
  AutoRotateSwitch,
  AutoRotationOff,
  HorizontalScrollBar,
} from 'design-system';
import React, { useEffect, useRef, useState } from 'react';
import { DashboardNumberAndName } from './DashboardNumberAndName';
import Image from 'next/image';
import { ReportSelectionPopup } from '../../../components';
import { tempData } from './ReportCardTestData';

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
  const Images = [
    '/charts/Report 6.png',
    '/charts/Report 7.png',
    '/charts/Report 8.png',
    '/charts/Report 9.png',
    '/charts/Report 10.png',
  ];
  const [isReportSelectionPopupOpen, setIsReportSelectionPopupOpen] =
    useState(false);
  function generateTooltips(barsNumber: number, slides: number): string[] {
    const tooltips: string[] = [];
    const step = Math.ceil(slides / barsNumber);
    for (let i = 0; i < barsNumber; i++) {
      const start = i * step + 1;
      let end = (i + 1) * step;
      if (end > slides) end = slides;
      tooltips.push(`اسلاید ${start}-${end}`);
    }
    return tooltips;
  }
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
          {Images.map((imageURL, index) => (
            <div
              className="relative h-[336px] w-full overflow-hidden rounded-2xl"
              key={index}
            >
              <Image
                fill
                src={imageURL}
                alt="slider-image"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          <div className="shadow-6xl h-[336px] overflow-hidden rounded-2xl border-2 border-gray-200">
            <AddReportButton
              onClick={() => setIsReportSelectionPopupOpen(true)}
            />
          </div>
        </div>
      </section>

      <div className="fixed right-4 top-1/2 flex flex-col items-center justify-center gap-2">
        <HorizontalScrollBar
          onChangeIndex={handleScroll}
          barsNumber={barsNumber}
          externalIndex={currIndex}
          autoRotate={Boolean(activeRotate)}
          autoRotateDuration={activeRotate || undefined}
          tooltips={generateTooltips(barsNumber, slides)}
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
