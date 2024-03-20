import { Navigate } from "react-router-dom";
import PostList from "./Pages/PostList/PostList";
import { userListRoute } from "./Pages/Users";
import { todoListRoute } from "./Pages/Todos";
import { postRoute } from "./Pages/Post";
import { newPostRoute } from "./Pages/NewPost/NewPost";
import { editPostRoute } from "./Pages/EditPost";
import { userRoute } from "./Pages/User";
import Error from "./Pages/Error";
import NavLayout from "./Layouts/NavLayout";
import { newPostLoader } from "./Pages/NewPost/newPostLoader";
import postListLoader from "./Pages/PostList/postListLoader";

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
                ...newPostRoute,
                loader: newPostLoader,
              },
              {
                path: ":postId",
                children: [
                  { index: true, ...postRoute },
                  { path: "edit", ...editPostRoute },
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
