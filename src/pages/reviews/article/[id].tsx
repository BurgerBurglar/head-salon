import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import ReviewMeta from "../../../components/books/ReviewMeta";
import { fetchDoubanReviewArticle } from "../../../scraper/fetch";
import type { BookReviewArticle } from "../../../types";

const ReviewArticle: NextPage<BookReviewArticle> = ({
  title,
  bookTitle,
  rating,
  date,
  body,
}) => {
  return (
    <>
      <Head>
        <title>{title} - 海德沙龙</title>
      </Head>
      <main className="article">
        <div className="flex items-center gap-2 ">
          <h2>{title}</h2>
        </div>
        <ReviewMeta date={date} bookTitle={bookTitle} rating={rating} />
        <article dangerouslySetInnerHTML={{ __html: body }} />
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [].map((n: number) => ({
    params: { id: n.toString() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps<BookReviewArticle> = async ({
  params,
}) => {
  const id = parseInt(params?.id as string);
  const article = await fetchDoubanReviewArticle(id);
  return { props: article };
};
export default ReviewArticle;
