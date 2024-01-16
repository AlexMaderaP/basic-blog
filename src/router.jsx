import { Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [{ path: "*", element: <h1>Basic Blog app</h1> }],
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
