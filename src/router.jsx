import { Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Posts from "./Pages/Posts";
import Users from "./Pages/Users";
import Todos from "./Pages/Todos";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { path: "*", element: <Posts /> },
      {
        path: "/posts",
        element: <Posts />,
        loader: ({ request: { signal } }) => {
          return fetch("http://127.0.0.1:3000/posts", { signal });
        },
      },
      { path: "/users", element: <Users /> },
      { path: "/todos", element: <Todos /> },
    ],
  },
]);

function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
