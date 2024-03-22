import { defer } from "react-router-dom";
import { getComments } from "../../api/comments";
import { getPostById } from "../../api/posts";
import { getUserById } from "../../api/users";

function postLoader({ params, request: { signal } }) {
  const comments = getComments(params.postId, { signal });
  const post = getPostById(params.postId, { signal });

  return defer({
    commentsPromise: comments,
    postPromise: post,
    userPromise: post.then((post) => getUserById(post.userId, { signal })),
  });
}

export default postLoader;
