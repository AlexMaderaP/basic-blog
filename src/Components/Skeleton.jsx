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

export function SkeletonInput({ large }) {
  return (
    <div
      className="skeleton skeleton-input"
      style={{ height: large ? "5em" : undefined }}
    />
  );
}

export function SkeletonSelect() {
  return (
    <select type="search" name="userId" id="userId" disabled>
      <option value="">Loading...</option>
    </select>
  );
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
