/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { type HTMLElement } from "node-html-parser";
import type { Reply, Comment, RelatedPost, Post, BookReview } from "../types";
import {
  getDoubanRating,
  getPostId,
  removeFiller,
  removePrefix,
} from "./string";

export const parsePostSummary = (post: HTMLElement) => {
  const url = post.querySelector(".post-title")!.querySelector("a")!.attributes[
    "href"
  ]!;
  const id = getPostId(url);

  const title = post.querySelector(".post-title")!.text.trim();

  const { date, numRead, category } = parsePostMeta(post);

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
};

export const parsePostMeta = (post: HTMLElement) => {
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

export const parseRelatedPosts = (post: HTMLElement): RelatedPost[] => {
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

export const parsePost = (post: HTMLElement): Post => {
  const titleSoup = post.querySelector(".post-title")!;
  const title = titleSoup.text;
  const url = titleSoup.querySelector("a")!.getAttribute("href")!;
  const id = getPostId(url);

  const { date, numRead, category } = parsePostMeta(post);

  const bodySoup = post.querySelector(".post-entry")!;

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

  const relatedPosts = parseRelatedPosts(relatedPostSoup);

  return {
    id,
    title,
    body,
    relatedPosts,
    date,
    numRead,
    category,
  };
};

const parseReplies = (comment: HTMLElement): Reply[] => {
  const repliesSoup = comment.querySelectorAll(".comment-childs");
  const replies = repliesSoup.map((reply) => {
    const id = parseInt(reply.id.split("-")[1]!);
    const username = reply.querySelector("p>cite")!.text;
    const dateText = comment.querySelector(".commentmetadata")!.text;
    const [month, day, year] = dateText.match(/\d+/g)!;
    const date = new Date(
      Date.parse(`${year!}-${month}-${day!}`)
    ).toLocaleDateString();
    const content = reply.querySelector("p:nth-of-type(2)")!.text;
    return { id, username, date, content };
  });
  return replies;
};

export const parseComments = (post: HTMLElement): Comment[] => {
  const commentsSection = post.getElementById("comments");
  const commentsSoup = commentsSection.querySelectorAll(".commentlist li");

  const comments = commentsSoup.map((comment) => {
    const id = parseInt(comment.id.split("-")[1]!);
    const username = comment.querySelector("h4 cite")!.text;
    const dateSoup = comment.querySelector("h4 a[title]")!;
    const date = new Date(dateSoup.text).toLocaleDateString();
    const content = comment.querySelector("h4+p")!.text;

    const replies = parseReplies(comment);

    return { id, username, date, content, replies };
  });

  return comments;
};

export const parseBookReviews = (book: HTMLElement): BookReview => {
  const id = parseInt(book.getAttribute("id") as string);
  const image = book.querySelector(".subject-img>img")!;
  const imgUrl = image.getAttribute("src")!;
  const bookTitle = image.getAttribute("title")!;
  const ratingClassName = book
    .querySelector(".main-title-rating")
    ?.getAttribute("class");
  const rating = getDoubanRating(ratingClassName);
  const title = book.querySelector("h2>a")!.text;
  const summary = book.querySelector(".short-content")!.text.trim();

  return { id, bookTitle, imgUrl, rating, title, summary };
};
