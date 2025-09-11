'use client';
import React from 'react';
import FlipNumbers from 'react-flip-numbers';

export const splitNumberWithCommas = (numStr: string): string[] => {
  const reversed = numStr.split('').reverse();
  const groups = [];
  for (let i = 0; i < reversed.length; i += 3) {
    groups.push(
      reversed
        .slice(i, i + 3)
        .reverse()
        .join(''),
    );
  }
  return groups.reverse();
};

export interface SlidingNumberProps {
  quantity: number;
}
export const SlidingNumber: React.FC<SlidingNumberProps> = ({ quantity }) => {
  console.log(quantity);
  return (
    <div
      style={{ display: 'flex', gap: 2 }}
      className="text-text-neutral-primary flex items-center gap-1 text-[32px] font-medium"
    >
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
            duration={0.7}
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
