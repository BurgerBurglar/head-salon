import { useQuery } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import type { ParsedUrlQuery } from "querystring";
import Comment from "../../../components/posts/Comment";
import PostMeta from "../../../components/posts/PostMeta";
import { fetchCommentsInFront, fetchPost } from "../../../scraper/fetch";
import { type Post } from "../../../types";

const Post: NextPage<Post> = ({
  id,
  title,
  body,
  relatedPosts,
  date,
  numRead,
  category,
}) => {
  const comments = useQuery({
    queryKey: [id, "comments"],
    queryFn: () => fetchCommentsInFront(id),
  });

  return (
    <>
      <Head>
        <title>{title} - 海德沙龙</title>
      </Head>
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
        <section className="mt-10">
          <h3>{comments.data?.length ? "评论" : "暂无评论"}</h3>
          {!!comments.data?.length && (
            <div className="mt-4 flex flex-col gap-5">
              {comments.data.map((comment) => (
                <Comment key={comment.id} {...comment} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths: { params: ParsedUrlQuery }[] = [];
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Post> = async ({ params }) => {
  const id = parseInt(params?.id as string);
  const post = await fetchPost(id);
  return {
    props: post,
  };
};
export default Post;
