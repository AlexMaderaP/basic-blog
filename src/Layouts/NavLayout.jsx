import React, { Suspense } from "react";
import Navbar from "../Components/Navbar";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

function NavLayout() {
  const { state } = useNavigation();

  return (
    <>
      <Navbar />
      <ScrollRestoration />

      <Suspense fallback={<div className="loading-spinner" />}>
        <div className={`container`}>
          <Outlet />
        </div>
      </Suspense>
    </>
  );
}

export default NavLayout;
