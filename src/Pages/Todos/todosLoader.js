import { defer } from "react-router-dom";
import { getTodosQuery } from "../../api/todos";

export default function todosLoader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";
  return defer({
    searchParams: { query },
    todosPromise: getTodosQuery({ signal }, query),
  });
}
