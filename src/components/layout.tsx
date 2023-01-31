import Head from "next/head";
import React, { type PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>海德沙龙 (HeadSalon)</title>
        <meta name="description" content="Blog by WhigZhou" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="mx-auto max-w-3xl p-3">{children}</div>
    </>
  );
};
export default Layout;
