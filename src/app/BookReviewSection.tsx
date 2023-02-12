import React from "react";
import { twMerge } from "tailwind-merge";
import { type BookReview } from "../types";
import BookReviewCard from "./(books)/BookReview";

interface BookReviewSectionProps {
  bookReviews: BookReview[];
  className?: string;
}

const BookReviewSection: React.FC<BookReviewSectionProps> = ({
  bookReviews,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-y-5",
        className
      )}
    >
      {bookReviews.map((review) => (
        <BookReviewCard key={review.id} {...review} />
      ))}
    </div>
  );
};
export default BookReviewSection;
