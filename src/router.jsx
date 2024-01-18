import { Navigate, createBrowserRouter } from "react-router-dom";
import { postListRoute } from "./Pages/Posts";
import { userListRoute } from "./Pages/Users";
import { todoListRoute } from "./Pages/Todos";
import { postRoute } from "./Pages/Post";
import { userRoute } from "./Pages/User";
import Error from "./Pages/Error";
import NavLayout from "./Layouts/NavLayout";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
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
            path: ":postId",
            ...postRoute,
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
        path: "/error",
        element: <Error />,
      },
    ],
  },
]);
