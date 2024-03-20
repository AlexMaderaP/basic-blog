import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

function NavLayout() {
  const { state } = useNavigation();

  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <div className={`container`}>
        <Outlet />
      </div>
    </>
  );
}

export default NavLayout;
