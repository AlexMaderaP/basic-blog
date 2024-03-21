import React, { Suspense } from "react";
import { Await, useActionData, useLoaderData } from "react-router-dom";
import PostForm from "../../Components/PostForm";
import PostFormFallback from "../../Components/PostFormFallback";

export default function NewPost() {
  const error = useActionData();
  const { usersPromise } = useLoaderData();

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Suspense fallback={<PostFormFallback />}>
        <Await resolve={usersPromise}>
          {(users) => <PostForm error={error} users={users} />}
        </Await>
      </Suspense>
    </>
  );
}
