import React from 'react';
import FundLogoFallback from '../../../assets/images/FundLogoFallback.png';
import { FundsTag } from '../FundsTag';

interface FundsLogoProps {
  // Define any props if needed
  size?: 'sm' | 'md' | 'lg'; // Example prop for size
  hasTag?: boolean; // Example prop to conditionally render a badge
}

export const FundsLogo: React.FC<FundsLogoProps> = ({
  size = 'md', // Default size
  hasTag = true, // Default to showing badge
}) => {
  // You can use the size prop to conditionally apply styles or classes
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-[38px] w-[38px]',
    lg: 'h-12 w-12',
  };

  return (
    <div className="relative">
      <img
        // eslint-disable-next-line
        // @ts-ignore
        src={FundLogoFallback.src}
        alt="Fund Logo"
        className={`rounded-full ${sizeClasses[size]}`}
      />
      {hasTag && (
        <div className="absolute bottom-0 right-0">
          <FundsTag color="green" size={size === 'lg' ? 'lg' : 'md'} />
        </div>
      )}
    </div>
  );
};
