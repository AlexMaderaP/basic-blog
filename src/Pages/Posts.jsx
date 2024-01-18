import React from "react";
import { useLoaderData } from "react-router-dom";
import PostItem from "../Components/PostItem";

function Posts() {
  const posts = useLoaderData();

  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

function loader({ request: { signal } }) {
  return fetch("http://127.0.0.1:3000/posts", { signal }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(
      `HTTP error status: ${res.status}\n ${res.statusText}`
    );
  });
}

export const postListRoute = {
  loader,
  element: <Posts />,
};
