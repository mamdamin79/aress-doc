import React, { Suspense } from 'react';
import { SearchBarClient } from './SearchBarClient';

type Props = {
  inModal?: boolean;
};

const SearchBarFallback = () => (
  <div className="xl:w skeleton-shimmer h-10 rounded-md sm:w-[324px] md:w-[416px]" />
);

export const SearchBar: React.FC<Props> = ({ inModal }) => {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <SearchBarClient inModal={inModal} />
    </Suspense>
  );
};
