import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import React from "react";
import { BookSummary } from "../../types";
import { getStars, range } from "../../utils/misc";

const BookSummary: React.FC<BookSummary> = ({
  title,
  subtitle,
  coverPhoto,
  doubanRating,
  publishYear,
  role,
}) => {
  const stars = getStars(doubanRating);

  return (
    <div className="flex items-center justify-center gap-2">
      <Image src={coverPhoto} alt={title} width={100} height={141} />
      <div className="flex-1">
        <h3 className="text-start text-lg font-bold">{title}</h3>
        <div className="text-slate-600">{subtitle}</div>
        <div className="my-2 flex">
          <span className="flex text-amber-500">
            {range(stars.whole).map((n) => (
              <Star key={n} className="w-4 fill-amber-500" />
            ))}
            {stars.hasHalf && <StarHalf className="w-4 fill-amber-500" />}
            {range(stars.empty).map((n) => (
              <Star
                key={n + 10}
                className="w-4 fill-slate-300 text-slate-300"
              />
            ))}
          </span>
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
