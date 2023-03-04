import React from "react";
import { type PostSummary } from "../../types";

interface PostMetaProps {
  date: PostSummary["date"];
  numRead: PostSummary["numRead"];
  category: PostSummary["category"];
}

const PostMeta: React.FC<PostMetaProps> = ({ date, numRead, category }) => {
  const formatedDate = new Date(date).toLocaleDateString("zh-CN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <div>
        {formatedDate}
        {" • "}
        阅读({numRead.toLocaleString()})
      </div>
      <span className="rounded-md bg-slate-200 px-2 py-1">{category}</span>
    </div>
  );
};
export default PostMeta;
