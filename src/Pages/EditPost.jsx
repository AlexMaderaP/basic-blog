import React from "react";
import { getPostById, updateNewPost } from "../api/posts";
import { getUsers } from "../api/users";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Option from "../Components/Option";

function EditPost() {
  const { post, users } = useLoaderData();
  const error = useActionData();
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <Form method="post" className="form">
        <div className="form-row">
          <div className={`form-group ${error?.title && "error"}`}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={post.title}
            />
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
            <textarea name="body" id="body" defaultValue={post.body}></textarea>
            {error?.body && <div className="error-message">{error.body}</div>}
          </div>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts">
            Cancel
          </a>
          <button disabled={isSubmitting} className="btn">
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>
      </Form>
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
