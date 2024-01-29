import React from "react";
import { Form, useLoaderData } from "react-router-dom";
import { getTodos, getTodosQuery } from "../api/todos";
import TodoItem from "../Components/TodoItem";

function Todos() {
  const {
    todos,
    searchParams: { query },
  } = useLoaderData();

  return (
    <>
      <Form className="Form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Search</label>
            <input type="search" name="query" id="query" defaultValue={query} />
          </div>
          <button className="btn">Search</button>
        </div>
      </Form>

      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";
  return {
    searchParams: { query },
    todos: await getTodosQuery({ signal }, query),
  };
}

export const todoListRoute = {
  loader,
  element: <Todos />,
};
