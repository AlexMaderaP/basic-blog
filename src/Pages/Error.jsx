import React from "react";
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <>
      <h2 className="page-title">An error occurred. Please try again later.</h2>
      {process.env.NODE_ENV !== "production" && (
        <>
          <p>{error?.message}</p>
          <p>{error?.stack || error?.data}</p>
        </>
      )}
    </>
  );
}

export default Error;
