import React from "react";
import Navbar from "../Components/Navbar";
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  return (
    <>
      <Navbar />
      {process.env.NODE_ENV === "development" && (
        <>
          <h1 className="page-title">Error:</h1>
          <p>{error?.data || error?.toString()}</p>
          <p>{error?.error?.message}</p>
          <p>{error?.response?.stack}</p>
        </>
      )}
      {process.env.NODE_ENV === "production" && (
        <>
          <h2 className="page-title">
            An error occurred. Please try again later.
          </h2>
        </>
      )}
    </>
  );
}

export default Error;
