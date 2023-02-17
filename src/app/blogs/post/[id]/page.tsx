import { notFound } from "next/navigation";
import PostMeta from "../../../(posts)/PostMeta";
import { fetchPost } from "../../../../scraper/fetch";
import { rangeFrom1 } from "../../../../utils/misc";
import CommentSection from "./CommentSection";

interface Props {
  params: { id: string };
}

export default async function Post({ params }: Props) {
  const id = parseInt(params.id);
  try {
    const { title, body, relatedPosts, date, numRead, category } =
      await fetchPost(id);
    return (
      <main className="article">
        <div className="flex items-center gap-2 ">
          <h2>{title}</h2>
        </div>
        <PostMeta date={date} numRead={numRead} category={category} />
        <article dangerouslySetInnerHTML={{ __html: body }} />
        <h3>相关文章</h3>
        <section>
          {relatedPosts.map(({ id, title }) => (
            <div key={id} className="my-2">
              <a href={`/blogs/post/${id}`}>{title}</a>
            </div>
          ))}
        </section>
        {/* @ts-expect-error Server Component */}
        <CommentSection id={id} />
      </main>
    );
  } catch (error) {
    notFound();
  }
}
export function generateStaticParams() {
  const FIRST_POST_TO_BUILD = 8023;
  const CURRENT_LARGEST_POST_ID = 9023;
  const paths = rangeFrom1(CURRENT_LARGEST_POST_ID)
    .slice(FIRST_POST_TO_BUILD)
    .map((n) => ({
      id: n.toString(),
    }));
  return paths;
}
