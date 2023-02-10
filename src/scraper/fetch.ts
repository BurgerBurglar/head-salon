/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { parse } from "node-html-parser";
import type { BookReview, Comment, Post, PostSummary } from "../types";
import {
  parseBookReviews,
  parseComments,
  parsePost,
  parsePostSummary,
  parseReviewArticle,
} from "../utils/parseHtml";
import { cleanHtml, removeInlineStyles } from "../utils/string";

const headAxios = axios.create({
  baseURL: "https://headsalon.org/",
});

const doubanAxios = axios.create({
  baseURL: "https://www.douban.com/people/whigzhou",
});

export const fetchPostsSummary = async (page: number) => {
  const result = await headAxios.get<string>(`/page/${page}`);
  const html = result.data;
  const soup = parse(cleanHtml(html));
  const posts = soup.querySelectorAll(".post");
  const postAbstract = posts
    .map(parsePostSummary)
    .filter((e) => e !== undefined) as PostSummary[];
  // remove top post because who cares
  return postAbstract.filter(({ id }) => id !== 1);
};

export const fetchPostsSummaryInFront = async (page: number) => {
  const result = await axios.get<PostSummary[]>(`/api/blogs/${page}`);
  return result.data;
};

export const fetchNumPosts = async () => {
  const result = await headAxios.get<string>(
    "/wordpress/wp-content/themes/Salon/catalog-ajax.php?q=count&filter=true"
  );
  const numPosts = parseInt(result.data);
  return numPosts;
};

// run on build time
export const fetchPost = async (id: number): Promise<Post> => {
  const result = await headAxios.get<string>(`/archives/${id}.html`);
  const html = result.data;
  const soup = parse(removeInlineStyles(html));
  return parsePost(soup);
};

// run on request time
export const fetchComments = async (id: number): Promise<Comment[]> => {
  const result = await headAxios.get<string>(`/archives/${id}.html`);
  const html = result.data;
  const soup = parse(html);
  return parseComments(soup);
};

export const fetchCommentsInFront = async (id: number) => {
  const result = await axios.get<Comment[]>(`/api/blogs/post/${id}/comments`);
  return result.data;
};

export const fetchSearchPosts = async (q: string) => {
  const result = await headAxios.get<string>("/", { params: { s: q } });
  const html = result.data;
  const soup = parse(cleanHtml(html));
  const posts = soup.querySelectorAll(".post");
  const postsSummary = posts
    .map(parsePostSummary)
    .filter((e) => e !== undefined) as PostSummary[];
  return postsSummary;
};

export const fetchBookReviews = async (page = 1, limit?: number) => {
  const REVIEWS_PER_PAGE = 10;
  const result = await doubanAxios.get<string>("/reviews", {
    params: { start: (page - 1) * REVIEWS_PER_PAGE },
  });
  const html = result.data;
  const soup = parse(html);
  const numPages = parseInt(
    soup.querySelector(".paginator>.thispage")!.getAttribute("data-total-page")!
  );
  const booksSoup = soup.querySelectorAll(".main.review-item");
  const bookReviews = booksSoup.map(parseBookReviews);
  return {
    data: bookReviews.slice(0, limit),
    numPages,
  };
};

export const fetchBookReviewsInFront = async (page: number) => {
  const result = await axios.get<BookReview[]>(`/api/bookReviews/${page}`);
  return result.data;
};

export const fetchDoubanReviewArticle = async (id: number) => {
  const result = await axios.get<string>(
    `https://book.douban.com/review/${id}`
  );
  const html = result.data;
  const soup = parse(html);
  return parseReviewArticle(soup);
};
