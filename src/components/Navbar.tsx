import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NAV_PATHS = [
  { path: "/", name: "博文" },
  { path: "/intro", name: "介绍" },
  { path: "/authors", name: "作者" },
  { path: "/copyright", name: "版权" },
  { path: "/about", name: "关于" },
];

const Navbar: React.FC = () => {
  const { asPath: pathname } = useRouter();
  return (
    <nav className="bg-amber-100">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-2">
        <div className="flex items-center gap-3 py-2">
          <Image src="/favicon.ico" alt="logo" width={50} height={50} />
          <div>
            <h1 className="text-xl font-bold hover:text-pink-700">
              <Link href="/">海德沙龙 (HeadSalon)</Link>
            </h1>
            <div>A Salon for Heads, No Sofa for Ass</div>
          </div>
        </div>

        <ul className="mr-2 hidden gap-2 sm:flex">
          {NAV_PATHS.map(({ path, name }) => (
            <li
              key={path}
              className={`
              ${path === pathname ? "border-b-4 border-pink-700" : ""}
               hover:text-pink-700`}
            >
              <a href={path} className="px-2">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
