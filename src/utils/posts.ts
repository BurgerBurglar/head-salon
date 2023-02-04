/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { type HTMLElement } from "node-html-parser";
import { type RelatedPost } from "../types";

export const getPostId = (href: string) =>
  parseInt(href.substring(href.lastIndexOf("/") + 1).split(".")[0]!);

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
    const postId = getPostId(originalHref);
    return {
      id: postId,
      title: anchor.innerText,
    };
  });
};
