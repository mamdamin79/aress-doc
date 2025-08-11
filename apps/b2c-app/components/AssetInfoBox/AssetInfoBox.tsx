'use client';
import React, { useRef, useEffect, useState } from 'react';
import { SlidingNumber } from '../SlidingNumber';
import { Badge, formatNumber, Icon } from 'design-system';

export interface AssetInfoBoxProps {
  hiddenContent: boolean;
  onToggleHiddenContent: () => void;
  quantity: number;
  valueChange: number;
  percentageChange: number;
}
export const AssetInfoBox: React.FC<AssetInfoBoxProps> = ({
  hiddenContent,
  onToggleHiddenContent,
  quantity,
  valueChange,
  percentageChange,
}) => {
  const slidingNumberRef = useRef<HTMLDivElement>(null);
  const [slidingNumberWidth, setSlidingNumberWidth] = useState<number>(165);

  useEffect(() => {
    if (slidingNumberRef.current && !hiddenContent) {
      const width = slidingNumberRef.current.offsetWidth;
      setSlidingNumberWidth(width);
    }
  }, [quantity, hiddenContent]);
  return (
    <div className="flex w-fit flex-col">
      <div className="flex flex-row items-center gap-2">
        <div
          className="text-text-neutral-secondary cursor-pointer"
          onClick={onToggleHiddenContent}
        >
          <Icon name={!hiddenContent ? 'eye-off' : 'eye'} />
        </div>
        <div
          className="text-center"
          style={{ direction: 'ltr', minWidth: '165px' }}
        >
          <div className="text-text-neutral-primary text-left text-[32px] font-medium">
            {!hiddenContent ? (
              <div ref={slidingNumberRef}>
                <SlidingNumber quantity={quantity} />
              </div>
            ) : (
              <div
                className="flex items-end justify-start"
                style={{
                  width: `${slidingNumberWidth}px`,
                  height: '47px',
                }}
              >
                .....
              </div>
            )}
          </div>
        </div>
        <span className="text-text-neutral-secondary text-sm font-normal">
          ریال{' '}
        </span>
      </div>
      {quantity > 0 && (
        <div className="flex w-full justify-between">
          <Badge
            theme="green"
            title={`${percentageChange}%`}
            icon={{
              name: 'arrow-up',
            }}
          />
          <span className="text-text-accent-green-primary-600 text-sm font-medium">
            {!hiddenContent ? (
              <span>
                {formatNumber(valueChange, {
                  commaSeparated: true,
                })}{' '}
                ریال
              </span>
            ) : (
              <span>........ ریال</span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};
