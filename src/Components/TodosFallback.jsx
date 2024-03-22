import { Skeleton, SkeletonList } from "./Skeleton";

export default function TodosFallback({ lines }) {
  return (
    <ul>
      <SkeletonList amount={lines}>
        <li>
          <Skeleton short />
        </li>
      </SkeletonList>
    </ul>
  );
}
