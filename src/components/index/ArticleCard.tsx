import React from "react";

interface ArticleCardProps {
  id: number;
  title: string;
  date: Date;
  numReads: number;
  category: string;
  abstract: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  date,
  numReads,
  category,
  abstract,
}) => {
  return (
    <div className="my-4">
      <h2 className="text-lg font-bold text-pink-500">{title}</h2>
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <div>
          {date.toLocaleDateString("zh-CN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
          {" • "}
          阅读({numReads.toLocaleString()})
        </div>
        <span className="rounded-md bg-slate-200 px-2 py-1">{category}</span>
      </div>
      <div className="line-clamp-2">{abstract}</div>
    </div>
  );
};
export default ArticleCard;
