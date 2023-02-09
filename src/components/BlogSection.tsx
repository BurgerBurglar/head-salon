import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchPostsInFront } from "../scraper/fetch";
import PostCard from "./posts/PostCard";

const BlogSection: React.FC = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPostsInFront(1),
  });
  return (
    <section className="flex flex-col">
      {posts?.map((post) => {
        return <PostCard key={post.id} {...post} />;
      })}
    </section>
  );
};
export default BlogSection;
