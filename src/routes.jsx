import { Navigate } from "react-router-dom";
import { postListRoute } from "./Pages/Posts";
import { userListRoute } from "./Pages/Users";
import { todoListRoute } from "./Pages/Todos";
import { postRoute } from "./Pages/Post";
import { newPostRoute } from "./Pages/NewPost";
import { editPostRoute } from "./Pages/EditPost";
import { userRoute } from "./Pages/User";
import Error from "./Pages/Error";
import NavLayout from "./Layouts/NavLayout";

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
                ...postListRoute,
              },
              {
                path: "new",
                ...newPostRoute,
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