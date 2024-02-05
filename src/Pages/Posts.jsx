import React, { useEffect, useRef } from "react";
import { Form, useLoaderData } from "react-router-dom";
import PostItem from "../Components/PostItem";
import { getPostsByQuery } from "../api/posts";

function Posts() {
  const {
    posts,
    searchParams: { query },
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
          <a href="/posts/new" className="btn btn-outline">
            New
          </a>
        </div>
      </h1>

      <Form class="form mb-4">
        <div class="form-row">
          <div class="form-group">
            <label for="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <button class="btn">Filter</button>
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
  return {
    searchParams: { query },
    posts: await getPostsByQuery({ signal }, query),
  };
}

export const postListRoute = {
  loader,
  element: <Posts />,
};
