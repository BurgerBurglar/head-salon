import React from "react";
import { type PostSummary } from "../../types";

const PostCard: React.FC<PostSummary> = ({
  title,
  date,
  numRead,
  category,
  abstract,
}) => {
  const formatedDate = new Date(date).toLocaleDateString("zh-CN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div className="my-4">
      <h2 className="text-lg font-bold text-pink-500">{title}</h2>
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <div>
          {formatedDate}
          {" • "}
          阅读({numRead.toLocaleString()})
        </div>
        <span className="rounded-md bg-slate-200 px-2 py-1">{category}</span>
      </div>
      <div className="line-clamp-2">{abstract}</div>
    </div>
  );
};
export default PostCard;
