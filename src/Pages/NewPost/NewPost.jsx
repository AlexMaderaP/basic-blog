import React, { Suspense } from "react";
import {
  Await,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { createNewPost } from "../../api/posts";
import PostForm from "../../Components/PostForm";
import FormGroup from "../../Components/FormGroup";

function NewPost() {
  const error = useActionData();
  const { usersPromise } = useLoaderData();

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Suspense fallback={<SuspensePostForm />}>
        <Await resolve={usersPromise}>
          {(users) => <PostForm error={error} users={users} />}
        </Await>
      </Suspense>
    </>
  );
}

async function action({ request }) {
  const formData = await request.formData();

  const title = formData.get("title");
  const userId = formData.get("userId");
  const body = formData.get("body");
  const error = {};

  if (!title) {
    error.title = "Title is required";
  }
  if (!body) {
    error.body = "Body is required";
  }
  if (!userId) {
    error.userId = "UserId is required";
  }
  if (error.title || error.body || error.userId) {
    return error;
  }

  const data = {
    title,
    userId,
    body,
  };

  const post = await createNewPost(data, { signal: request.signal });

  return redirect(`/posts/${post.id}`);
}

export const newPostRoute = {
  action,
  element: <NewPost />,
};

function SuspensePostForm() {
  return (
    <>
      <div className="form-row">
        <FormGroup>
          <label>Title</label>
          <input className="skeleton skeleton-input" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <input className="skeleton skeleton-input" />
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup>
          <label htmlFor="body">Body</label>
          <div className="skeleton skeleton-input"></div>
        </FormGroup>
      </div>
    </>
  );
}
