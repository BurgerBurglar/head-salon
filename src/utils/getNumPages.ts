import { NUM_POSTS_PER_PAGE } from "../constants";
import { fetchNumPosts } from "../scraper/fetch";

const getNumPages = async () => {
  const numPosts = await fetchNumPosts();
  return Math.ceil((numPosts - 1) / NUM_POSTS_PER_PAGE);
};

export default getNumPages;
