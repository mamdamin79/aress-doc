'use client';
import { TextField } from 'design-system';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const queries = useSearchParams().toString();
  const handleSearch = (
    value: string | number | readonly string[] | undefined,
  ) => {
    const params = new URLSearchParams(queries);
    params.set('search', value as string);
    params.set('page', '1');
    router.replace(`/reports?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(queries);
    params.delete('search');
    params.set('page', '1');
    router.replace(`/reports?${params.toString()}`);
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
          onClick: (value) => handleSearch(value),
        }}
        trailingIcons={[{ name: 'x', size: 'lg', onClick: ()=>handleClear() }]}
        placeholder="جستجو گزارش..."
      />
    </>
  );
};
