import { defer } from "react-router-dom";
import { getUsers } from "../../api/users";

export default function loader({ request: { signal } }) {
  return defer({ usersPromise: getUsers({ signal }) });
}
