import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BookSummary } from "../types";
import Stars from "./(books)/Stars";

const BookSummary: React.FC<BookSummary> = ({
  title,
  subtitle,
  coverPhoto,
  doubanRating,
  publishYear,
  role,
  buyAt,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 border border-slate-200 px-2">
      <Link href={buyAt}>
        <Image src={coverPhoto} alt={title} width={100} height={141} />
      </Link>
      <div className="flex-1">
        <h3
          className="text-start text-lg font-bold text-slate-800 hover:underline
        "
        >
          <Link href={buyAt}>{title}</Link>
        </h3>
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
