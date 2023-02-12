import React from "react";
import Stars from "./Stars";

interface ReviewMetaProps {
  bookTitle: string;
  rating?: number;
  date: string;
}

const ReviewMeta: React.FC<ReviewMetaProps> = ({ bookTitle, rating, date }) => {
  const formatedDate = new Date(date).toLocaleDateString("zh-CN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
      <div className="">{bookTitle}</div>
      {rating !== undefined && <Stars rating={rating} outOf={5} />}
      <div>{formatedDate}</div>
    </div>
  );
};
export default ReviewMeta;
