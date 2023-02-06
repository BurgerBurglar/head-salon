/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { parse } from "node-html-parser";
import { type Comment, type Post, type PostSummary } from "../types";
import { parseComments, parsePost, parsePostSummary } from "../utils/parseHtml";
import { cleanHtml } from "../utils/string";

const axiosInstance = axios.create({
  baseURL: "https://headsalon.org/",
});

export const getPosts = async (page: number) => {
  const result = await axiosInstance.get<string>(`/page/${page}`);
  const html = result.data;
  const soup = parse(cleanHtml(html));
  const posts = soup.querySelectorAll(".post");
  const postAbstract: PostSummary[] = posts.map(parsePostSummary);
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

// run on build time
export const getPost = async (id: number): Promise<Post> => {
  const result = await axiosInstance.get<string>(`/archives/${id}.html`);
  const html = result.data;
  const soup = parse(html);
  return parsePost(soup);
};

// run on request time
export const getComments = async (id: number): Promise<Comment[]> => {
  const result = await axiosInstance.get<string>(`/archives/${id}.html`);
  const html = result.data;
  const soup = parse(html);
  return parseComments(soup);
};

export const fetchCommentsInFront = async (id: number) => {
  const result = await axios.get<Comment[]>(`/api/posts/${id}/comments`);
  return result.data;
};
