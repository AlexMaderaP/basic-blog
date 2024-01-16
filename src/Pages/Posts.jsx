import React from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";

function Posts() {
  const posts = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <div className="card-header">{post.title}</div>
            <div className="card-body">
              <div className="card-preview-text">{post.body}</div>
            </div>
            <div className="card-footer">
              <NavLink className="btn" to={post.id.toString()}>
                View
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
