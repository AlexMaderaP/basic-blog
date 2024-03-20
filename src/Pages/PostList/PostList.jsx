import React, { Suspense, useEffect, useRef } from "react";
import { Await, Form, Link, useLoaderData } from "react-router-dom";
import PostItem from "../../Components/PostItem";
import Option from "../../Components/Option";

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
                  {(users) => <Users users={users} />}
                </Await>
              </Suspense>
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>

      <Suspense fallback={<PostListFallback />}>
        <Await resolve={postsPromise}>
          {(posts) => <Posts posts={posts} />}
        </Await>
      </Suspense>
    </>
  );
}

function Posts({ posts }) {
  return (
    <div className="card-grid">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

function Users({ users }) {
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

function PostListFallback() {
  return (
    <div className="card-grid">
      {Array.from({ length: 6 }, (_, idx) => idx).map((idx) => (
        <div key={idx} className="card">
          <div className="card-header">
            <div className="skeleton"></div>
          </div>
          <div className="card-body">
            <div className="card-preview-text ">
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
            </div>
          </div>
          <div className="card-footer">
            <div className="skeleton skeleton-btn"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
