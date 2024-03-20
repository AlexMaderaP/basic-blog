import { defer, redirect } from "react-router-dom";
import { getPostById, updatePost } from "../../api/posts";
import { getUsers } from "../../api/users";

async function loader({ params, request: { signal } }) {
  const post = getPostById(params.postId, { signal });
  const users = getUsers({ signal });

  return defer({ postPromise: post, usersPromise: users });
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

  await updatePost(params.postId, data, { signal: request.signal });

  return redirect(`/posts/${params.postId}`);
}

export const editPostRoute = {
  loader,
  action,
};
