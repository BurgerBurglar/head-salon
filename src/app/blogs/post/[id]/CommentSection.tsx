import Comment from "../../../(posts)/Comment";
import { fetchComments } from "../../../../scraper/fetch";

interface Props {
  id: number;
}

export default async function CommentSection({ id }: Props) {
  const comments = await fetchComments(id);

  return (
    <section className="mt-10">
      <h3>{comments.length ? "评论" : "暂无评论"}</h3>
      {!!comments.length && (
        <div className="mt-4 flex flex-col gap-5">
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      )}
    </section>
  );
}

export const dynamic = "force-dynamic";
