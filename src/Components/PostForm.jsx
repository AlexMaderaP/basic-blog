import React, { Suspense } from "react";
import {
  Await,
  Form,
  Link,
  useAsyncValue,
  useNavigation,
} from "react-router-dom";
import Option from "./Option";
import FormGroup from "./FormGroup";
import { SkeletonSelect } from "./Skeleton";

function PostForm({ error = {}, post = {}, usersPromise }) {
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  return (
    <Form method="post" className="form">
      <div className="form-row">
        <FormGroup errorMessage={error.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post.title}
          />
        </FormGroup>
        <FormGroup errorMessage={error.userId}>
          <label htmlFor="userId">Author</label>
          <Suspense fallback={<SkeletonSelect />}>
            <Await resolve={usersPromise}>
              <Users userId={post.userId || ""} />
            </Await>
          </Suspense>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={error.body}>
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" defaultValue={post.body}></textarea>
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="..">
          Cancel
        </Link>
        <button disabled={isSubmitting} className="btn">
          {isSubmitting ? "Submitting" : "Save"}
        </button>
      </div>
    </Form>
  );
}

function Users({ userId }) {
  const users = useAsyncValue();
  return (
    <select type="search" name="userId" id="userId" defaultValue={userId || ""}>
      <option value="">Any</option>
      {users.map((user) => (
        <Option key={user.id} user={user} />
      ))}
    </select>
  );
}

export default PostForm;
