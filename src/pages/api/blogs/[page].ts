import type { NextApiRequest, NextApiResponse } from "next";
import { getPosts } from "../../../scraper/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405);
  const page = parseInt(req.query.page as string);
  const posts = await getPosts(page);
  res.status(200).json(posts.slice(0, 5));
}
