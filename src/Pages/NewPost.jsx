import React from "react";
import { getUsers } from "../api/users";
import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { createNewPost } from "../api/posts";
import PostForm from "../Components/PostForm";

function NewPost() {
  const error = useActionData();
  const users = useLoaderData();
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm error={error} users={users} isSubmitting={isSubmitting} />
    </>
  );
}

function loader({ request: { signal } }) {
  return getUsers({ signal });
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
  loader,
  action,
  element: <NewPost />,
};
