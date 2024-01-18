import { baseApi } from "./base";

export function getUsers(options) {
  return baseApi
    .get("/users", options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}

export function getUserById(userId, options) {
  return baseApi(`/users/${userId}`, options).then((res) => res.data);
}
