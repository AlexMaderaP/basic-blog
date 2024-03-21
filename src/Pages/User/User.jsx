import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import PostItem from "../../Components/PostItem";
import TodoItem from "../../Components/TodoItem";
import CardFallback from "../../Components/CardFallback";
import TodosFallback from "../../Components/TodosFallback";

export default function User() {
  const { userPromise, postsPromise, todosPromise } = useLoaderData();

  return (
    <>
      <Suspense fallback={<UserInfoFallback />}>
        <Await resolve={userPromise}>
          {(user) => <UserInfo user={user} />}
        </Await>
      </Suspense>

      <h3 className="mt-4 mb-2">Posts</h3>
      <Suspense fallback={<CardFallback numCards={4} />}>
        <Await resolve={postsPromise}>
          {(posts) => <Posts posts={posts} />}
        </Await>
      </Suspense>

      <h3 className="mt-4 mb-2">Todos</h3>
      <Suspense fallback={<TodosFallback lines={6} />}>
        <Await resolve={todosPromise}>
          {(todos) => <Todos todos={todos} />}
        </Await>
      </Suspense>
    </>
  );
}

function UserInfo({ user }) {
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

function Posts({ posts }) {
  return (
    <div className="card-grid">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

function Todos({ todos }) {
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
        <div className="skeleton"></div>
      </h1>
      <div className="page-subtitle">
        <div className="skeleton"></div>
      </div>
      <div className="form-row">
        <b>Company:</b> <div className="skeleton"></div>
      </div>
      <div className="form-row">
        <b>Website:</b> <div className="skeleton"></div>
      </div>
      <div className="form-row">
        <b>Address:</b> <div className="skeleton"></div>
      </div>
    </>
  );
}
