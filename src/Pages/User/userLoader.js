import { defer } from "react-router-dom";
import { getPosts } from "../../api/posts";
import { getTodos } from "../../api/todos";
import { getUserById } from "../../api/users";

export default function userLoader({
  request: { signal },
  params: { userId },
}) {
  const userPromise = getUserById(userId, { signal });
  const postsPromise = getPosts({ signal, params: { userId } });
  const todosPromise = getTodos({ signal, params: { userId } });

  return defer({ userPromise, postsPromise, todosPromise });
}
