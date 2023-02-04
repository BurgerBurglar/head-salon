/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type HTMLElement } from "node-html-parser";
import { type RelatedPost } from "../types";

export const getIdFromUrl = (url: string) =>
  parseInt(url.substring(url.lastIndexOf("/") + 1).split(".")[0]!);

export const cleanHtml = (html: string) => html.replaceAll("<span>\n", "");

export const removeFiller = (content: string) => {
  const DATE_AND_BEFORE_REGEX = /.*(\d+年\d+月\d+日\s|【\d+-\d+-\d+】\s)/;
  const FILLERS = ["●"];
  const contentWithoutDate = content.replace(DATE_AND_BEFORE_REGEX, "");
  return contentWithoutDate.replaceAll(new RegExp(FILLERS.join("|"), "gi"), "");
};

export const removePrefix = (content: string, prefix: string) => {
  if (!content.startsWith(prefix)) return content;
  return content.replace(prefix, "").trim();
};

export const getPostMeta = (post: HTMLElement) => {
  const meta = post.querySelector(".post-meta-left")!;
  const metaChildren = meta.childNodes;

  const dateTimeString = metaChildren[3]!.text.substring(3, 19);
  const date = new Date(dateTimeString).toLocaleDateString();

  const numReadString = metaChildren[5]!.text.split("(")[1]!.split(")")[0]!;
  const numRead = parseInt(numReadString.replaceAll(",", ""));

  const category = meta.querySelector('[rel="category tag"]')!.text;

  return {
    date,
    numRead,
    category,
  };
};

export const getRelatedPosts = (element: HTMLElement): RelatedPost[] => {
  const anchors = element.querySelectorAll("a");
  return anchors.map((anchor) => {
    const originalHref = anchor.attributes.href!;
    const postId = parseInt(
      originalHref.substring(originalHref.lastIndexOf("/") + 1).split(".")[0]!
    );
    return {
      id: postId,
      title: anchor.innerText,
    };
  });
};
