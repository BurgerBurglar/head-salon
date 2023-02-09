import React from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

const BookReviewSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Skeleton width={150} height={212 - 4} />
      <Skeleton width={120} height={20 - 4} />
      <Skeleton width={190} height={21.6 - 4} className="mt-2" />
      <Skeleton width={80} height={24 - 4} />
    </div>
  );
};
export default BookReviewSkeleton;
