import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Posts from "./Pages/Posts";
import Users from "./Pages/Users";
import Todos from "./Pages/Todos";
import Post from "./Pages/Post";
import User from "./Pages/User";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { path: "*", element: <Posts /> },
      {
        path: "/posts",
        children: [
          {
            index: true,
            element: <Posts />,
            loader: ({ request: { signal } }) => {
              return fetch("http://127.0.0.1:3000/posts", { signal });
            },
          },
          {
            path: ":postId",
            loader: ({ params, request: { signal } }) => {
              return fetch(`http://127.0.0.1:3000/posts/${params.postId}`, {
                signal,
              });
            },
            element: <Post />,
          },
        ],
      },
      {
        path: "/users",
        children: [
          {
            index: true,
            element: <Users />,
            loader: ({ request: { signal } }) => {
              return fetch("http://127.0.0.1:3000/users", { signal });
            },
          },
          {
            path: ":userId",
            element: <User />,
            loader: ({ params, request: { signal } }) => {
              return fetch(`http://127.0.0.1:3000/users/${params.userId}`, {
                signal,
              });
            },
          },
        ],
      },
      {
        path: "/todos",
        element: <Todos />,
        loader: ({ request: { signal } }) => {
          return fetch("http://127.0.0.1:3000/todos", { signal });
        },
      },
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
