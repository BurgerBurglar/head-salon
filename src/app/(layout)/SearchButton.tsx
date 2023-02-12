"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/app/(ui)/dialog";
import { Search } from "lucide-react";
import React, { useRef, type FormEventHandler } from "react";

const SearchButton: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const query = searchRef.current?.value;
    if (!query) return;
    window.location.href = `/blogs/search?q=${query}`;
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <button
            className="sm:max-w-30 relative inline-flex h-9 
    w-full min-w-[130px] appearance-none 
    items-center justify-start rounded-md 
    border border-slate-400 bg-transparent py-2 
    px-4 text-sm 
    font-medium 
    text-slate-600 transition-colors hover:bg-slate-100 focus:outline-none 
    focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            style={{ WebkitAppearance: "none" }}
            // fixes iOS Chrome display issue
          >
            <Search width="1.3em" className="mr-2" />
            搜索文章
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[425px]">
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Search width="1.3em" className="mx-3 text-slate-500" />
          <input
            className="flex h-11 w-full rounded-md bg-transparent
            py-3 text-lg outline-none
            placeholder:text-slate-400"
            type="text"
            placeholder="搜索文章"
            ref={searchRef}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default SearchButton;
