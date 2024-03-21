import React, { Suspense, useEffect, useRef } from "react";
import {
  Await,
  Form,
  Link,
  useAsyncValue,
  useLoaderData,
} from "react-router-dom";
import PostItem from "../../Components/PostItem";
import Option from "../../Components/Option";
import CardFallback from "../../Components/CardFallback";

export default function PostList() {
  const {
    postsPromise,
    usersPromise,
    searchParams: { query, userId },
  } = useLoaderData();
  const queryRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
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
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select
              type="search"
              name="userId"
              id="userId"
              defaultValue={userId ? userId : ""}
            >
              <Suspense fallback={<UsersFallback />}>
                <Await resolve={usersPromise}>
                  <Users />
                </Await>
              </Suspense>
            </select>
          </div>
          <button className="btn">Filter</button>
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

function Users() {
  const users = useAsyncValue();
  return (
    <>
      <option value="">Any</option>
      {users.map((user) => (
        <Option key={user.id} user={user} />
      ))}
    </>
  );
}

function UsersFallback() {
  return <option className="skeleton-input">Loading...</option>;
}
