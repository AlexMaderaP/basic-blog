import React from "react";
import { useLoaderData } from "react-router-dom";
import PostItem from "../Components/PostItem";

function User() {
  const { user, posts, todos } = useLoaderData();

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
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "strike-through" : ""}>
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
}

function loader({ params, request: { signal } }) {
  return Promise.all([
    fetch(`http://127.0.0.1:3000/users/${params.userId}`, {
      signal,
    }),
    fetch(`http://127.0.0.1:3000/posts?userId=${params.userId}`, {
      signal,
    }),
    fetch(`http://127.0.0.1:3000/todos?userId=${params.userId}`, {
      signal,
    }),
  ])
    .then(([res1, res2, res3]) =>
      Promise.all([res1.json(), res2.json(), res3.json()])
    )
    .then(([user, posts, todos]) => {
      return { user, posts, todos };
    });
}

export const userRoute = {
  loader,
  element: <User />,
};
