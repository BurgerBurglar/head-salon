"use client";

import { CornerUpLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const handleBack = () => history.back();
  return <div className="mt-5 flex flex-col items-center gap-2">
    <h2 className="text-2xl">你要找的页面不存在</h2>
    <div className="flex justify-center gap-5">
      <button
        className="flex gap-2 rounded-lg border border-pink-600 px-3 py-1 text-pink-600
      hover:bg-pink-50 active:bg-pink-100"
        onClick={handleBack}
      >
        <CornerUpLeft />
        返回
      </button>
      <Link
        className="flex gap-2 rounded-lg border border-pink-600 px-3 py-1 text-pink-600
      hover:bg-pink-50 active:bg-pink-100"
        href="/"
      >
        <Home />
        主页
      </Link>
    </div>
  </div>
}