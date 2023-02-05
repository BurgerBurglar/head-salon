import React from "react";
import { type Comment } from "../../types";

const Comment: React.FC<Comment> = ({ username, date, content }) => {
  return (
    <div className="border-b pb-3 last-of-type:border-b-0">
      <div>
        <span className="text-lg font-semibold">{username}</span>
        <span className="ml-2 text-slate-500">{date}</span>
      </div>
      <div className="">{content}</div>
    </div>
  );
};
export default Comment;
