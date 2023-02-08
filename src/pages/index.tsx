import { type NextPage } from "next";
import BookSummary from "../components/index/BookSummary";
import { PUBLISHED_BOOKS } from "../constants";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <h2 className="my-4 text-start text-xl font-bold text-pink-500">
          辉格的书
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {PUBLISHED_BOOKS.map((book) => (
            <BookSummary key={book.title} {...book} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
