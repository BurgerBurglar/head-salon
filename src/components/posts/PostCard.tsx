import React from "react";
import { type PostSummary } from "../../types";
import PostMeta from "./PostMeta";

const PostCard: React.FC<PostSummary> = ({
  id,
  title,
  date,
  numRead,
  category,
  abstract,
}) => {
  return (
    <div className="my-4">
      <h2 className="text-lg font-bold text-pink-600">
        <a className="hover:underline" href={`/blogs/post/${id}`}>
          {title}
        </a>
      </h2>
      <PostMeta date={date} numRead={numRead} category={category} />
      <div className="line-clamp-2">{abstract}</div>
    </div>
  );
};
export default PostCard;
