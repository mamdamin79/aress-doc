import React from 'react';
import FundLogoFallback from '../../../assets/images/FundLogoFallback.png';
import { FundsTag } from '../FundsTag';
import { ReactComponent as VerifiedSVG } from '../../../assets/icons/ic_round-verified.svg';
import { Icon } from '../Icon';
import { cn } from '../../../utils/classNames.utils';

interface FundsLogoProps {
  size?: 'sm' | 'md' | 'lg';
  hasTag?: boolean;
  isVerified?: boolean;
  isPin?: boolean;
}

export const FundsLogo: React.FC<FundsLogoProps> = ({
  size = 'md',
  hasTag = true,
  isVerified = false,
  isPin = false,
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-[38px] w-[38px]',
    lg: 'h-12 w-12',
  };

  return (
    <div className="relative">
      <img
        src={FundLogoFallback}
        alt="Fund Logo"
        className={`rounded-full ${sizeClasses[size]}`}
      />
      {(isPin || hasTag) && (
        <div
          className={cn('absolute bottom-0 right-0', { '-bottom-3': isPin })}
        >
          {isPin ? (
            <Icon name="CustomPin" size={'sm'} />
          ) : (
            <FundsTag color="green" size={size === 'lg' ? 'lg' : 'md'} />
          )}
        </div>
      )}
      {isVerified && (
        <div className="absolute -top-1">
          <VerifiedSVG
            viewBox="0 0 14 14"
            className="object-cover"
            width={16}
            height={16}
          />
        </div>
      )}
    </div>
  );
};
