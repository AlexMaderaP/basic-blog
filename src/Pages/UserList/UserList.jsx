import React, { Suspense } from "react";
import { Await, Link, useAsyncValue, useLoaderData } from "react-router-dom";
import CardFallback from "../../Components/CardFallback";

export default function UserList() {
  const { usersPromise } = useLoaderData();

  return (
    <>
      <h1 className="page-title">Users</h1>
      <Suspense fallback={<CardFallback />}>
        <Await resolve={usersPromise}>
          <UsersCards />
        </Await>
      </Suspense>
    </>
  );
}

function UsersCards() {
  const users = useAsyncValue();

  return (
    <div className="card-grid">
      {users.map((user) => (
        <div key={user.id} className="card">
          <div className="card-header">{user.name}</div>
          <div className="card-body">
            <div>{user.company.name}</div>
            <div>{user.website}</div>
            <div>{user.email}</div>
          </div>
          <div className="card-footer">
            <Link className="btn" to={user.id.toString()}>
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
