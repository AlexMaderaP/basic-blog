import React from "react";

function TodoItem({ title, completed }) {
  return <li className={completed ? "strike-through" : ""}>{title}</li>;
}

export default TodoItem;
