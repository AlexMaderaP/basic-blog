import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { routes } from "../../routes";
import { mockServer } from "../../../test-setup/mockServer";
import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { posts } from "../../../test-setup/postsMock";
import userEvent from "@testing-library/user-event";

describe("Post Lists component", () => {
  it("Should get a list of posts", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes);

    // make the call GET /users
    mockServer.use(
      http.get(`${import.meta.env.VITE_API_URL}users`, () => {
        return HttpResponse.json([
          { id: 1, name: "Leane Graham" },
          { id: 2, name: "Alex" },
        ]);
      })
    );

    // make the call GET /posts
    mockServer.use(
      http.get(`${import.meta.env.VITE_API_URL}posts`, ({ request }) => {
        const searchParams = new URL(request.url).searchParams;
        const title = searchParams.get("q") || "";
        const id = parseInt(searchParams.get("userId"));

        return HttpResponse.json(
          posts.filter(
            (post) =>
              post.title.includes(title) && (isNaN(id) || post.userId === id)
          )
        );
      })
    );
    render(<RouterProvider router={router} />);

    //Test that every test is provided
    expect(await screen.findByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
    expect(screen.getByText("Third Post")).toBeInTheDocument();

    //Test with query filter
    await user.type(screen.getByRole("searchbox", { name: "Query" }), "First");
    await user.click(screen.getByText("Filter"));

    expect(await screen.findByText("First Post")).toBeInTheDocument();
    expect(screen.queryByText("Second Post")).not.toBeInTheDocument();
    expect(screen.queryByText("Third Post")).not.toBeInTheDocument();

    //Test with Author filter
    await user.clear(screen.getByRole("searchbox", { name: "Query" }));
    await user.selectOptions(screen.getByRole("combobox"), ["1"]);
    await user.click(screen.getByText("Filter"));

    expect(await screen.findByText("First Post")).toBeInTheDocument();
    expect(screen.queryByText("Second Post")).not.toBeInTheDocument();
    expect(screen.queryByText("Third Post")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("1");
  });
});
