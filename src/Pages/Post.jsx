import React from "react";
import { Link, useLoaderData } from "react-router-dom";

function Post() {
  const post = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">{post.title}</h1>
      <span>
        By: <Link>{post.userId}</Link>
      </span>
      <div>{post.body}</div>
    </div>
  );
}

export default Post;
