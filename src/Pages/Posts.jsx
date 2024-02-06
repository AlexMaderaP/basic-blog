import React, { useEffect, useRef } from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import PostItem from "../Components/PostItem";
import { getPostsByQuery } from "../api/posts";
import { getUsers } from "../api/users";

function Posts() {
  const {
    posts,
    users,
    searchParams: { query, userId },
  } = useLoaderData();
  const queryRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link to="/posts/new" className="btn btn-outline">
            New
          </Link>
        </div>
      </h1>

      <Form className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select
            type="search"
            name="userId"
            id="userId"
            defaultValue={userId ? userId : ""}
          >
            <option value="">Any</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn">Filter</button>
      </Form>

      <div className="card-grid">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";
  const userId = searchParams.get("userId") || "";
  return {
    searchParams: { query, userId },
    posts: await getPostsByQuery({ signal }, query, userId),
    users: await getUsers({ signal }),
  };
}

export const postListRoute = {
  loader,
  element: <Posts />,
};
