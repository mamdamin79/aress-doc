'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button, cn, Icon, Tooltip } from 'design-system';
import { ReactComponent as FundIcon } from './FundIcon.svg';
import { type FundData } from '../../app/(withfooter)/my-portfolio/_components/data/fundsData';
const fundTypeMaps: Record<number, { title: string; color: string }> = {
  0: {
    title: 'سهامی',
    color: 'bg-surface-accent-vividgreen-600',
  },
  1: {
    title: 'درآمد ثابت',
    color: 'bg-surface-accent-blue-600',
  },
  2: {
    title: 'مختلط',
    color: 'bg-surface-accent-purple-600',
  },
  3: {
    title: 'کالایی',
    color: 'bg-surface-accent-yellow-600',
  },
};

export interface MyFundsTableProps {
  data: FundData[];
  hiddenContent?: boolean;
  onRowClick?: (fund: FundData) => void;
  onFundSelect?: (fund: FundData) => void;
  onFundLinkClick?: (fund: FundData) => void;
  isDetailView?: boolean;
}

// Custom hook to detect text truncation
const useTextTruncation = () => {
  const [truncatedElements, setTruncatedElements] = useState<Set<string>>(
    new Set(),
  );

  const recheckAllElements = useCallback(
    (elementRefs: Map<string, HTMLElement>) => {
      const newTruncatedElements = new Set<string>();

      elementRefs.forEach((element, key) => {
        if (element && element.isConnected) {
          const isTruncated = element.scrollWidth > element.clientWidth;
          if (isTruncated) {
            newTruncatedElements.add(key);
          }
        }
      });

      setTruncatedElements(newTruncatedElements);
    },
    [],
  );

  const isTruncated = useCallback(
    (key: string) => truncatedElements.has(key),
    [truncatedElements],
  );

  return { recheckAllElements, isTruncated };
};

