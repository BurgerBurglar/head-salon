import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReviewMeta from "../../../(books)/ReviewMeta";
import { fetchDoubanReviewArticle } from "../../../../scraper/fetch";

interface Props {
  params: { id: string };
}
export default async function ReviewArticle({ params }: Props) {
  const id = parseInt(params.id);
  try {
    const { title, rating, body, date, bookTitle } =
      await fetchDoubanReviewArticle(id);
    return (
      <main className="article">
        <div className="flex items-center gap-2 ">
          <h2>{title}</h2>
        </div>
        <ReviewMeta date={date} bookTitle={bookTitle} rating={rating} />
        <article dangerouslySetInnerHTML={{ __html: body }} />
      </main>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseInt(params.id);
  try {
    const { title } = await fetchDoubanReviewArticle(id);
    return {
      title,
    };
  } catch (error) {
    notFound();
  }
}
