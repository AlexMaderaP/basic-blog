import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

function NavLayout() {
  const { state } = useNavigation();

  return (
    <>
      <Navbar />
      <ScrollRestoration />
      {state === "loading" && <div className="loading-spinner"></div>}
      <div className={`container ${state === "loading" && "loading"}`}>
        <Outlet />
      </div>
    </>
  );
}

export default NavLayout;
