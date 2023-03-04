import React from "react";
import Highlighter from "react-highlight-words";
import { type PostSummary } from "../../types";
import PostMeta from "./PostMeta";

interface Props extends PostSummary {
  search?: string;
}

const PostSummary: React.FC<Props> = ({
  id,
  title,
  date,
  numRead,
  category,
  abstract,
  search,
}) => {
  const searchWords = search ? [search] : [];
  return (
    <div className="my-4 first-of-type:mt-0 last-of-type:mb-0">
      <h2 className="text-lg font-bold text-pink-600">
        <a className="hover:underline" href={`/blogs/post/${id}`}>
          {title}
        </a>
      </h2>
      <PostMeta date={date} numRead={numRead} category={category} />
      <Highlighter
        className="line-clamp-2"
        highlightClassName="text-pink-600 bg-transparent"
        searchWords={searchWords}
        autoEscape
        textToHighlight={abstract}
      />
    </div>
  );
};
export default PostSummary;
