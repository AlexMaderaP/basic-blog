import { Navigate } from "react-router-dom";
import NavLayout from "./Layouts/NavLayout";
import Error from "./Pages/Error";
import PostList from "./Pages/PostList/PostList";
import postListLoader from "./Pages/PostList/postListLoader";
import Post from "./Pages/Post/Post";
import postLoader from "./Pages/Post/postLoader";
import NewPost from "./Pages/NewPost/NewPost";
import { newPostRoute } from "./Pages/NewPost/newPostLoader";
import EditPost from "./Pages/EditPost/EditPost";
import { editPostRoute } from "./Pages/EditPost/editPostRoute";
import UserList from "./Pages/UserList/UserList";
import usersListLoader from "./Pages/UserList/userListLoader";
import User from "./Pages/User/User";
import userLoader from "./Pages/User/userLoader";
import Todos from "./Pages/Todos/Todos";
import todosLoader from "./Pages/Todos/todosLoader";

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
