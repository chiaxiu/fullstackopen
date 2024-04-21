import { render, screen } from "@testing-library/react";
import Blog from "../src/components/Blog";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock("axios");

const mockBlog = {
  title: "this is a test title",
  author: "this is a test author",
  url: "this is a test url",
  likes: 999,
  id: "1a2b3c4d5e",
  user: {
    id: "e5d4c3b2a1",
    name: "this is a test name",
    username: "this is a test username",
  },
};

const mockUser = {
  token: "testToken",
  username: "this is a test username",
  name: "this is a test name",
};

test("renders content", () => {
  render(<Blog blog={mockBlog} />);
  expect(screen.getByTestId("blog-title")).toHaveTextContent(
    "this is a test title"
  );
  expect(screen.queryByTestId("blog-contents")).toBeNull();
});

test("clicking the view button calls display the blog contents", async () => {
  render(<Blog blog={mockBlog} user={mockUser} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  expect(screen.getByTestId("blog-contents"))
    .toHaveTextContent("this is a test url")
    .toHaveTextContent("likes 999")
    .toHaveTextContent("this is a test author");
});

test("clicking the like button twice calls event handler twice", async () => {
  axios.put.mockResolvedValue({ data: mockBlog });
  Object.defineProperty(window, "location", {
    configurable: true,
    value: {
      reload: vi.fn(),
    },
  });

  render(<Blog blog={mockBlog} user={mockUser} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByTestId("like-button");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(axios.put).toHaveBeenCalledTimes(2);
});
