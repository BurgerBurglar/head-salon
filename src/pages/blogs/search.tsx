import type { GetServerSideProps, NextPage } from "next";
import PostCard from "../../components/posts/PostCard";
import { fetchSearchPosts } from "../../scraper/fetch";
import type { PostSummary } from "../../types";

interface Props {
  posts: PostSummary[];
}

const Search: NextPage<Props> = ({ posts }) => {
  return (
    <main className="flex flex-col">
      {posts.length === 0 && (
        <div className="mt-2 text-center text-xl font-bold text-pink-600">
          暂无结果
        </div>
      )}
      {posts.map((post) => {
        return <PostCard key={post.id} {...post} />;
      })}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const q = query.q;
  if (typeof q !== "string") {
    return {
      notFound: true,
    };
  }
  const posts = await fetchSearchPosts(q);
  return { props: { posts } };
};

export default Search;
