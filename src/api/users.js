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

// export function getUserById(userId, options) {
//   return Promise.all([
//     baseApi(`/users/${userId}`, options),
//     baseApi(`/posts?userId=${userId}`, options),
//     baseApi(`/todos?userId=${userId}`, options),
//   ]).then(([res1, res2, res3]) => {
//     const user = res1.data;
//     const posts = res2.data;
//     const todos = res3.data;
//     return { user, posts, todos };
//   });
// }
