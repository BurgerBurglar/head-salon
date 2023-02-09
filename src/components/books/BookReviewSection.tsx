import React from "react";
import { rangeFrom1 } from "../../utils/misc";
import BookReview from "./BookReview";
import BookReviewSkeleton from "./BookReviewSkeleton";
import { twMerge } from "tailwind-merge";

interface Props {
  bookReviews: BookReview[];
  className?: string;
}

const BookReviewSection: React.FC<Props> = ({ bookReviews, className }) => {
  return (
    <div
      className={twMerge(
        "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-y-5",
        className
      )}
    >
      {bookReviews.map((review) => (
        <BookReview key={review.id} {...review} />
      ))}
      {bookReviews.length === 0 &&
        rangeFrom1(9).map((n) => <BookReviewSkeleton key={n} />)}
    </div>
  );
};
export default BookReviewSection;
