'use client';

import ReactPaginate from 'react-paginate';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  pageCount: number;
  pageSize: number;
  currentPage: number;
  totalItems: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  pageSize,
  currentPage,
  totalItems,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const startPost = (currentPage - 1) * pageSize + 1;
  const endPost = Math.min(currentPage * pageSize, totalItems);

  const handlePageChange = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected + 1;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', selectedPage.toString());

    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div>
      <ReactPaginate
        previousLabel="قبلی"
        nextLabel="بعدی"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={2}
        forcePage={currentPage - 1}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName="flex text-gray-1000 items-center justify-center space-x-2 mt-4"
        pageClassName="bg-gray-100 rounded-md w-12 h-12 flex items-center justify-center hover:bg-gray-200 duration-150 transition-colors cursor-pointer block"
        pageLinkClassName="w-12 h-12 flex items-center justify-center"
        activeClassName="border-[2.5px] border-brand-600 pointer-events-none cursor-pointer"
        previousLinkClassName="flex items-center justify-center w-16 h-12"
        nextLinkClassName="flex items-center justify-center w-16 h-12"
        previousClassName="bg-brand-600 w-16 h-12 ml-2 rounded-md text-white flex items-center justify-center hover:bg-brand-700 duration-150 transition-colors cursor-pointer block"
        nextClassName="bg-brand-600 w-16 h-12 rounded-md text-white flex items-center justify-center hover:bg-brand-700 duration-150 transition-colors cursor-pointer block"
        disabledClassName="opacity-50 cursor-not-allowed pointer-events-none"
        breakClassName="flex items-center justify-center"
      />
      <div className="font-vazirmatn mt-2 text-center text-sm font-medium text-gray-600">
        {startPost} - {endPost} از {totalItems} گزارش
      </div>
    </div>
  );
};
