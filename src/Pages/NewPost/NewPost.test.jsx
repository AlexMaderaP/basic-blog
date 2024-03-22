import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { routes } from "../../routes";
import { render, screen, waitFor } from "@testing-library/react";
import { mockServer } from "../../../test-setup/mockServer";
import { HttpResponse, http } from "msw";

describe("New Post component", () => {
  it("Should create a new Post", async () => {
    const users = [
      { id: 1, name: "Alex" },
      { id: 2, name: "Leane" },
    ];

    const user = userEvent.setup();

    const newPostApiHandler = vi.fn(async ({ request }) => {
      const bodyJSON = await request.json();
      const title = bodyJSON.title;
      const body = bodyJSON.body;
      const userId = bodyJSON.userId;
      const id = 4;

      const newPost = {
        id,
        title,
        body,
        userId,
      };

      mockServer.use(
        http.get(`${import.meta.env.VITE_API_URL}posts/${id}`, () => {
          return HttpResponse.json(newPost);
        })
      );

      mockServer.use(
        http.get(`${import.meta.env.VITE_API_URL}posts/${id}/comments`, () => {
          return HttpResponse.json([]);
        })
      );

      mockServer.use(
        http.get(`${import.meta.env.VITE_API_URL}users/${userId}`, () => {
          const user = users.filter((user) => user.id == userId);
          return HttpResponse.json(...user);
        })
      );

      return HttpResponse.json(newPost);
    });

    mockServer.use(
      http.get(`${import.meta.env.VITE_API_URL}users`, () => {
        return HttpResponse.json(users);
      })
    );

    mockServer.use(
      http.post(`${import.meta.env.VITE_API_URL}posts`, newPostApiHandler)
    );

    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts", "/posts/new"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    const titleInput = await screen.findByLabelText("Title");
    const selectInput = screen.getByLabelText("Author");
    const bodyInput = screen.getByLabelText("Body");

    await user.type(titleInput, "New Post");
    await user.selectOptions(selectInput, "Alex");
    await user.type(bodyInput, "Body post");

    await user.click(screen.getByText("Save"));

    expect(newPostApiHandler).toHaveBeenCalledOnce();

    await waitFor(
      () => {
        expect(screen.getByText("New Post")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    expect(await screen.getByText("Alex")).toBeInTheDocument();
    expect(await screen.findByText("Body post")).toBeInTheDocument();
  });
});
