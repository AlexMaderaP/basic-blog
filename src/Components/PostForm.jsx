import React from "react";
import { Form } from "react-router-dom";
import Option from "./Option";
import FormGroup from "./FormGroup";

function PostForm({ error, post, users, isSubmitting }) {
  return (
    <Form method="post" className="form">
      <div className="form-row">
        <FormGroup errorMessage={error?.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post?.title}
          />
        </FormGroup>
        <FormGroup errorMessage={error?.userId}>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId">
            {users.map((user) => (
              <Option key={user.id} user={user} />
            ))}
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={error?.body}>
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" defaultValue={post?.body}></textarea>
        </FormGroup>
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
  );
}

export default PostForm;
