import { RefObject } from "react";

type UseSmartTableScrollReturn = {
  handleScrollRight: () => void;
  handleScrollLeft: () => void;
};

export const useSmartTableScroll = (
  headerRefs: RefObject<(HTMLTableCellElement | null)[]>,
  tableRef: RefObject<HTMLDivElement>
): UseSmartTableScrollReturn => {
  // Calculates the left offset for each scrollable column.
  // Skips the first column (index === 0) since it's fixed and should not be scrolled.
  const getColumnOffsets = (): number[] => {
    const refs = headerRefs.current || [];
    const offsets: number[] = [];
    let currentOffset = 0;

    refs.forEach((ref, index) => {
      const width = ref?.offsetWidth || 0;
      if (index > 0) offsets.push(currentOffset);
      currentOffset += width;
    });

    return offsets;
  };

  // Determines which column index the current scrollLeft falls into.
  const getCurrentColumnIndex = (scrollLeft: number): number => {
    const offsets = getColumnOffsets();
    for (let i = 0; i < offsets.length - 1; i++) {
      if (scrollLeft >= offsets[i] && scrollLeft < offsets[i + 1]) {
        return i;
      }
    }
    return offsets.length - 1;
  };

  // Smoothly scrolls the table to the specified column index (RTL-aware).
  const scrollToColumn = (index: number) => {
    const offsets = getColumnOffsets();
    const scrollTo = offsets[index] || 0;
    tableRef.current?.scrollTo({ left: -scrollTo, behavior: "smooth" });
  };

  // Handles scrolling one column to the right (i.e., visually to the left in RTL).
  const handleScrollRight = () => {
    let scrollLeft = tableRef.current?.scrollLeft ?? 0;
    scrollLeft = -scrollLeft;

    const offsets = getColumnOffsets();
    const currentIndex = getCurrentColumnIndex(scrollLeft);

    const currentStart = offsets[currentIndex];
    const currentEnd = offsets[currentIndex + 1] ?? currentStart;

    if (scrollLeft > currentStart && scrollLeft < currentEnd) {
      const diff = currentEnd - scrollLeft;
      tableRef.current?.scrollBy({ left: -diff, behavior: "smooth" });
    } else {
      const nextIndex = Math.min(currentIndex + 1, offsets.length - 1);
      scrollToColumn(nextIndex);
    }
  };

  // Handles scrolling one column to the left (i.e., visually to the right in RTL).
  const handleScrollLeft = () => {
    let scrollLeft = tableRef.current?.scrollLeft ?? 0;
    scrollLeft = -scrollLeft;

    const offsets = getColumnOffsets();
    const currentIndex = getCurrentColumnIndex(scrollLeft);
    const currentStart = offsets[currentIndex];
    const currentEnd = offsets[currentIndex + 1] ?? currentStart;

    if (scrollLeft > currentStart && scrollLeft < currentEnd) {
      const diff = scrollLeft - currentStart;
      tableRef.current?.scrollBy({ left: diff, behavior: "smooth" });
    } else {
      const prevIndex = Math.max(currentIndex - 1, 0);
      scrollToColumn(prevIndex);
    }
  };

  return { handleScrollRight, handleScrollLeft };
};