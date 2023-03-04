import React from "react";
import { type Reply } from "../../types";

const Reply: React.FC<Reply> = ({ username, date, content }) => {
  return (
    <div
      className="border-b border-slate-300 bg-slate-100 px-4 py-2 
    last-of-type:border-none"
    >
      <div>
        <span className="font-semibold">{username}</span>
        <span className="ml-2 text-slate-500">{date}</span>
      </div>
      {content}
    </div>
  );
};
export default Reply;
