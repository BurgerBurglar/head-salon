import { type GetStaticPaths, type GetStaticProps, type NextPage } from "next";
import Pagination from "../../components/posts/Pagination";
import PostCard from "../../components/posts/PostCard";
import { getPosts } from "../../scraper/fetch";
import { type PostSummary } from "../../types";
import getNumPages from "../../utils/getNumPages";

interface Props {
  posts: PostSummary[];
  numPages: number;
}

const Home: NextPage<Props> = ({ posts, numPages }) => {
  // the first page has 1 more post on headsalon.org
  return (
    <>
      <main className="flex flex-col">
        {posts.map((post) => {
          return <PostCard key={post.id} {...post} />;
        })}
      </main>
      <Pagination numPages={numPages} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const numPage = await getNumPages();
  // range(0, numPage)
  const paths = Array.from(Array(numPage), (_, n: number) => ({
    params: { page: (n + 1).toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const page = params?.page as string;
  const posts = await getPosts(page);
  const numPages = await getNumPages();
  return {
    props: {
      posts,
      numPages,
    },
  };
};

export default Home;
