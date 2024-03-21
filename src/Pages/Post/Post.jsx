import React, { Suspense } from "react";
import { Await, Link, useAsyncValue, useLoaderData } from "react-router-dom";
import { getUserById } from "../../api/users";

export default function Post() {
  const { postPromise, commentsPromise } = useLoaderData();

  return (
    <>
      <Suspense fallback={<PostFallback />}>
        <Await resolve={postPromise}>
          <PostInfo />
        </Await>
      </Suspense>
      <h3 className="mt-4 mb-2">Comments</h3>
      <Suspense fallback={<CommentsFallback />}>
        <Await resolve={commentsPromise}>
          <CommentsList />
        </Await>
      </Suspense>
    </>
  );
}

function PostInfo() {
  const post = useAsyncValue();

  return (
    <>
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" to={`edit`}>
            Edit
          </Link>
        </div>
      </h1>
      <span>
        By:{" "}
        <Link to={`/users/${post.userId}`}>
          <Suspense fallback="Loading user...">
            <Await resolve={getUserById(post.userId)}>
              {(user) => <>{user.name}</>}
            </Await>
          </Suspense>
        </Link>
      </span>
      <div>{post.body}</div>
    </>
  );
}

function CommentsList() {
  const comments = useAsyncValue();
  return (
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
  );
}

function PostFallback() {
  return (
    <>
      <h1 className="page-title">
        <div className="skeleton"></div>
        <div className="skeleton-btn"></div>
      </h1>
      <div className="form-row">
        By: <div className="skeleton"></div>
      </div>
      <div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
      </div>
    </>
  );
}

function CommentsFallback() {
  return (
    <div className="card-stack">
      <div className="card">
        <div className="card-body">
          <div className="text-sm mb-1">
            <div className="skeleton"></div>
          </div>
          <div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
