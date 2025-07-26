'use client';

import { Suspense } from 'react';
import { SearchBarClient } from './SearchBarClient';

export const SearchBar = () => {
  return (
    <Suspense fallback={<div className="h-12 w-[324px] md:w-[416px]" />}>
      <SearchBarClient />
    </Suspense>
  );
};
