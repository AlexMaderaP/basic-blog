import React, { Suspense } from "react";
import {
  Await,
  useActionData,
  useAsyncValue,
  useLoaderData,
} from "react-router-dom";
import PostForm from "../../Components/PostForm";
import PostFormFallback from "../../Components/PostFormFallback";

export default function EditPost() {
  const { postPromise, usersPromise } = useLoaderData();
  const error = useActionData();

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <Suspense fallback={<PostFormFallback />}>
        <Await
          resolve={Promise.all([postPromise, usersPromise]).then(
            (value) => value
          )}
        >
          <PostFormAsync error={error} />
        </Await>
      </Suspense>
    </>
  );
}

function PostFormAsync({ error }) {
  const [post, users] = useAsyncValue();
  return <PostForm error={error} post={post} users={users} />;
}
