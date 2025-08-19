'use client';
import React, { useRef, useEffect, useState } from 'react';
import { SlidingNumber } from '../SlidingNumber';
import { Badge, cn, formatNumber, Icon } from 'design-system';

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
  const valueChangeRef = useRef<HTMLDivElement>(null);
  const [slidingNumberWidth, setSlidingNumberWidth] = useState<number>(165);
  const [valueChangeWidth, setValueChangeWidth] = useState(60);

  useEffect(() => {
    if (slidingNumberRef.current && !hiddenContent) {
      const width = slidingNumberRef.current.offsetWidth;
      setSlidingNumberWidth(width);
    }
  }, [quantity, hiddenContent]);
  useEffect(() => {
    if (valueChangeRef.current && !hiddenContent) {
      const width = valueChangeRef.current.offsetWidth;
      setValueChangeWidth(width);
    }
  }, [hiddenContent]);
  return (
    <div className="flex w-fit flex-col">
      <div className="flex flex-row items-center gap-2">
        <div
          className="text-text-neutral-secondary cursor-pointer"
          onClick={onToggleHiddenContent}
        >
          <Icon name={!hiddenContent ? 'eye' : 'eye-off'} />
        </div>
        <div className="flex items-center gap-2" ref={slidingNumberRef}>
          <div
            className="text-center"
            style={{ direction: 'ltr', minWidth: '165px' }}
          >
            <div className="text-text-neutral-primary text-left text-[32px] font-medium">
              {!hiddenContent ? (
                <div>
                  <SlidingNumber quantity={quantity} />
                </div>
              ) : (
                <div
                  className="flex h-12 items-end justify-start text-[40px]"
                  style={{
                    width: `${slidingNumberWidth}px`,
                  }}
                >
                  .....
                </div>
              )}
            </div>
          </div>
          <span
            className={cn(
              'text-text-neutral-secondary text-sm font-normal',
              hiddenContent && 'hidden',
            )}
          >
            ریال{' '}
          </span>
        </div>
      </div>
      {quantity > 0 && (
        <div className="flex w-full justify-end gap-3">
          <Badge
            theme="green"
            title={`${percentageChange}%`}
            icon={{
              name: 'CustomCaretUp',
            }}
          />
          <span className="text-text-accent-green-primary-600 text-sm font-medium">
            {!hiddenContent ? (
              <span ref={valueChangeRef}>
                {formatNumber(valueChange, {
                  commaSeparated: true,
                })}{' '}
                ریال
              </span>
            ) : (
              <div
                className="text-left text-lg font-semibold"
                style={{
                  width: `${valueChangeWidth}px`,
                  height: '21.6px',
                }}
              >
                .....
              </div>
            )}
          </span>
        </div>
      )}
    </div>
  );
};
