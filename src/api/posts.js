import { baseApi } from "./base";

export function getPosts(options) {
  return baseApi
    .get("/posts", options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}

export function getPostById(postId, options) {
  return Promise.all([
    baseApi.get(`/posts/${postId}`, options),
    baseApi.get(`/posts/${postId}/comments`, options),
  ]).then(([res1, res2]) => {
    const post = res1.data;
    const comments = res2.data;
    return baseApi.get(`/users/${post.userId}`, options).then((res) => {
      const user = res.data;
      return { post, comments, user };
    });
  });
}
