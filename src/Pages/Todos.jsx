import React from "react";
import { useLoaderData } from "react-router-dom";
import { getTodos } from "../api/todos";
import TodoItem from "../Components/TodoItem";

function Todos() {
  const todos = useLoaderData();

  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}

function loader({ request: { signal } }) {
  return getTodos({ signal });
}

export const todoListRoute = {
  loader,
  element: <Todos />,
};
