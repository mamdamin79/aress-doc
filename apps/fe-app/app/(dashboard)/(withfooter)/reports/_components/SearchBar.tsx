'use client';
import { TextField } from 'design-system';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // <-- get current path
  const queries = useSearchParams().toString();
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    if (debouncedSearch === '') {
      handleClear();
    } else {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleSearch = (
    value: string | number | readonly string[] | undefined,
  ) => {
    const params = new URLSearchParams(queries);
    params.set('search', value as string);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`); // <-- use current path
  };

  const handleClear = () => {
    const params = new URLSearchParams(queries);
    params.delete('search');
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`); // <-- use current path
  };

  return (
    <>
      <TextField
        className="xl:w sm:w-[324px] md:w-[416px]"
        mergeTitleAndPlaceholder={false}
        mode="outline"
        leadingIcon={{
          name: 'search',
          size: 'lg',
        }}
        trailingIcons={[
          { name: 'x', size: 'lg', onClick: () => handleClear() },
        ]}
        placeholder="جستجو گزارش..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </>
  );
};