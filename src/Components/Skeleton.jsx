import { Fragment } from "react";

export function Skeleton({ short }) {
  return (
    <div
      className="skeleton"
      style={{ width: short ? "45%" : undefined }}
    ></div>
  );
}

export function SkeletonButton() {
  return <div className="skeleton skeleton-btn"></div>;
}

export function SkeletonList({ amount, children }) {
  return (
    <>
      {Array.from({ length: amount }, (_, idx) => idx).map((idx) => (
        <Fragment key={idx}>{children}</Fragment>
      ))}
    </>
  );
}
