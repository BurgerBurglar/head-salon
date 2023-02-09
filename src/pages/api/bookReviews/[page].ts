import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBookReviews } from "../../../scraper/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405);
  const page = parseInt(req.query.page as string);
  const { data: bookReviews } = await fetchBookReviews(page, 9);
  res.status(200).json(bookReviews);
}
