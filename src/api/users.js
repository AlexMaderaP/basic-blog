import { baseApi } from "./base";

export function getUsers(options) {
  return baseApi
    .get("/users", options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}
