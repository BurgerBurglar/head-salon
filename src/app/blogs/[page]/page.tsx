import { notFound } from "next/navigation";
import PostPagination from "../../(posts)/PostPagination";
import PostCardSummary from "../../(posts)/PostSummary";
import { fetchPostsSummary } from "../../../scraper/fetch";
import getNumPages from "../../../utils/getNumPages";
import { rangeFrom1 } from "../../../utils/misc";

interface Props {
  params: { page: string };
}

export default async function Home({ params }: Props) {
  const numPages = await getNumPages();
  const page = parseInt(params.page);
  if (page > numPages) {
    notFound();
  }
  const posts = await fetchPostsSummary(page);
  return (
    <>
      <main className="flex flex-col">
        {posts.map((post) => {
          return <PostCardSummary key={post.id} {...post} />;
        })}
      </main>
      <PostPagination currentPage={page} numPages={numPages} />
    </>
  );
}
export function generateStaticParams() {
  const CURRENT_NUM_PAGE = 151
  const paths = rangeFrom1(CURRENT_NUM_PAGE).map((n) => ({
    page: n.toString(),
  }));
  return paths;
}

export const revalidate = 300;
