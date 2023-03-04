"use client";

import React from "react";
import { type ReactPaginateProps } from "react-paginate";
import Pagination from "../(misc)/Pagination";

interface PostPaginationProps {
  currentPage: number;
  numPages: number;
}

const PostPagination: React.FC<PostPaginationProps> = ({
  currentPage,
  numPages,
}) => {
  const handlePageClick: ReactPaginateProps["onPageChange"] = (e) => {
    window.location.href = `/blogs/${e.selected + 1}`;
  };

  return (
    <Pagination
      currentPage={currentPage}
      numPages={numPages}
      handlePageClick={handlePageClick}
    />
  );
};
export default PostPagination;
