import React from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
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

export default Posts;
