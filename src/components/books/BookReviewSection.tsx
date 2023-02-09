import React from "react";
import { range } from "../../utils/misc";
import BookReview from "./BookReview";
import BookReviewSkeleton from "./BookReviewSkeleton";

interface Props {
  bookReviews: BookReview[];
}

const BookReviewSection: React.FC<Props> = ({ bookReviews }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-y-5">
      {bookReviews.map((review) => (
        <BookReview key={review.id} {...review} />
      ))}
      {bookReviews.length === 0 &&
        range(9).map((n) => <BookReviewSkeleton key={n} />)}
    </div>
  );
};
export default BookReviewSection;
