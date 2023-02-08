import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { fetchBookReviewsInFront } from "../../scraper/fetch";
import BookReview from "./BookReview";

const BookReviewSection: React.FC = () => {
  const page = parseInt(useRouter().query.page as string);
  const { data: bookReviews } = useQuery({
    queryKey: ["bookReview", page],
    queryFn: () => fetchBookReviewsInFront(page),
  });
  return (
    <>
      <h2 className="my-4 text-start text-xl font-bold text-pink-500">
        辉格的书评
      </h2>
      {bookReviews && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-y-5">
          {bookReviews.map((review) => (
            <BookReview key={review.id} {...review} />
          ))}
        </div>
      )}
    </>
  );
};
export default BookReviewSection;
