import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BookReview } from "../../types";
import Stars from "./Stars";

const BookReview: React.FC<BookReview> = ({
  imgUrl,
  rating,
  title,
  bookTitle,
  isBlog,
  reviewId,
}) => {
  const imgWidth = 150;
  const url = isBlog
    ? `/blogs/post/${reviewId}`
    : `/reviews/article/${reviewId}`;
  return (
    <div className="flex flex-col items-center">
      <Image
        className="h-auto w-[150px] object-contain"
        src={imgUrl}
        alt={bookTitle}
        width={imgWidth}
        height={imgWidth * 1.414}
        priority
      />
      <div className="text-center text-sm text-slate-500 line-clamp-1">
        {bookTitle}
      </div>
      <h3
        className="text-md mt-2 text-center text-pink-600 line-clamp-2
      hover:underline"
      >
        <Link href={url}>{title}</Link>
      </h3>
      {rating !== null && <Stars rating={rating} outOf={5} />}
    </div>
  );
};
export default BookReview;
