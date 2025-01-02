import * as React from 'react';
import { useWindowScroll } from '@uidotdev/usehooks';

type UseHeaderVisibilityResult = {
  isHeaderVisible: boolean;
  contentStart: number;
  headerRef: React.RefObject<HTMLDivElement>;
  setIsHeaderVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useHeaderVisibility = (): UseHeaderVisibilityResult => {
  const [{ y: scrollY }] = useWindowScroll();
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const [contentStart, setContentStart] = React.useState(0);

  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const lastScrollY = React.useRef<number>(0); // Ref to track the previous scroll position (default 0)

  React.useEffect(() => {
    const currentScrollY = scrollY ?? 0;
    const lastScrollValue = lastScrollY.current ?? 0;

    const isScrollingDown = currentScrollY > lastScrollValue;
    const isPastThreshold = currentScrollY > 100;

    setIsHeaderVisible(!(isScrollingDown && isPastThreshold));
    lastScrollY.current = currentScrollY;

    // Dynamically calculate content start only if headerRef is valid
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setContentStart(rect.bottom + currentScrollY);
    } else {
      setContentStart(0); // Fallback to 0 if the ref is null
    }
  }, [scrollY]);

  return { isHeaderVisible, contentStart, headerRef, setIsHeaderVisible };
};
