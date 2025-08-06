'use client';

import { Suspense } from 'react';
import { HeaderClient } from './HeaderClient';

export const Header = () => {
  return (
    <Suspense fallback={<div className="h-[80px]" />}>
      <HeaderClient />
    </Suspense>
  );
};
