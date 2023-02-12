import React from "react";
import Skeleton from "react-loading-skeleton";

const PostSkeleton: React.FC = () => {
  return (
    <div className="my-4 first-of-type:mt-0 last-of-type:mb-0">
      <Skeleton width={250} height={24} />
      <Skeleton width={200} height={24} />
      <Skeleton count={2} height={(48 - 8) / 2} />
    </div>
  );
};
export default PostSkeleton;
