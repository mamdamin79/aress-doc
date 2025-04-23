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
    router.replace(`/dashboard/reports?${params.toString()}`);
  };
  return (
    <>
      <TextField
        className="w-[416px]"
        mergeTitleAndPlaceholder={false}
        mode="outline"
        leadingIcon={{
          name: 'search',
          size: 'lg',
          onClick: (value) => handleSearch(value),
        }}
        trailingIcons={[{ name: 'x', size: 'lg' }]}
        placeholder="جستجو گزارش..."
      />
    </>
  );
};
