import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlog from "../src/components/CreateBlog";

vi.mock("../src/services/blogs", () => ({
  default: {
    create: vi.fn(() => {
      Promise.resolve("");
    }),
  },
}));

test("updates parent state and calls onSubmit", async () => {
  const updateBlogs = vi.fn();
  const setMessage = vi.fn();
  const user = userEvent.setup();

  render(<CreateBlog updateBlogs={updateBlogs} setMessage={setMessage} />);

  const inputs = screen.getAllByRole("textbox");
  const createButton = screen.getByText("create");

  await user.type(inputs[0], "testing title");
  await user.type(inputs[1], "testing author");
  await user.type(inputs[2], "testing url");

  await user.click(createButton);
  expect(updateBlogs.mock.calls).toHaveLength(1);
});
