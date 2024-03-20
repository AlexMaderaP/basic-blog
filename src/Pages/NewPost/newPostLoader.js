import { defer } from "react-router-dom";
import { getUsers } from "../../api/users";

export function newPostLoader({ request: { signal } }) {
  return defer({ usersPromise: getUsers({ signal }) });
}
