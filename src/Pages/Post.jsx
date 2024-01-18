import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getPostById } from "../api/posts";

function Post() {
  const { post, comments, user } = useLoaderData();

  return (
    <>
      <h1 className="page-title">{post.title}</h1>
      <span>
        By: <Link to={`/users/${post.userId}`}>{user.name}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => (
          <div key={comment.id} className="card">
            <div className="card-body">
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function loader({ params, request: { signal } }) {
  return getPostById(params.postId, { signal });
}

export const postRoute = {
  loader,
  element: <Post />,
};
