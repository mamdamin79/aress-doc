import React from 'react';
import Image from 'next/image';
import PRODUCT_LOGO from '@aress-assets/icons/product_logo.svg';
import { cn, HeadProfile, SquaredButton } from 'design-system';
import { HeaderMenuWrapper } from './_components/HeaderMenuWrapper';
export const Header: React.FC = () => {
  return (
    <div>
      {/* Always fixed top header */}
      <div
        className={cn(
          'fixed right-0 top-0 z-40 flex w-full flex-row items-center justify-between bg-white px-20 pb-2 pt-4',
          'shadow-sm',
        )}
      >
        <div className="mt-1 flex flex-row gap-6">
          <Image
            src={PRODUCT_LOGO}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            alt="product logo"
          />
          <HeaderMenuWrapper />
        </div>

        <div className="flex flex-row gap-3">
          <SquaredButton
            icons={[{ name: 'moon' }, { name: 'sun' }]}
            badge={{ enabled: false }}
          />
          <SquaredButton
            icons={[{ name: 'bell' }]}
            badge={{ enabled: true, text: '3' }}
          />
          <HeadProfile profileImage="https://picsum.photos/200" />
        </div>
      </div>
    </div>
  );
};
