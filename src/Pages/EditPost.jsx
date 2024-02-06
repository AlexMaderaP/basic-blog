import React from "react";
import { getPostById, updateNewPost } from "../api/posts";
import { getUsers } from "../api/users";
import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import PostForm from "../Components/PostForm";

function EditPost() {
  const { post, users } = useLoaderData();
  const error = useActionData();
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm
        error={error}
        post={post}
        users={users}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

async function loader({ params, request: { signal } }) {
  const post = await getPostById(params.postId, { signal });
  const users = await getUsers({ signal });

  return { post, users };
}

async function action({ params, request }) {
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

  await updateNewPost(params.postId, data);

  return redirect(`/posts/${params.postId}`);
}

export const editPostRoute = {
  loader,
  element: <EditPost />,
  action,
};
