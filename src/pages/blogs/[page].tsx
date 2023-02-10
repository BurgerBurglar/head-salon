import { type GetStaticPaths, type GetStaticProps, type NextPage } from "next";
import PostPagination from "../../components/posts/PostPagination";
import PostCard from "../../components/posts/PostCard";
import { fetchPostsSummary } from "../../scraper/fetch";
import { type PostSummary } from "../../types";
import getNumPages from "../../utils/getNumPages";
import { rangeFrom1 } from "../../utils/misc";

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
  const paths = rangeFrom1(151).map((n) => ({
    params: { page: n.toString() },
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
  const posts = await fetchPostsSummary(page);
  const numPages = await getNumPages();
  return {
    props: {
      posts,
      numPages,
    },
  };
};

export default Home;
