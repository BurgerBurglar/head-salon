import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchBookReviewsInFront } from "../../src/scraper/fetch";

const useBookReviews = () => {
  const page = parseInt(useRouter().query.page as string) || 1;
  return useQuery({
    queryKey: ["bookReview", page],
    queryFn: () => fetchBookReviewsInFront(page),
  });
};
export default useBookReviews;
