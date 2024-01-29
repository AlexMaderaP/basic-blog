import { baseApi } from "./base";

export function getTodos(options) {
  return baseApi
    .get("/todos", options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}

export function getTodosQuery(options, query) {
  return baseApi
    .get(`/todos?q=${query}`, options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}
