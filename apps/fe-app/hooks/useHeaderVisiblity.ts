"use client";
import * as React from "react";
import { useWindowScroll } from "@uidotdev/usehooks";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const HEADER_KEY = ["isHeaderVisible"];

export const useHeaderVisibility = () => {
  const queryClient = useQueryClient();
  const [{ y: scrollY }] = useWindowScroll();
  const lastScrollY = React.useRef(0);

  const { data: isHeaderVisible = true } = useQuery<boolean>({
    queryKey: HEADER_KEY,
    queryFn: () => true,
    staleTime: Infinity,
  });

  const setIsHeaderVisible = (value: boolean) => {
    queryClient.setQueryData(HEADER_KEY, value);
  };

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

  return {
    isHeaderVisible,
    contentStart,
    setIsHeaderVisible,
  };
};
