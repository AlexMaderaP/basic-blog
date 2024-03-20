import { defer, redirect } from "react-router-dom";
import { getUsers } from "../../api/users";
import { createNewPost } from "../../api/posts";

function loader({ request: { signal } }) {
  return defer({ usersPromise: getUsers({ signal }) });
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
  loader,
};
