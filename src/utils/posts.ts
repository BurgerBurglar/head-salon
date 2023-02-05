/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { type HTMLElement } from "node-html-parser";
import { type Comment, type RelatedPost } from "../types";

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

export const getRelatedPosts = (post: HTMLElement): RelatedPost[] => {
  const anchors = post.querySelectorAll("a");
  return anchors.map((anchor) => {
    const originalHref = anchor.attributes.href!;
    const postId = getPostId(originalHref);
    return {
      id: postId,
      title: anchor.innerText,
    };
  });
};

export const getComments = (post: HTMLElement): Comment[] => {
  const commentsSection = post.getElementById("comments");
  const commentsSoup = commentsSection.querySelectorAll(".commentlist li");

  const comments = commentsSoup.map((comment) => {
    const id = parseInt(comment.id.split("-")[1]!);
    const username = comment.querySelector("h4 cite")!.text;
    const dateSoup = comment.querySelector("h4 a[title]")!;
    const date = new Date(dateSoup.text).toLocaleDateString();
    const content = comment.querySelector("h4+p")!.text;
    return { id, username, date, content };
  });

  return comments;
};
