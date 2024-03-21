import { defer } from "react-router-dom";
import { getPosts } from "../../api/posts";
import { getUsers } from "../../api/users";

function postListLoader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";
  const userId = searchParams.get("userId") || "";
  const filterParams = { q: query };
  if (userId !== "") filterParams.userId = userId;

  const posts = getPosts({ signal, params: filterParams });
  const users = getUsers({ signal });

  return defer({
    searchParams: { query, userId },
    postsPromise: posts,
    usersPromise: users,
  });
}

export default postListLoader;
