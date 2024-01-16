import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Posts from "./Pages/Posts";
import Users from "./Pages/Users";
import Todos from "./Pages/Todos";
import Post from "./Pages/Post";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      //   { path: "*", element: <Posts /> },
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
