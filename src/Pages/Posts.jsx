import React, { useEffect, useRef } from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import PostItem from "../Components/PostItem";
import { getPosts } from "../api/posts";
import { getUsers } from "../api/users";
import Option from "../Components/Option";

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
          <Link to="new" className="btn btn-outline">
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
                <Option key={user.id} user={user} />
              ))}
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
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
  const filterParams = { q: query };
  if (userId !== "") filterParams.userId = userId;

  const posts = getPosts({ signal, params: filterParams });
  const users = getUsers({ signal });

  return {
    searchParams: { query, userId },
    posts: await posts,
    users: await users,
  };
}

export const postListRoute = {
  loader,
  element: <Posts />,
};
