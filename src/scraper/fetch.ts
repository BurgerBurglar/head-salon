/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { parse } from "node-html-parser";
import { SHOULD_USE_TEST_DATA } from "../constants";
import { type PostSummary } from "../types";
import {
  cleanHtml,
  getIdFromUrl,
  removeFiller,
  removePrefix,
} from "../utils/parse";
import { frontPageHtml } from "./test";

const axiosInstance = axios.create({
  baseURL: "https://headsalon.org/",
});

export const getPosts = async () => {
  let html: string;
  if (SHOULD_USE_TEST_DATA) {
    html = await new Promise<string>((res) => res(frontPageHtml));
  } else {
    const result = await axiosInstance.get<string>("/");
    html = result.data;
  }
  const soup = parse(cleanHtml(html));
  const posts = soup.querySelectorAll(".post");

  const postAbstract: PostSummary[] = posts.map((post) => {
    const url = post.querySelector(".post-title")!.querySelector("a")!
      .attributes["href"]!;
    const id = getIdFromUrl(url);

    const title = post.querySelector(".post-title")!.text.trim();

    const meta = post.querySelector(".post-meta-left")!;
    const metaChildren = meta.childNodes;

    const dateTimeString = metaChildren[3]!.text.substring(3, 19);
    const date = new Date(dateTimeString);

    const numReadString = metaChildren[5]!.text.split("(")[1]!.split(")")[0]!;
    const numRead = parseInt(numReadString.replaceAll(",", ""));

    const category = post.querySelector('[rel="category tag"]')!.text;

    const postEntry = post.querySelector(".post-entry")!.text.trim();
    const contentWithoutFiller = removeFiller(postEntry.substring(0, 200));
    const contentWithoutTitle = removePrefix(contentWithoutFiller, title);
    const abstract = removePrefix(contentWithoutTitle, "辉格");

    return {
      id,
      title,
      date: date.toLocaleDateString(),
      numRead,
      abstract,
      category,
    };
  });
  return postAbstract;
};
