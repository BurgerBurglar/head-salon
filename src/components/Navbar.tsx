import { Menu as MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import SearchButton from "./SearchButton";

const NAV_PATHS = [
  { path: "/blogs/1", name: "博文" },
  { path: "/reviews/1", name: "书评" },
  { path: "/intro", name: "介绍" },
];

const Navbar: React.FC = () => {
  const { asPath: pathname } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isBlog = pathname.includes("/blogs/");
  const isReview = pathname.includes("/reviews");
  return (
    <nav className="fixed z-50 w-full border-b border-slate-300 bg-slate-100">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-2">
        <div className="flex items-center gap-3 py-2">
          <Link className="flex-shrink-0" href="/">
            <Image src="/favicon.ico" alt="logo" width={50} height={50} />
          </Link>
          <div>
            <h1 className="text-xl font-bold hover:text-pink-700">
              <Link href="/">海德沙龙 (HeadSalon)</Link>
            </h1>
            <div className="text-[clamp(0.7rem,4vw,1rem)]">
              A Salon for Heads, No Sofa for Ass
            </div>
          </div>
        </div>

        <ul className="mr-2 hidden items-center gap-2 sm:flex">
          {NAV_PATHS.map(({ path, name }) => {
            const shouldUnderline =
              (isBlog && name === "博文") ||
              (isReview && name == "书评") ||
              path === pathname;
            return (
              <li
                key={path}
                className={clsx(
                  "relative top-1 box-border h-[2em] hover:text-pink-700",
                  {
                    "border-b-4 border-pink-700": shouldUnderline,
                  }
                )}
              >
                <a href={path} className="px-2">
                  {name}
                </a>
              </li>
            );
          })}
          <li>
            <SearchButton />
          </li>
        </ul>
        <Button
          variant="ghost"
          className="block 
          hover:bg-slate-200
          focus:bg-slate-200 focus:ring-pink-200
          sm:hidden"
          aria-label="菜单"
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
        <div className="fixed right-0 flex h-full w-full">
          <div
            className="flex-1 bg-black opacity-30"
            onClick={() => setIsMenuOpen(false)}
          />
          <ul
            className="flex min-w-[10em] flex-col gap-4 
      bg-slate-100 px-4 pt-10 text-center sm:hidden"
          >
            {NAV_PATHS.map(({ path, name }) => (
              <li
                key={path}
                className={clsx("pb-1 hover:text-pink-700", {
                  "border-b-4 border-pink-700": path === pathname,
                })}
              >
                <a href={path} className="px-2">
                  {name}
                </a>
              </li>
            ))}
            <li>
              <SearchButton />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
