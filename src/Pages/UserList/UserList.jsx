import React, { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import CardFallback from "../../Components/CardFallback";

export default function UserList() {
  const { usersPromise } = useLoaderData();

  return (
    <>
      <h1 className="page-title">Users</h1>
      <Suspense fallback={<CardFallback />}>
        <Await resolve={usersPromise}>
          {(users) => (
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
          )}
        </Await>
      </Suspense>
    </>
  );
}

// function UserListFallback() {
//   return (
//     <div className="card-grid">
//       {Array.from({ length: 6 }, (_, idx) => idx).map((idx) => (
//         <div key={idx} className="card">
//           <div className="card-header">
//             <div className="skeleton"></div>
//           </div>
//           <div className="card-body">
//             <div className="skeleton"></div>
//             <div className="skeleton"></div>
//             <div className="skeleton"></div>
//           </div>
//           <div className="card-footer">
//             <div className="skeleton skeleton-btn"></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
