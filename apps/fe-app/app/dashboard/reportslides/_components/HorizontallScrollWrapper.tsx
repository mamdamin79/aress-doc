'use client';
import { HorizontalScrollBar } from 'design-system';
import React from 'react';

export const HorizontallScrollWrapper: React.FC = () => {
  return (
    <HorizontalScrollBar
      autoRotate={false}
      barsNumber={4}
      onChangeIndex={() => {}}
    />
  );
};
