import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getPostById } from "../api/posts";
import { getComments } from "../api/comments";
import { getUserById } from "../api/users";

function Post() {
  const { post, comments, user } = useLoaderData();

  return (
    <>
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" to={`/posts/${post.id}/edit`}>
            Edit
          </Link>
        </div>
      </h1>
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

async function loader({ params, request: { signal } }) {
  const comments = getComments(params.postId, { signal });
  const post = await getPostById(params.postId, { signal });
  const user = getUserById(post.userId, { signal });

  return { comments: await comments, post, user: await user };
}

export const postRoute = {
  loader,
  element: <Post />,
};
