import { Navigate } from "react-router-dom";
import { lazy } from "react";
import NavLayout from "./Layouts/NavLayout";
import Error from "./Pages/Error";
import postListLoader from "./Pages/PostList/postListLoader";
import postLoader from "./Pages/Post/postLoader";
import usersListLoader from "./Pages/UserList/userListLoader";
import userLoader from "./Pages/User/userLoader";
import todosLoader from "./Pages/Todos/todosLoader";
import { newPostRoute } from "./Pages/NewPost/newPostLoader";
import { editPostRoute } from "./Pages/EditPost/editPostRoute";

const PostList = lazy(() => import("./Pages/PostList/PostList"));
const Post = lazy(() => import("./Pages/Post/Post"));
const NewPost = lazy(() => import("./Pages/NewPost/NewPost"));
const EditPost = lazy(() => import("./Pages/EditPost/EditPost"));
const UserList = lazy(() => import("./Pages/UserList/UserList"));
const User = lazy(() => import("./Pages/User/User"));
const Todos = lazy(() => import("./Pages/Todos/Todos"));

export const routes = [
  {
    element: <NavLayout />,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="posts" replace /> },
          {
            path: "/posts",
            children: [
              {
                index: true,
                element: <PostList />,
                loader: postListLoader,
              },
              {
                path: "new",
                element: <NewPost />,
                ...newPostRoute,
              },
              {
                path: ":postId",
                children: [
                  { index: true, element: <Post />, loader: postLoader },
                  { path: "edit", element: <EditPost />, ...editPostRoute },
                ],
              },
            ],
          },
          {
            path: "/users",
            children: [
              {
                index: true,
                element: <UserList />,
                loader: usersListLoader,
              },
              {
                path: ":userId",
                element: <User />,
                loader: userLoader,
              },
            ],
          },
          {
            path: "/todos",
            element: <Todos />,
            loader: todosLoader,
          },
          {
            path: "*",
            element: <h1>404 - Page not found</h1>,
          },
        ],
      },
    ],
  },
];
