import { useRouter } from "next/router";
import React from "react";
import { type ReactPaginateProps } from "react-paginate";
import Pagination from "../Pagination";

interface PostPaginationProps {
  numPages: number;
}

const PostPagination: React.FC<PostPaginationProps> = ({ numPages }) => {
  const currentPage = parseInt(useRouter().query.page as string);
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
