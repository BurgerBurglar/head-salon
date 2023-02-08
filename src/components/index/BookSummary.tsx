import Image from "next/image";
import React from "react";
import { BookSummary } from "../../types";
import Stars from "../books/Stars";

const BookSummary: React.FC<BookSummary> = ({
  title,
  subtitle,
  coverPhoto,
  doubanRating,
  publishYear,
  role,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 border border-slate-200 px-2">
      <Image src={coverPhoto} alt={title} width={100} height={141} />
      <div className="flex-1">
        <h3 className="text-start text-lg font-bold">{title}</h3>
        <div className="text-slate-600">{subtitle}</div>
        <div className="my-2 flex">
          <Stars rating={doubanRating} outOf={10} />
          <span>{doubanRating}</span>
        </div>
        <div className="text-slate-500">
          <span className="mr-2 rounded-md border border-slate-500 px-1">
            {role}
          </span>
          <span>{publishYear}</span>
        </div>
      </div>
    </div>
  );
};
export default BookSummary;
