import FormGroup from "./FormGroup";
import { SkeletonInput, SkeletonSelect } from "./Skeleton";

export default function PostFormFallback() {
  return (
    <>
      <div className="form-row">
        <FormGroup>
          <label>Title</label>
          <SkeletonInput />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <SkeletonSelect />
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup>
          <label htmlFor="body">Body</label>
          <SkeletonInput large />
        </FormGroup>
      </div>
    </>
  );
}
