'use client';

import { TextField } from 'design-system';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

export const SearchBarClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    if (debouncedSearch === '') {
      handleClear();
    } else {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', value);
    params.set('page', '1');
    router.replace(`/reports?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.set('page', '1');
    router.replace(`/reports?${params.toString()}`);
  };

  return (
    <TextField
      className="xl:w sm:w-[324px] md:w-[416px]"
      mergeTitleAndPlaceholder={false}
      mode="outline"
      leadingIcon={{ name: 'search', size: 'lg' }}
      trailingIcons={[{ name: 'x', size: 'lg', onClick: handleClear }]}
      placeholder="جستجو گزارش..."
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
};
