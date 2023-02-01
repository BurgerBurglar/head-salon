import { type GetStaticPaths, type GetStaticProps, type NextPage } from "next";
import Pagination from "../../components/posts/Pagination";
import PostCard from "../../components/posts/PostCard";
import { NUM_POSTS_PER_PAGE } from "../../constants";
import { getNumPosts, getPosts } from "../../scraper/fetch";
import { type PostSummary } from "../../types";

interface Props {
  posts: PostSummary[];
  numPosts: number;
}

const Home: NextPage<Props> = ({ posts, numPosts }) => {
  // the first page has 1 more post on headsalon.org
  const numPage = Math.ceil((numPosts - 1) / NUM_POSTS_PER_PAGE);
  return (
    <>
      <main className="flex flex-col">
        {posts.map((post) => {
          return <PostCard key={post.id} {...post} />;
        })}
      </main>
      <Pagination numPage={numPage} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { page: "1" } }, { params: { page: "2" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = params?.page as string;
  const posts = await getPosts(page);
  const numPosts = await getNumPosts();
  return {
    props: {
      posts,
      numPosts,
    },
  };
};

export default Home;
