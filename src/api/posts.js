import { baseApi } from "./base";

export function getPosts(options) {
  return baseApi
    .get("/posts", options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}
