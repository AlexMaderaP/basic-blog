import React from "react";
import { useLoaderData } from "react-router-dom";
import PostItem from "../Components/PostItem";
import axios from "axios";
import { getPosts } from "../api/posts";

function Posts() {
  const posts = useLoaderData();

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <a href="/posts/new" className="btn btn-outline">
            New
          </a>
        </div>
      </h1>

      <div className="card-grid">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

function loader({ request: { signal } }) {
  return getPosts({ signal });
}

export const postListRoute = {
  loader,
  element: <Posts />,
};
