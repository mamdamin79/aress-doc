'use client';

import { HorizontalScrollBar } from 'design-system';
import React, { useEffect, useState } from 'react';

interface HorizontalScrollWrapperProps {
  numberOfCards: number;
}

export const HorizontalScrollWrapper: React.FC<
  HorizontalScrollWrapperProps
> = ({ numberOfCards }) => {
  const cardsHeight = 336;
  const [barsNumber, setBarsNumber] = useState(1);

  useEffect(() => {
    const calculateBarsNumber = () => {
      const cardsInView = Math.floor(window.innerWidth / cardsHeight);
      setBarsNumber(Math.ceil(numberOfCards / cardsInView));
    };

    calculateBarsNumber();
    window.addEventListener('resize', calculateBarsNumber);

    return () => {
      window.removeEventListener('resize', calculateBarsNumber);
    };
  }, [numberOfCards]);
  const handleScroll = (index: number) => {
    const slidesSection = document.getElementById('slidesSection');
    if (slidesSection) {
      slidesSection.scrollBy({
        top: 300,
        behavior: 'smooth',
      });
    } else {
      console.error('Element with ID "slidesSection" not found.');
    }
  };
  return (
    <HorizontalScrollBar
      autoRotate={false}
      barsNumber={barsNumber}
      onChangeIndex={(index) => handleScroll(index)}
    />
  );
};
