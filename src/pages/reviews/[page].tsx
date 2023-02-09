import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { type ReactPaginateProps } from "react-paginate";
import BookReviewSection from "../../components/books/BookReviewSection";
import Pagination from "../../components/Pagination";
import { fetchBookReviews } from "../../scraper/fetch";
import type { BookReview } from "../../types";
interface Props {
  bookReviews: BookReview[];
  numPages: number;
}
const Reviews: NextPage<Props> = ({ bookReviews, numPages }) => {
  console.log({ numPages });
  const currentPage = parseInt(useRouter().query.page as string);
  const handlePageClick: ReactPaginateProps["onPageChange"] = (e) => {
    window.location.href = `/reviews/${e.selected + 1}`;
  };
  return (
    <>
      <BookReviewSection bookReviews={bookReviews} className="mt-6" />
      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        handlePageClick={handlePageClick}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [1, 2, 3].map((n) => ({
    params: { page: (n + 1).toString() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { numPages } = await fetchBookReviews();
  const page = parseInt(params?.page as string);
  const { data: bookReviews } = await fetchBookReviews(page);
  return { props: { bookReviews, numPages } };
};
export default Reviews;
