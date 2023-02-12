import { fetchDoubanReviewArticle } from "../../../../scraper/fetch";

interface Props {
  params: { id: string };
}

export default async function Head({ params }: Props) {
  const id = parseInt(params.id);
  try {

    const { title } = await fetchDoubanReviewArticle(id);
    return <title>{title} - 海德沙龙</title>;
  } catch (error) {
    return null
  }
}
