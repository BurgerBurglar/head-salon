import React from "react";
import { type Comment } from "../../types";
import Reply from "./Reply";

const Comment: React.FC<Comment> = ({ username, date, content, replies }) => {
  return (
    <div className="border-b pb-3 text-left last-of-type:border-b-0">
      <div>
        <span className="font-semibold">{username}</span>
        <span className="ml-2 text-slate-500">{date}</span>
      </div>
      <div>{content}</div>
      <div className="mt-2 ml-2">
        {replies.map((reply) => (
          <Reply key={reply.id} {...reply} />
        ))}
      </div>
    </div>
  );
};
export default Comment;
