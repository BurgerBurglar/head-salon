import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 py-4 text-sm text-slate-200">
      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-x-6">
        <div>
          Copyright © 2005-2023{" "}
          <Link href="https://headsalon.org" className="hover:underline">
            HeadSalon.org
          </Link>
        </div>
        <div>All Rights Reserved</div>
        <div>
          Contact:{" "}
          <Link href="mailto:HeadSalon@gmail.com" className="hover:underline">
            HeadSalon@gmail.com
          </Link>
        </div>
        <div>
          Original author:{" "}
          <Link className="underline" href="https://weibo.com/whigzhou">
            WhigZhou
          </Link>
        </div>
        <div>
          Site hosted by:{" "}
          <Link className="underline" href="https://shuo.rocks">
            Shuo Tian
          </Link>
        </div>
        <div>
          <Link
            className="flex items-center gap-1 underline"
            href="https://github.com/BurgerBurglar/head-salon"
          >
            <Github /> View the code on GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
