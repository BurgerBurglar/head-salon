import { type GetStaticProps } from "next";
import { getNumPosts, getPosts } from "../scraper/fetch";
import Posts from "./blogs/[page]";

const Home = Posts;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts("1");
  const numPosts = await getNumPosts();
  return {
    props: {
      posts,
      numPosts,
    },
  };
};

export default Home;
