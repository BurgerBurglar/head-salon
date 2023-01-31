import { Menu as MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

const NAV_PATHS = [
  { path: "/", name: "博文" },
  { path: "/intro", name: "介绍" },
  { path: "/authors", name: "作者" },
  { path: "/copyright", name: "版权" },
  { path: "/about", name: "关于" },
];

const Navbar: React.FC = () => {
  const { asPath: pathname } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <Button
          variant="ghost"
          className="block 
          hover:bg-yellow-200
          focus:bg-yellow-200 focus:ring-yellow-200
          sm:hidden"
          aria-label="menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <MenuIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      {isMenuOpen && (
        <ul
          className="fixed right-0 flex h-full min-w-[10em] flex-col gap-4 
        bg-amber-100 px-4 pt-10 text-center sm:hidden"
        >
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
      )}
    </nav>
  );
};
export default Navbar;