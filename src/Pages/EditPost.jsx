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

function EditPost() {
  const { post, users } = useLoaderData();
  const errorMessage = useActionData();
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <Form method="post" className="form">
        <div className="error-message">{errorMessage}</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={post.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body" defaultValue={post.body}></textarea>
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
  if (title === "" || body === "") {
    return "Please fill the details";
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
