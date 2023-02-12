"use client";

import React from "react";
import { type ReactPaginateProps } from "react-paginate";
import Pagination from "../../(misc)/Pagination";

interface ReviewsPaginationProps {
  currentPage: number;
  numPages: number;
}

const ReviewsPagination: React.FC<ReviewsPaginationProps> = ({
  currentPage,
  numPages,
}) => {
  const handlePageClick: ReactPaginateProps["onPageChange"] = (e) => {
    window.location.href = `/reviews/${e.selected + 1}`;
  };
  return (
    <Pagination
      currentPage={currentPage}
      numPages={numPages}
      handlePageClick={handlePageClick}
    />
  );
};
export default ReviewsPagination;
