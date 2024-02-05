import { baseApi } from "./base";

export function getPosts(options) {
  return baseApi.get("/posts", options).then((res) => res.data);
}

export function getPostById(postId, options) {
  return baseApi.get(`/posts/${postId}`, options).then((res) => res.data);
}

export function createNewPost(options) {
  return baseApi
    .post("/posts", options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}

export function updateNewPost(postId, options) {
  return baseApi
    .put(`/posts/${postId}`, options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}
