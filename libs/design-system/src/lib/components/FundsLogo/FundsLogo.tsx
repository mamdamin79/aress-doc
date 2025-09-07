'use client';
import React, { useMemo, useState } from 'react';
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
  src: string;
  color: 'purple' | 'blue' | 'green' | 'yellow' | 'pink' | 'neutral';
}

export const FundsLogo: React.FC<FundsLogoProps> = ({
  size = 'md',
  hasTag = true,
  isVerified = false,
  isPin = false,
  color = 'green',
  src,
}) => {
  // @ts-expect-error: it does not get is FundLogoFallback object
  const [imgSrc, setImgSrc] = useState<string>(src || FundLogoFallback.src);

  const sizeClasses = useMemo(
    () => ({
      sm: 'h-8 w-8',
      md: 'h-[38px] w-[38px]',
      lg: 'h-12 w-12',
    }),
    [],
  );

  const verifySizes: Record<'sm' | 'md' | 'lg', { w: number; h: number }> = {
    sm: { w: 14, h: 14 },
    md: { w: 16, h: 16 },
    lg: { w: 20, h: 20 },
  };

  return (
    <div className="relative">
      <img
        src={imgSrc}
        alt="Fund Logo"
        className={`rounded-full object-cover ${sizeClasses[size]}`}
        // @ts-expect-error: it does not get is FundLogoFallback object
        onError={() => setImgSrc(FundLogoFallback?.src)}
        referrerPolicy="no-referrer"
      />
      {(isPin || hasTag) && (
        <div
          className={cn('absolute bottom-0 right-0', { '-bottom-3': isPin })}
        >
          {isPin ? (
            <Icon name="CustomPin" size="sm" />
          ) : (
            <FundsTag color={color} size={size === 'lg' ? 'lg' : 'md'} />
          )}
        </div>
      )}
      {isVerified && (
        <div className="absolute -top-1 right-0">
          <VerifiedSVG
            viewBox="0 0 14 14"
            width={verifySizes[size].w}
            height={verifySizes[size].h}
          />
        </div>
      )}
    </div>
  );
};
