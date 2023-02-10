/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const getPostId = (url: string) =>
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

export const getDoubanRating = (className?: string) => {
  if (className === undefined) return;
  // example: 40 | 35
  const starString = className.split(" ")[0]!.replace("allstar", "");
  const rating = parseInt(starString) / 10;
  return rating;
};

export const removeInlineStyles = (html: string) =>
  html.replace(/style="(.*?)" /g, "");
