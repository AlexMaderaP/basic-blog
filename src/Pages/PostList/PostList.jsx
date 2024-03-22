import React, { Suspense, useEffect, useRef } from "react";
import {
  Await,
  Form,
  Link,
  useAsyncValue,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import PostItem from "../../Components/PostItem";
import Option from "../../Components/Option";
import FormGroup from "../../Components/FormGroup";
import CardFallback from "../../Components/CardFallback";

export default function PostList() {
  const {
    postsPromise,
    usersPromise,
    searchParams: { query, userId },
  } = useLoaderData();
  const queryRef = useRef();
  const { state } = useNavigation();
  const isLoading = state === "loading";

  useEffect(() => {
    queryRef.current.value = query || "";
  }, [query]);

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link to="new" className="btn btn-outline">
            New
          </Link>
        </div>
      </h1>

      <Form className="form mb-4">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </FormGroup>
        </div>
        <div className="form-row">
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <Suspense fallback={<UsersFallback />}>
              <Await resolve={usersPromise}>
                <Users userId={userId} />
              </Await>
            </Suspense>
          </FormGroup>
          <button className="btn" disabled={isLoading}>
            {isLoading ? "Filtering" : "Filter"}
          </button>
        </div>
      </Form>

      <Suspense fallback={<CardFallback />}>
        <Await resolve={postsPromise}>
          <Posts />
        </Await>
      </Suspense>
    </>
  );
}

function Posts() {
  const posts = useAsyncValue();

  return (
    <div className="card-grid">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

function Users({ userId }) {
  const users = useAsyncValue();
  return (
    <select type="search" name="userId" id="userId" defaultValue={userId || ""}>
      <option value="">Any</option>
      {users.map((user) => (
        <Option key={user.id} user={user} />
      ))}
    </select>
  );
}

function UsersFallback() {
  return (
    <select type="search" name="userId" id="userId" disabled>
      <option value="">Loading...</option>
    </select>
  );
}
