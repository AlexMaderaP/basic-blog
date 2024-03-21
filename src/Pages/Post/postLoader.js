import { defer } from "react-router-dom";
import { getComments } from "../../api/comments";
import { getPostById } from "../../api/posts";

function postLoader({ params, request: { signal } }) {
  const comments = getComments(params.postId, { signal });
  const post = getPostById(params.postId, { signal });

  return defer({
    commentsPromise: comments,
    postPromise: post,
  });
}

export default postLoader;
