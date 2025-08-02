import { useEffect, useState } from 'react';

const CARD_HEIGHT = 336;

export function useAutoRotate({
  barsNumber,
  onRotate,
}: {
  barsNumber: number;
  onRotate: (nextIndex: number) => void;
}) {
  const [activeRotate, setActiveRotate] = useState<number | null>(null);
  const [currIndex, setCurrIndex] = useState(0);
  const [isProgramScroll, setIsProgramScroll] = useState(false);

  const scrollToIndex = (index: number) => {
    const bounded = Math.min(Math.max(index, 0), barsNumber - 1);
    setCurrIndex(bounded);
    setIsProgramScroll(true);
    const scrollAmount =
      bounded === 0 ? 160 : bounded * CARD_HEIGHT * 2.15 + 160;
    window.scrollTo({ top: scrollAmount, behavior: 'smooth' });
  };

  // Manual scroll detection to stop auto-rotation
  useEffect(() => {
    let scrollTimeout: number | null = null;

    const onScroll = () => {
      if (isProgramScroll) {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(() => setIsProgramScroll(false), 300);
        return;
      }
      if (activeRotate !== null) setActiveRotate(null);
      const index = Math.floor(((window.scrollY / CARD_HEIGHT) * 2) / 3);
      const bounded = Math.min(Math.max(index, 0), barsNumber - 1);
      if (bounded !== currIndex) setCurrIndex(bounded);
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', handleEsc, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', handleEsc);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [barsNumber, currIndex, activeRotate, isProgramScroll]);

  // Auto-rotation timer
  useEffect(() => {
    if (activeRotate !== null && barsNumber > 1) {
      const interval = setInterval(() => {
        const nextIndex = (currIndex + 1) % barsNumber;
        setCurrIndex(nextIndex);
        setIsProgramScroll(true);
        onRotate(nextIndex);
      }, activeRotate * 1000);
      return () => clearInterval(interval);
    }
  }, [activeRotate, currIndex, barsNumber]);

  // Scroll to current index when changed (manually or auto)
  useEffect(() => {
    if (activeRotate !== null) {
      scrollToIndex(currIndex);
    }
  }, [currIndex, activeRotate]);

  const handleRotation = (seconds: number | null) => {
    setActiveRotate(seconds);
    if (seconds !== null) {
      setCurrIndex(-1);
      setTimeout(() => setCurrIndex(0), 50);
      window.scrollTo({ top: CARD_HEIGHT, behavior: 'smooth' });
    }
  };

  return {
    currIndex,
    activeRotate,
    setActiveRotate,
    handleRotation,
    scrollToIndex,
  };
}
