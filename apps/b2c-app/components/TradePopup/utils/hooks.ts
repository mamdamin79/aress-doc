'use client';
import { useState, useMemo } from 'react';

/**
 * Hook for managing quantity state and related operations in the TradePopup component
 * @param initialQuantity - Initial quantity value
 * @param disableCheck - Whether to disable the terms check
 * @returns Object containing quantity state and related functions
 */
export const useTradeQuantity = (
  initialQuantity: number = 153000000,
  disableCheck: boolean = false,
) => {
  // Define quantity step options
  const quantityOptions = useMemo(
    () => [5000000, 10000000, 50000000, 100000000, 500000000, 1000000000],
    [],
  );

  // State management
  const [quantityStep, setQuantityStep] = useState(quantityOptions[0]);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [acceptTerms, setAcceptTerms] = useState(disableCheck);
  const [showInput, setShowInput] = useState(false);

  // Quantity increment function
  const incrementQuantity = () => {
    setQuantity((prev) => prev + quantityStep);
  };

  // Quantity decrement function
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - quantityStep);
    }
  };

  return {
    quantityOptions,
    quantityStep,
    setQuantityStep,
    quantity,
    setQuantity,
    acceptTerms,
    setAcceptTerms,
    showInput,
    setShowInput,
    incrementQuantity,
    decrementQuantity,
  };
};
