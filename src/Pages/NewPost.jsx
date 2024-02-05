import React from "react";
import { getUsers } from "../api/users";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import axios from "axios";
import { baseApi } from "../api/base";
import { createNewPost } from "../api/posts";

function NewPost() {
  const errorMessage = useActionData();
  const users = useLoaderData();

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" className="form">
        <div className="error-message">{errorMessage}</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
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
            <textarea name="body" id="body"></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts">
            Cancel
          </a>
          <button className="btn">Save</button>
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
  if (title === "" || body === "") {
    return "Please fill the details";
  }

  const data = {
    title,
    userId,
    body,
  };

  const post = await createNewPost(data);

  return redirect("/");
}

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
};