export function MyFundsTable({
  data,
  hiddenContent = false,
  onRowClick,
  onFundSelect,
  onFundLinkClick,
  isDetailView = false,
}: MyFundsTableProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedView, setDisplayedView] = useState(isDetailView);
  const { recheckAllElements, isTruncated } = useTextTruncation();

  // Store refs for truncation checking
  const textElementRefs = useRef<Map<string, HTMLElement>>(new Map());

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };
  const checkScrollable = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScrollLeft = scrollWidth - clientWidth;
    let atStart = false;
    let atEnd = false;
    atStart = Math.abs(scrollLeft) <= 1;
    atEnd = Math.abs(scrollLeft) >= maxScrollLeft - 1;
    setShowLeftButton(!atEnd);
    setShowRightButton(!atStart);
  };

  useEffect(() => {
    // Only check scrollable after animation completes to prevent layout shift
    if (!isAnimating) {
      const timer = setTimeout(() => {
        checkScrollable();
      }, 100);

      const handleResize = () => checkScrollable();
      window.addEventListener('resize', handleResize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [data, isAnimating]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollable);
      return () =>
        scrollContainer.removeEventListener('scroll', checkScrollable);
    }
  }, []);

  // Trigger animation when view changes
  useEffect(() => {
    if (displayedView !== isDetailView) {
      setIsAnimating(true);

      // Fade out, change content, then fade in
      const timer = setTimeout(() => {
        setDisplayedView(isDetailView);
        setIsAnimating(false);
        // Check scrollable after animation completes to ensure proper button visibility
        setTimeout(() => {
          checkScrollable();
        }, 50);
      }, 200); // Shorter, simpler transition

      return () => clearTimeout(timer);
    }
  }, [isDetailView, displayedView]);

  // Check truncation when detail view or data changes
  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        recheckAllElements(textElementRefs.current);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isDetailView, data, isAnimating, recheckAllElements]);

  return (
    <table
      className={cn(
        'bg-surface-neutral-background border-border-neutral-secondary relative flex h-[369px] w-full max-w-full flex-col rounded-2xl border-2 p-7 pt-3',
      )}
    >
      {/* Scroll Left Button */}
      {showLeftButton && !isAnimating && (
        <Button
          onClick={handleScrollLeft}
          mode="secondary"
          theme="brand"
          className="absolute -left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2"
          aria-label="Scroll left"
        >
          <Icon name="chevron-left" size="md" />
        </Button>
      )}

      {/* Scroll Right Button */}
      {showRightButton && !isAnimating && (
        <Button
          onClick={handleScrollRight}
          mode="secondary"
          theme="brand"
          className="absolute -right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2"
          aria-label="Scroll right"
        >
          <Icon name="chevron-right" size="md" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        className="scrollbar-sm-hidden w-full overflow-x-auto pb-2.5"
      >
        <div className="min-w-[800px]">
          <div>
            {/* Header */}
            <thead className="grid grid-cols-4 gap-4 pb-3">
              <div
                className={cn(
                  'text-text-neutral-primary text-md text-center font-medium transition-opacity duration-100 ease-out',
                  isAnimating ? 'opacity-0' : 'opacity-100',
                )}
              >
                {displayedView ? 'صندوق' : 'نوع صندوق'}
              </div>
              <div className="text-text-neutral-primary text-md text-center font-medium">
                ارزش روز/سرمایه
              </div>
              <div className="text-text-neutral-primary text-md text-center font-medium">
                سود/بازده
              </div>
              <div className="text-text-neutral-primary text-md text-center font-medium">
                وزن/تعداد
              </div>
            </thead>

            {/* Table Body */}
            <tbody className="border-border-neutral-secondary flex flex-col border-b-2 border-t-2">
              {data.map((fund, i) => (
                <div
                  key={fund.code || fund.typeID}
                  onClick={() => {
                    if (!isDetailView) {
                      onRowClick?.(fund);
                    } else {
                      onFundSelect?.(fund);
                    }
                  }}
                  className={cn(
                    'relative grid h-[70px] grid-cols-4 items-center gap-4 border-b border-t',
                    i % 2 == 0
                      ? 'bg-surface-neutral-tertiary'
                      : 'bg-surface-neutral-background',
                    ((!isDetailView && onRowClick) ||
                      (isDetailView && onFundSelect)) &&
                      'hover:bg-surface-brand-100 cursor-pointer transition-colors',
                  )}
                >
                  {/* Fund Type */}
                  <div className="flex w-[200px] items-center justify-start gap-2 pr-5">
                    <FundIcon width={36} height={36} />
                    {/* badge */}
                    <div
                      className={cn(
                        'border-border-neutral-oninverse absolute right-5 top-10 h-[10px] w-[10px] rounded-full border',
                        fundTypeMaps[fund.typeID].color,
                      )}
                    ></div>
                    <div className="min-w-0 flex-1 text-right">
                      {displayedView &&
                      isTruncated(`fund-${fund.code || fund.typeID}`) ? (
                        <Tooltip
                          title={
                            displayedView && fund.name
                              ? fund.name
                              : fundTypeMaps[fund.typeID].title
                          }
                        >
                          <div
                            ref={(el) => {
                              if (el) {
                                textElementRefs.current.set(
                                  `fund-${fund.code || fund.typeID}`,
                                  el,
                                );
                              }
                            }}
                            data-fund-id={`fund-${fund.code || fund.typeID}`}
                            className={cn(
                              'text-text-neutral-primary truncate text-base font-medium transition-all duration-100 ease-out',
                              displayedView &&
                                fund.name &&
                                onFundLinkClick &&
                                'hover:text-text-brand-primary-600 cursor-pointer',
                              fund.isStock &&
                                !displayedView &&
                                'hover:text-text-brand-primary-600 cursor-pointer',
                              isAnimating ? 'opacity-0' : 'opacity-100',
                            )}
                            onClick={(e) => {
                              if (
                                isDetailView &&
                                fund.name &&
                                onFundLinkClick
                              ) {
                                e.stopPropagation();
                                onFundLinkClick(fund);
                              }
                            }}
                          >
                            {displayedView && fund.name
                              ? fund.name
                              : fundTypeMaps[fund.typeID].title}
                          </div>
                        </Tooltip>
                      ) : (
                        <div
                          ref={(el) => {
                            if (el) {
                              textElementRefs.current.set(
                                `fund-${fund.code || fund.typeID}`,
                                el,
                              );
                            }
                          }}
                          data-fund-id={`fund-${fund.code || fund.typeID}`}
                          className={cn(
                            'text-text-neutral-primary truncate text-base font-medium transition-all duration-100 ease-out',
                            displayedView &&
                              fund.name &&
                              onFundLinkClick &&
                              'hover:text-text-brand-primary-600 cursor-pointer',
                            fund.isStock &&
                              !displayedView &&
                              'hover:text-text-brand-primary-600 cursor-pointer',
                            isAnimating ? 'opacity-0' : 'opacity-100',
                          )}
                          onClick={(e) => {
                            if (isDetailView && fund.name && onFundLinkClick) {
                              e.stopPropagation();
                              onFundLinkClick(fund);
                            }
                          }}
                        >
                          {displayedView && fund.name
                            ? fund.name
                            : fundTypeMaps[fund.typeID].title}
                        </div>
                      )}
                    </div>
                    {/* color line */}
                    <div
                      className={cn(
                        'absolute right-0 top-0 h-[70px] w-1',
                        fundTypeMaps[fund.typeID].color,
                      )}
                    ></div>
                  </div>
                  {/* Daily Value */}
                  {fund.userInvestValue > 0 ? (
                    <div className="text-center">
                      <div
                        className={cn(
                          'text-text-neutral-primary text-base transition-opacity duration-100 ease-out',
                          isAnimating ? 'opacity-0' : 'opacity-100',
                        )}
                      >
                        {hiddenContent
                          ? '.....'
                          : `${fund.dailyValue.toLocaleString('fa-IR')} ریال`}
                      </div>
                      <div
                        className={cn(
                          'text-text-neutral-secondarycontrast text-sm transition-opacity duration-100 ease-out',
                          isAnimating ? 'opacity-0' : 'opacity-100',
                        )}
                      >
                        {hiddenContent
                          ? '.....'
                          : `${fund.userInvestValue.toLocaleString('fa-IR')} ریال`}
                      </div>
                    </div>
                  ) : (
                    <span
                      className={cn(
                        'text-center transition-opacity duration-100 ease-out',
                        isAnimating ? 'opacity-0' : 'opacity-100',
                      )}
                    >
                      -
                    </span>
                  )}

                  {/* Profit/Loss */}
                  {fund.profitLoss && fund.profitLossPercentage ? (
                    <div className="text-center">
                      <div
                        className={cn(
                          'text-base transition-opacity duration-100 ease-out',
                          fund.profitLoss >= 0
                            ? 'text-text-accent-green-primary-600'
                            : 'text-text-accent-red-primary-600',
                          isAnimating ? 'opacity-0' : 'opacity-100',
                        )}
                      >
                        {hiddenContent
                          ? '.....'
                          : `${Math.abs(fund.profitLoss).toLocaleString('fa-IR')} ریال`}
                      </div>
                      <div
                        className={cn(
                          'text-sm font-medium transition-opacity duration-100 ease-out',
                          fund.profitLoss >= 0
                            ? 'text-text-accent-green-primary-600'
                            : 'text-text-accent-red-primary-600',
                          isAnimating ? 'opacity-0' : 'opacity-100',
                        )}
                      >
                        {Math.abs(fund.profitLossPercentage)}٪
                        {fund.profitLoss >= 0 ? ' + ' : ' - '}
                      </div>
                    </div>
                  ) : (
                    <span
                      className={cn(
                        'text-center transition-opacity duration-100 ease-out',
                        isAnimating ? 'opacity-0' : 'opacity-100',
                      )}
                    >
                      -
                    </span>
                  )}

                  {/* Weight/Count */}
                  <div className="text-center">
                    <div
                      className={cn(
                        'text-text-neutral-primary text-base transition-opacity duration-100 ease-out',
                        isAnimating ? 'opacity-0' : 'opacity-100',
                      )}
                    >
                      {fund.fundWeightPercentage}٪
                    </div>
                    <div
                      className={cn(
                        'text-text-neutral-secondarycontrast text-sm transition-opacity duration-100 ease-out',
                        isAnimating ? 'opacity-0' : 'opacity-100',
                      )}
                    >
                      {hiddenContent ? '.....' : `${fund.fundWeight} صندوق`}
                    </div>
                  </div>
                </div>
              ))}
            </tbody>
          </div>
        </div>
      </div>
    </table>
  );
}
