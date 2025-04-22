import * as React from 'react';
import { useWindowScroll } from '@uidotdev/usehooks';

type UseHeaderVisibilityResult = {
  isHeaderVisible: boolean;
  contentStart: number;
};

export const useHeaderVisibility = (): UseHeaderVisibilityResult => {
  const [{ y: scrollY }] = useWindowScroll();
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const lastScrollY = React.useRef(0); // Ref to track the previous scroll position

  // Throttle scroll event handling
  React.useEffect(() => {
    const currentScrollY = scrollY ?? 0;
    const lastScrollValue = lastScrollY.current;

    const isScrollingDown = currentScrollY > lastScrollValue;
    const isPastThreshold = currentScrollY > 150;

    if (isScrollingDown && isPastThreshold) {
      setIsHeaderVisible(false);
    } else if (!isScrollingDown) {
      setIsHeaderVisible(true);
    }

    lastScrollY.current = currentScrollY;
  }, [scrollY]);

  const contentStart = isHeaderVisible ? 80 : 0;

  return { isHeaderVisible, contentStart };
};
