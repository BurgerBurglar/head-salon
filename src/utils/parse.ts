/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const getIdFromUrl = (url: string) =>
  parseInt(url.substring(url.lastIndexOf("/") + 1).split(".")[0]!);

export const cleanHtml = (html: string) => html.replaceAll("<span>\n", "");
