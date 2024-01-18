import React from "react";
import { useLoaderData } from "react-router-dom";

function Todos() {
  const todos = useLoaderData();

  return (
    <>
      <h1 className="page-title">Todos</h1>
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

function loader({ request: { signal } }) {
  return fetch("http://127.0.0.1:3000/todos", { signal }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(
      `HTTP error status: ${res.status}\n ${res.statusText}`
    );
  });
}

export const todoListRoute = {
  loader,
  element: <Todos />,
};
