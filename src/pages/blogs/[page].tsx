import { type GetStaticPaths, type GetStaticProps, type NextPage } from "next";
import PostCard from "../../components/index/PostCard";
import { getPosts } from "../../scraper/fetch";
import { type PostSummary } from "../../types";

interface Props {
  posts: PostSummary[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <main className="flex flex-col">
      {posts.map((post) => {
        return <PostCard key={post.id} {...post} />;
      })}
    </main>
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
  return {
    props: {
      posts,
    },
  };
};

export default Home;
