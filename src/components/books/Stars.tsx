import { Star, StarHalf } from "lucide-react";
import React from "react";
import type { RatingOutOf } from "../../types";
import { getStars, rangeFrom1 } from "../../utils/misc";

interface StarsProps {
  rating: number;
  outOf: RatingOutOf;
}

const Stars: React.FC<StarsProps> = ({ rating, outOf }) => {
  const stars = getStars(rating, outOf);

  return (
    <span className="flex text-amber-500" aria-label={`rating ${rating}/5`}>
      {rangeFrom1(stars.whole).map((n) => (
        <Star key={n} className="w-4 fill-amber-500" />
      ))}
      {stars.hasHalf && <StarHalf className="w-4 fill-amber-500" />}
      {rangeFrom1(stars.empty).map((n) => (
        <Star key={n} className="w-4 fill-slate-300 text-slate-300" />
      ))}
    </span>
  );
};
export default Stars;
