import { notFound } from "next/navigation";
import PostCard from "../../(posts)/PostSummary";
import { fetchSearchPosts } from "../../../scraper/fetch";

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Search({ searchParams }: Props) {
  const q = searchParams?.q;
  if (typeof q !== "string") {
    notFound();
  }
  const posts = await fetchSearchPosts(q);

  return (
    <main className="flex flex-col">
      {posts.length === 0 && (
        <div className="mt-2 text-center text-xl font-bold text-pink-600">
          暂无结果
        </div>
      )}
      {posts.map((post) => {
        return <PostCard key={post.id} {...post} />;
      })}
    </main>
  );
}

export const dynamic = "force-dynamic";
