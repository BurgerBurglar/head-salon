import Footer from "./(layout)/Footer";
import Navbar from "./(layout)/Navbar";

import "../styles/globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <div className="mx-auto mt-[68px] w-full max-w-3xl flex-1 py-2 px-4 pb-12">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

export const metadata = {
  title: "海德沙龙 (HeadSalon)",
  description: "辉格的博客，海德沙龙head-salon.org的镜像站点。",
};
