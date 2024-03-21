import React, { Suspense, useEffect, useRef } from "react";
import { Await, Form, useAsyncValue, useLoaderData } from "react-router-dom";
import TodoItem from "../../Components/TodoItem";
import TodosFallback from "../../Components/TodosFallback";

export default function Todos() {
  const {
    todosPromise,
    searchParams: { query },
  } = useLoaderData();
  const queryRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

  return (
    <>
      <Form className="Form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Search</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <button className="btn">Search</button>
        </div>
      </Form>

      <h1 className="page-title">Todos</h1>
      <Suspense fallback={<TodosFallback lines={10} />}>
        <Await resolve={todosPromise}>
          <TodosList />
        </Await>
      </Suspense>
    </>
  );
}

function TodosList() {
  const todos = useAsyncValue();

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
}
