import Head from "next/head";
import React, { type PropsWithChildren } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>海德沙龙 (HeadSalon)</title>
        <meta name="description" content="Blog by WhigZhou" />
        <meta property="og:image" content="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="mx-auto mt-[68px] w-full max-w-3xl flex-1 py-2 px-4 pb-12">
        {children}
      </div>
      <Footer />
    </>
  );
};
export default Layout;
