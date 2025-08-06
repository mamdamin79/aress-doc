import React from 'react';
import FundLogoFallback from '../../../assets/images/FundLogoFallback.png';

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
    <div>
      <img
        // eslint-disable-next-line
        // @ts-ignore
        src={FundLogoFallback.src}
        alt="Fund Logo"
        className={`rounded-full ${sizeClasses[size]}`}
      />
    </div>
  );
};
