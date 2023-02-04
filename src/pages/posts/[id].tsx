import { type GetServerSideProps, type NextPage } from "next";
import PostMeta from "../../components/posts/PostMeta";
import { getPost } from "../../scraper/fetch";
import { type Post } from "../../types";

const Post: NextPage<Post> = ({
  title,
  body,
  relatedPost,
  date,
  numRead,
  category,
}) => {
  return (
    <main className="article">
      <h2>{title}</h2>
      <PostMeta date={date} numRead={numRead} category={category} />
      <article dangerouslySetInnerHTML={{ __html: body }} />
      <h3 className="">相关文章</h3>
      <div>
        {relatedPost.map(({ id, title }) => (
          <div key={id} className="my-2">
            <a href={`/posts/${id}`}>{title}</a>
          </div>
        ))}
      </div>
    </main>
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
