/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { parse } from "node-html-parser";
import { SHOULD_USE_TEST_DATA } from "../constants";
import { type Post, type PostSummary } from "../types";
import {
  cleanHtml,
  getIdFromUrl,
  getPostId,
  getPostMeta,
  getRelatedPosts,
  removeFiller,
  removePrefix,
} from "../utils/parse";
import { frontPageHtml, postHtml } from "./test";

const axiosInstance = axios.create({
  baseURL: "https://headsalon.org/",
});

export const getPosts = async (page: number) => {
  let html: string;
  if (SHOULD_USE_TEST_DATA) {
    html = await new Promise<string>((res) => res(frontPageHtml));
  } else {
    const result = await axiosInstance.get<string>(`/page/${page}`);
    html = result.data;
  }
  const soup = parse(cleanHtml(html));
  const posts = soup.querySelectorAll(".post");

  const postAbstract: PostSummary[] = posts.map((post) => {
    const url = post.querySelector(".post-title")!.querySelector("a")!
      .attributes["href"]!;
    const id = getIdFromUrl(url);

    const title = post.querySelector(".post-title")!.text.trim();

    const { date, numRead, category } = getPostMeta(post);

    const postEntry = post.querySelector(".post-entry")!.text.trim();
    const contentWithoutFiller = removeFiller(postEntry.substring(0, 200));
    const contentWithoutTitle = removePrefix(contentWithoutFiller, title);
    const abstract = removePrefix(contentWithoutTitle, "辉格");

    return {
      id,
      title,
      date,
      numRead,
      abstract,
      category,
    };
  });
  // remove top post because who cares
  return postAbstract.filter(({ id }) => id !== 1);
};

export const getNumPosts = async () => {
  const result = await axiosInstance.get<string>(
    "/wordpress/wp-content/themes/Salon/catalog-ajax.php?q=count&filter=true"
  );
  const numPosts = parseInt(result.data);
  return numPosts;
};

export const getPost = async (id: number): Promise<Post> => {
  let html: string;
  if (SHOULD_USE_TEST_DATA) {
    html = await new Promise<string>((res) => res(postHtml as string));
  } else {
    const result = await axiosInstance.get<string>(`/archives/${id}.html`);
    html = result.data;
  }
  const soup = parse(html);
  const title = soup.querySelector(".post-title")!.text;

  const bodySoup = soup.querySelector(".post-entry")!;

  const relatedPostTitleSoup = bodySoup.querySelector(".related_post_title")!;
  const relatedPostSoup = bodySoup.querySelector(".related_post")!;
  relatedPostTitleSoup.remove();
  relatedPostSoup.remove();

  const anchors = bodySoup.querySelectorAll("a");
  // update all post URLs to this site
  anchors
    .filter((anchor) =>
      anchor.getAttribute("href")?.includes("https://headsalon.org/archives/")
    )
    .forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href) return;
      const postId = getPostId(href);
      anchor.setAttribute("href", `/posts/${postId}`);
    });

  const body = bodySoup.innerHTML;

  const { date, numRead, category } = getPostMeta(soup);

  const relatedPost = getRelatedPosts(relatedPostSoup);

  return {
    title,
    body,
    relatedPost,
    date,
    numRead,
    category,
  };
};
