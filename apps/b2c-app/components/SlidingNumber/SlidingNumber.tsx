import React from 'react';
import FlipNumbers from 'react-flip-numbers';
import { splitNumberWithCommas } from '../TradePopup/utils';

export interface SlidingNumberProps {
  quantity: number;
}
export const SlidingNumber: React.FC<SlidingNumberProps> = ({ quantity }) => {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {splitNumberWithCommas(quantity.toString()).map((group, i) => (
        <React.Fragment key={i}>
          <FlipNumbers
            height={40}
            width={20}
            color="currentColor"
            background="transparent"
            play
            numberStyle={{
              fontSize: 32,
              textAlign: 'right',
            }}
            perspective={1000}
            numbers={group}
            duration={0.3}
          />
          {i !== splitNumberWithCommas(quantity.toString()).length - 1 && (
            <span
              style={{
                fontSize: 32,
                color: 'currentColor',
                userSelect: 'none',
              }}
            >
              ,
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
