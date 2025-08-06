import React from 'react';
import FundLogoFallback from '../../../assets/images/FundLogoFallback.png';
import { FundsTag } from '../FundsTag';

interface FundsLogoProps {
  // Define any props if needed
  size?: 'sm' | 'md' | 'lg'; // Example prop for size
}

export const FundsLogo: React.FC<FundsLogoProps> = ({
  size = 'md', // Default size
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
      <div className="absolute bottom-0 right-0">
        <FundsTag size={size === 'sm' ? 'md' : size} color="green" />
      </div>
    </div>
  );
};
