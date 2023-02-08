import Image from "next/image";
import React from "react";
import { BookReview } from "../../types";
import Stars from "./Stars";

const BookReview: React.FC<BookReview> = ({
  imgUrl,
  rating,
  title,
  bookTitle,
}) => {
  const imgWidth = 150;
  return (
    <div className="flex flex-col items-center">
      <Image
        src={imgUrl}
        alt={bookTitle}
        width={imgWidth}
        height={imgWidth * 1.414}
        className="h-[212px] object-contain"
        priority
      />
      <div className="text-center text-sm text-slate-500 line-clamp-1">
        {bookTitle}
      </div>
      <h3 className="text-md mt-2 text-center text-pink-500 line-clamp-2">
        {title}
      </h3>
      {rating !== undefined && <Stars rating={rating} outOf={5} />}
    </div>
  );
};
export default BookReview;
