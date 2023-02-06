import type { NextApiRequest, NextApiResponse } from "next";
import { getComments } from "../../../../scraper/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405);
  const id = parseInt(req.query.id as string);
  const comments = await getComments(id);
  res.status(200).json(comments);
}
