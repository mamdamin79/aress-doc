import ReactPaginate from "react-paginate";

type PaginationProps = {
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
  };

export const Pagination : React.FC<PaginationProps> = ({
    pageCount,
    onPageChange
})=>{
    return(
        <ReactPaginate
      previousLabel="قبلی"
      nextLabel="بعدی"
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName="flex text-gray-1000 items-center space-x-2 mt-4"
      pageClassName="bg-gray-100 rounded-md w-12 h-12 flex items-center justify-center hover:bg-gray-200 duration-150 transition-colors cursor-pointer block"
      pageLinkClassName="w-12 h-12 flex items-center justify-center"
      activeClassName="border-[2.5px] border-brand-600"
      previousClassName="bg-brand-600 w-16 h-12 ml-2 rounded-md text-white flex items-center justify-center hover:bg-brand-700 duration-150 transition-colors cursor-pointer block"
      nextClassName="bg-brand-600 w-16 h-12 rounded-md text-white flex items-center justify-center hover:bg-brand-700 duration-150 transition-colors cursor-pointer block"
      disabledClassName="opacity-50 cursor-not-allowed"
      breakClassName="flex items-center justify-center"
    />
    )
}