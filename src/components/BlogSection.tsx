import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchPostsSummaryInFront } from "../scraper/fetch";
import { rangeFrom1 } from "../utils/misc";
import PostCard from "./posts/PostCard";
import PostSkeleton from "./posts/PostSkeleton";

const BlogSection: React.FC = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPostsSummaryInFront(1),
  });
  return (
    <section className="flex flex-col">
      {posts?.map((post) => {
        return <PostCard key={post.id} {...post} />;
      })}
      {!posts && rangeFrom1(5).map((n) => <PostSkeleton key={n} />)}
    </section>
  );
};
export default BlogSection;
