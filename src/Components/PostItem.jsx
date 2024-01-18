import React from "react";
import { NavLink } from "react-router-dom";

function PostItem({ post }) {
  return (
    <div className="card">
      <div className="card-header">{post.title}</div>
      <div className="card-body">
        <div className="card-preview-text">{post.body}</div>
      </div>
      <div className="card-footer">
        <NavLink className="btn" to={`/posts/${post.id.toString()}`}>
          View
        </NavLink>
      </div>
    </div>
  );
}

export default PostItem;
