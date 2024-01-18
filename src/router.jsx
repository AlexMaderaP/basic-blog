import {
  Navigate,
  Outlet,
  createBrowserRouter,
  redirect,
  useNavigation,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Posts from "./Pages/Posts";
import Users from "./Pages/Users";
import Todos from "./Pages/Todos";
import Post from "./Pages/Post";
import User from "./Pages/User";
import Error from "./Pages/Error";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    errorElement: <Error />,
    children: [
      { path: "*", element: <Navigate to="posts" replace /> },
      {
        path: "/posts",
        children: [
          {
            index: true,
            element: <Posts />,
            loader: ({ request: { signal } }) => {
              return fetch("http://127.0.0.1:3000/posts", { signal }).then(
                (res) => {
                  if (res.ok) return res.json();
                  return Promise.reject(
                    `HTTP error status: ${res.status}\n ${res.statusText}`
                  );
                }
              );
            },
          },
          {
            path: ":postId",
            loader: ({ params, request: { signal } }) => {
              return Promise.all([
                fetch(`http://127.0.0.1:3000/posts/${params.postId}`, {
                  signal,
                }),
                fetch(`http://127.0.0.1:3000/posts/${params.postId}/comments`, {
                  signal,
                }),
              ])
                .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
                .then(([post, comments]) => {
                  return fetch(`http://127.0.0.1:3000/users/${post.userId}`, {
                    signal,
                  })
                    .then((res) => res.json())
                    .then((user) => {
                      return { post, comments, user };
                    });
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
              return fetch("http://127.0.0.1:3000/users", { signal }).then(
                (res) => {
                  if (res.ok) return res.json();

                  return Promise.reject(
                    `HTTP error status: ${res.status}\n ${res.statusText}`
                  );
                }
              );
            },
          },
          {
            path: ":userId",
            element: <User />,
            loader: ({ params, request: { signal } }) => {
              return fetch(`http://127.0.0.1:3000/users/${params.userId}`, {
                signal,
              }).then((res) => {
                if (res.ok) return res.json();

                return Promise.reject(
                  `HTTP error status: ${res.status}\n ${res.statusText}`
                );
              });
            },
          },
        ],
      },
      {
        path: "/todos",
        element: <Todos />,
        loader: ({ request: { signal } }) => {
          return fetch("http://127.0.0.1:3000/todos", { signal }).then(
            (res) => {
              if (res.ok) return res.json();

              return Promise.reject(
                `HTTP error status: ${res.status}\n ${res.statusText}`
              );
            }
          );
        },
      },
      {
        path: "/error",
        element: <Error />,
      },
    ],
  },
]);

function NavLayout() {
  const { state } = useNavigation();

  return (
    <>
      <Navbar />
      {state === "loading" && <div className="loading-spinner"></div>}
      <div className={`container ${state === "loading" && "loading"}`}>
        <Outlet />
      </div>
    </>
  );
}
