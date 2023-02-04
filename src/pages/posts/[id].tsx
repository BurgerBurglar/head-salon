import { Link } from "lucide-react";
import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import PostMeta from "../../components/posts/PostMeta";
import { CopyTooltipContent, TooltipWrapper } from "../../components/Tooltip";
import { getPost } from "../../scraper/fetch";
import { type Post } from "../../types";
import { handleCopy } from "../../utils/misc";

const Post: NextPage<Post> = ({
  title,
  body,
  relatedPost,
  date,
  numRead,
  category,
}) => {
  return (
    <>
      <Head>
        <title>{title} - 海德沙龙</title>
      </Head>
      <main className="article">
        <TooltipWrapper side="right" content={<CopyTooltipContent />}>
          <div
            className="flex cursor-pointer items-center gap-2 text-pink-500 hover:underline"
            onClick={() => handleCopy(window.location.href)}
          >
            <h2>{title}</h2>
            <Link />
          </div>
        </TooltipWrapper>
        <PostMeta date={date} numRead={numRead} category={category} />
        <article dangerouslySetInnerHTML={{ __html: body }} />
        <h3 className="">相关文章</h3>
        <section>
          {relatedPost.map(({ id, title }) => (
            <div key={id} className="my-2">
              <a href={`/posts/${id}`}>{title}</a>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps<Post> = async ({
  params,
}) => {
  const id = parseInt(params?.id as string);
  const { title, body, relatedPost, date, numRead, category } = await getPost(
    id
  );
  return {
    props: {
      title,
      body,
      relatedPost,
      date,
      numRead,
      category,
    },
  };
};
export default Post;
