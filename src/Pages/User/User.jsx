import React, { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";
import PostItem from "../../Components/PostItem";
import TodoItem from "../../Components/TodoItem";
import CardFallback from "../../Components/CardFallback";
import TodosFallback from "../../Components/TodosFallback";
import { Skeleton } from "../../Components/Skeleton";

export default function User() {
  const { userPromise, postsPromise, todosPromise } = useLoaderData();

  return (
    <>
      <Suspense fallback={<UserInfoFallback />}>
        <Await resolve={userPromise}>
          <UserInfo />
        </Await>
      </Suspense>

      <h3 className="mt-4 mb-2">Posts</h3>
      <Suspense fallback={<CardFallback numCards={4} />}>
        <Await resolve={postsPromise}>
          <Posts />
        </Await>
      </Suspense>

      <h3 className="mt-4 mb-2">Todos</h3>
      <Suspense fallback={<TodosFallback lines={6} />}>
        <Await resolve={todosPromise}>
          <Todos />
        </Await>
      </Suspense>
    </>
  );
}

function UserInfo() {
  const user = useAsyncValue();
  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {user.address.street} {user.address.suite},{" "}
        {user.address.city}, {user.address.zipcode}
      </div>
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

function Todos() {
  const todos = useAsyncValue();
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
}

function UserInfoFallback() {
  return (
    <>
      <h1 className="page-title">
        <Skeleton />
      </h1>
      <div className="page-subtitle">
        <Skeleton short />
      </div>
      <div className="form-row">
        <b>Company:</b> <Skeleton short />
      </div>
      <div className="form-row">
        <b>Website:</b> <Skeleton short />
      </div>
      <div className="form-row">
        <b>Address:</b> <Skeleton short />
      </div>
    </>
  );
}
