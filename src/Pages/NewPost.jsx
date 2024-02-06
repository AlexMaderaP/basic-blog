import React from "react";
import { getUsers } from "../api/users";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { createNewPost } from "../api/posts";
import Option from "../Components/Option";

function NewPost() {
  const error = useActionData();
  const users = useLoaderData();
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" className="form">
        <div className="form-row">
          <div className={`form-group ${error?.title && "error"}`}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            {error?.title && <div className="error-message">{error.title}</div>}
          </div>
          <div className={`form-group ${error?.userId && "error"}`}>
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users.map((user) => (
                <Option key={user.id} user={user} />
              ))}
            </select>
            {error?.userId && (
              <div className="error-message">{error.userId}</div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className={`form-group ${error?.body && "error"}`}>
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
            {error?.body && <div className="error-message">{error.body}</div>}
          </div>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts">
            Cancel
          </a>
          <button className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>
      </Form>
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

  await createNewPost(data);

  return redirect("/");
}

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
};
