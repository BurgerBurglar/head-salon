import { type GetStaticPaths, type GetStaticProps, type NextPage } from "next";
import PostPagination from "../../components/posts/PostPagination";
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
      <PostPagination numPages={numPages} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [1, 2, 3].map((n) => ({
    params: { page: (n + 1).toString() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const numPage = await getNumPages();
  const page = parseInt(params?.page as string);
  if (page > numPage)
    return {
      notFound: true,
    };
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
