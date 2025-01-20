"use client"
import * as React from 'react';
import { useWindowScroll } from '@uidotdev/usehooks';

type UseHeaderVisibilityResult = {
  isHeaderVisible: boolean;
  contentStart: number;
  setIsHeaderVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useHeaderVisibility = (): UseHeaderVisibilityResult => {
  const [{ y: scrollY }] = useWindowScroll();
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const [contentStart, setContentStart] = React.useState(0);

  const lastScrollY = React.useRef<number>(0); // Ref to track the previous scroll position (default 0)

  React.useEffect(() => {
    const currentScrollY = scrollY ?? 0;
    const lastScrollValue = lastScrollY.current ?? 0;

    const isScrollingDown = currentScrollY > lastScrollValue;
    const isPastThreshold = currentScrollY > 100;

    setIsHeaderVisible(!(isScrollingDown && isPastThreshold));
    lastScrollY.current = currentScrollY;

    if (isHeaderVisible) {
      setContentStart(155);
    } else {
      setContentStart(72);
    }
  }, [scrollY]);

  return { isHeaderVisible, contentStart, setIsHeaderVisible };
};
