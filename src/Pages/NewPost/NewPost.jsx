import React from "react";
import { useActionData, useLoaderData } from "react-router-dom";
import PostForm from "../../Components/PostForm";

export default function NewPost() {
  const error = useActionData();
  const { usersPromise } = useLoaderData();

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm error={error} usersPromise={usersPromise} />
    </>
  );
}
