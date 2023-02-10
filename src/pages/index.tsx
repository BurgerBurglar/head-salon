import { type NextPage } from "next";
import Link from "next/link";
import BlogSection from "../components/BlogSection";
import BookReviewSection from "../components/books/BookReviewSection";
import BookSummary from "../components/index/BookSummary";
import { PUBLISHED_BOOKS } from "../constants";
import useBookReviews from "../hooks/useBookReviews";

const Home: NextPage = () => {
  const bookReviews = useBookReviews();
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
      <BlogSection />
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
      <BookReviewSection bookReviews={bookReviews.data} />
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
};

export default Home;
