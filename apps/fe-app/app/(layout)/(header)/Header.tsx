'use client';
import React from 'react';
import Image from 'next/image';
import PRODUCT_LOGO from '@aress-assets/icons/product_logo.svg';
import { cn, HeadProfile, SquaredButton } from 'design-system';
import { HeaderMenuWrapper } from './_components/HeaderMenuWrapper';
import { useHeaderVisibility } from '../../../hooks';
import { useWindowScroll } from '@uidotdev/usehooks';
export const Header: React.FC = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  const [{ y: scrollY }] = useWindowScroll();
  const currentScrollY = scrollY ?? 0;

  return (
    <div>
      {/* Always fixed top header */}
      <div
        className={cn(
          'fixed right-0 top-0 z-40 flex w-full flex-row items-center justify-between border-b-2 bg-white px-20 pb-3 pt-4 transition-transform duration-300',
          currentScrollY === 0
            ? 'border-gray-300'
            : 'border-gray-200 shadow-sm',
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
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
      {/* hidden div */}
      <div className={cn('invisible', `h-[80px]`)}></div>

      {/* craete a new comp */}
    </div>
  );
};
