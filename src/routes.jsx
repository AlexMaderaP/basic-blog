import { Navigate } from "react-router-dom";
import NavLayout from "./Layouts/NavLayout";
import { userListRoute } from "./Pages/Users";
import { todoListRoute } from "./Pages/Todos";
import { userRoute } from "./Pages/User";
import Error from "./Pages/Error";
import PostList from "./Pages/PostList/PostList";
import postListLoader from "./Pages/PostList/postListLoader";
import Post from "./Pages/Post/Post";
import postLoader from "./Pages/Post/postLoader";
import NewPost from "./Pages/NewPost/NewPost";
import { newPostRoute } from "./Pages/NewPost/newPostLoader";
import EditPost from "./Pages/EditPost/EditPost";
import { editPostRoute } from "./Pages/EditPost/editPostRoute";

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
                ...userListRoute,
              },
              {
                path: ":userId",
                ...userRoute,
              },
            ],
          },
          {
            path: "/todos",
            ...todoListRoute,
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
