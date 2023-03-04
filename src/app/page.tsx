import Link from "next/link";
import { PUBLISHED_BOOKS } from "../constants";
import { fetchBookReviews, fetchPostsSummary } from "../scraper/fetch";
import PostSummary from "./(posts)/PostSummary";
import BookReviewSection from "./BookReviewSection";
import BookSummary from "./BookSummary";

export default async function Home() {
  const { data: bookReviews } = await fetchBookReviews(1, 9);
  const posts = await fetchPostsSummary(1);

  return (
    <main>
      <h2 className="my-4 text-start text-2xl font-bold text-pink-600">
        辉格的书
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {PUBLISHED_BOOKS.map((book) => (
          <BookSummary key={book.title} {...book} />
        ))}
      </div>

      <h2 className="my-4 text-start text-2xl font-bold text-pink-600">
        最新博文
      </h2>
      <section className="flex flex-col">
        {posts.map((post) => {
          return <PostSummary key={post.id} {...post} />;
        })}
      </section>
      <div className="flex justify-center">
        <Link
          href="/blogs/1"
          className="mt-5 rounded-lg border border-pink-600 px-3 py-1 text-pink-600
          hover:bg-pink-50 active:bg-pink-100
          "
        >
          查看全部
        </Link>
      </div>

      <h2 className="my-4 text-start text-2xl font-bold text-pink-600">
        辉格的书评
      </h2>
      <BookReviewSection bookReviews={bookReviews} />
      <div className="flex justify-center">
        <Link
          href="/reviews/1"
          className="mt-5 rounded-lg border border-pink-600 px-3 py-1 text-pink-600
          hover:bg-pink-50 active:bg-pink-100
          "
        >
          查看全部
        </Link>
      </div>
    </main>
  );
}

export const revalidate = 300;

export const metadata = {
  title: "海德沙龙",
  description: "headsalon.org镜像，辉格的博客。",
  icons: {
    icon: "/favicon.ico",
  },
  referrer: "origin-when-crossorigin",
  keywords: ["博客", "辉格", "海德沙龙"],
  authors: ["辉格"],
  creator: "Shuo Tian",
  formatDetection: {
    email: "yes",
    address: "yes",
    telephone: "yes",
  },
  openGraph: {
    title: "海德沙龙",
    description: "headsalon.org镜像，辉格的博客。",
    url: "https://head-salon.shuo.rocks",
    siteName: "https://shuo.rocks",
    images: [
      {
        url: "/favicon.ico",
        width: 800,
        height: 600,
      },
    ],
    locale: "zh-CN",
    type: "website",
  },
};
