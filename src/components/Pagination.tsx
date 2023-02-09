import React from "react";
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";

interface PaginationProps {
  currentPage: number;
  numPages: number;
  handlePageClick: ReactPaginateProps["onPageChange"];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  numPages,
  handlePageClick,
}) => {
  const handleActivePageClick: ReactPaginateProps["onPageActive"] = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <ReactPaginate
      className="mx-auto mt-8 flex w-fit gap-2 font-bold text-slate-600"
      pageLinkClassName="grid h-[2em] w-[2em] place-items-center rounded-md hover:bg-slate-200"
      activeLinkClassName="bg-pink-500 text-white hover:bg-pink-500"
      previousLinkClassName="grid h-[2em] w-[2em] place-items-center rounded-md hover:bg-slate-200"
      nextLinkClassName="grid h-[2em] w-[2em] place-items-center rounded-md hover:bg-slate-200"
      disabledClassName="hidden"
      pageCount={numPages}
      forcePage={currentPage - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={1}
      previousLabel="«"
      nextLabel="»"
      hrefBuilder={(page) => `/blogs/${page}`}
      onPageChange={handlePageClick}
      disableInitialCallback
      onPageActive={handleActivePageClick}
    />
  );
};
export default Pagination;
