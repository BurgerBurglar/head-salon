import React from "react";
import BookReview from "./BookReview";

interface Props {
  bookReviews: BookReview[];
}

const BookReviewSection: React.FC<Props> = ({ bookReviews }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-y-5">
      {bookReviews.map((review) => (
        <BookReview key={review.id} {...review} />
      ))}
    </div>
  );
};
export default BookReviewSection;
