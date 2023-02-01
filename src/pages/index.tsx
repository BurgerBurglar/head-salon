import { type GetStaticProps } from "next";
import { getPosts } from "../scraper/fetch";
import Posts from "./blogs/[page]";


const Home = Posts

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts("1");
  return {
    props: {
      posts,
    },
  };
};

export default Home;
