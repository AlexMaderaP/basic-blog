import React from "react";
import { Skeleton, SkeletonButton, SkeletonList } from "./Skeleton";

function CardFallback({ numCards = 6 }) {
  return (
    <div className="card-grid">
      <SkeletonList className="card" amount={numCards}>
        <div className="card">
          <div className="card-header">
            <Skeleton short />
          </div>
          <div className="card-body">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div className="card-footer">
            <SkeletonButton />
          </div>
        </div>
      </SkeletonList>
    </div>
  );
}

export default CardFallback;
