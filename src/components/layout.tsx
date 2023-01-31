import Head from "next/head";
import React, { type PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>海德沙龙 (HeadSalon)</title>
        <meta name="description" content="Blog by WhigZhou" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};
export default Layout;
