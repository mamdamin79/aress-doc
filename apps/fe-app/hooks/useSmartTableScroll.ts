import { RefObject } from "react";

type UseSmartTableScrollReturn = {
  handleScrollRight: () => void;
  handleScrollLeft: () => void;
};

export const useSmartTableScroll = (
  headerRefs: RefObject<(HTMLTableCellElement | null)[]>,
  tableRef: RefObject<HTMLDivElement>
): UseSmartTableScrollReturn => {
const getColumnOffsets = (): number[] => {
  const refs = headerRefs.current || [];
  const offsets: number[] = [];
  let currentOffset = 0;

  refs.forEach((ref, index) => {
    const width = ref?.offsetWidth || 0;
    if (index > 0) offsets.push(currentOffset); // ستون اول رو نادیده بگیر
    currentOffset += width;
  });

  return offsets;
};

  const getCurrentColumnIndex = (scrollLeft: number): number => {
    const offsets = getColumnOffsets();
    for (let i = 0; i < offsets.length - 1; i++) {
      if (scrollLeft >= offsets[i] && scrollLeft < offsets[i + 1]) {
        return i;
      }
    }
    return offsets.length - 1;
  };

  const scrollToColumn = (index: number) => {
    const offsets = getColumnOffsets();
    const scrollTo = offsets[index] || 0;
    tableRef.current?.scrollTo({ left: -scrollTo, behavior: "smooth" }); // منفی چون rtl
  };

  const handleScrollRight = () => {
    let scrollLeft = tableRef.current?.scrollLeft ?? 0;
    scrollLeft = -scrollLeft; // چون مقدار منفیه در حالت rtl

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

  const handleScrollLeft = () => {
    let scrollLeft = tableRef.current?.scrollLeft ?? 0;
    scrollLeft = -scrollLeft;

    const offsets = getColumnOffsets();
    const currentIndex = getCurrentColumnIndex(scrollLeft);

    console.log(offsets);
    

    const currentStart = offsets[currentIndex];
    const currentEnd = offsets[currentIndex + 1] ?? currentStart;

    if (scrollLeft > currentStart && scrollLeft < currentEnd) {
      const diff = scrollLeft - currentStart;
      tableRef.current?.scrollBy({ left: diff, behavior: "smooth" });
    } else {
      const prevIndex = Math.max(currentIndex - 1, 0); // حالا ستون اول هم مجازه
      scrollToColumn(prevIndex);
    }
  };

  return { handleScrollRight, handleScrollLeft };
};
