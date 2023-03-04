import { fetchBookReviews } from "../../../scraper/fetch";
import { rangeFrom1 } from "../../../utils/misc";
import BookReviewSection from "../../BookReviewSection";
import ReviewsPagination from "./ReviewsPagination";

interface Props {
  params: { page: string };
}
export default async function Reviews({ params }: Props) {
  const { page } = params;
  const { numPages, data: bookReviews } = await fetchBookReviews(
    parseInt(page)
  );
  return (
    <>
      <BookReviewSection bookReviews={bookReviews} className="mt-6" />
      <ReviewsPagination currentPage={parseInt(page)} numPages={numPages} />
    </>
  );
}

export function generateStaticParams() {
  const CURRENT_PAGE_COUNT = 9;
  const paths = rangeFrom1(CURRENT_PAGE_COUNT).map((n) => ({
    page: n.toString(),
  }));
  return paths;
}

export const revalidate = 300;
