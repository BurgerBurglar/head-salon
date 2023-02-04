import { type NextPage } from "next";
import Head from "next/head";

const Copyright: NextPage = () => {
  return (
    <>
      <Head>
        <title>版权 - 海德沙龙</title>
      </Head>
      <main className="article">
        <h2>版权</h2>
        <p>
          本站的所有文章，除特别注明之外，都是文章的作者（见每篇文章标题下、“@”符之前）所原创，作者对此保留全部权利，任何人在转载这些文章时须遵守下列规定：
        </p>
        <ol>
          <li className="my-4">
            任何固定介质（包括但不限于纸介质/光盘）媒体若需转载，须征得作者同意；
          </li>
          <li className="my-4">
            任何网站若需转载，须完整保留原文全部内容，再附上原文在本站的URL链接；
          </li>
          <li className="my-4">
            凡标题中包含“饭文”一词的文章，以及其他注明“发表于某某媒体”的文章，其著作权可能部分地由最初发表该文章的媒体拥有，任何转载行为都可能会侵犯他们的权利；
          </li>
          <li className="my-4">
            任何转载这些文章的网站，在收到作者的删除转载内容的要求时，应执行删除要求。
          </li>
        </ol>
      </main>
    </>
  );
};
export default Copyright;
