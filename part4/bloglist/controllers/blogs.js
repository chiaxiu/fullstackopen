const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const requestUser = request.user;
  const user = await User.findById(requestUser.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const { comment } = request.body;
  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  blog.comments.push(comment);
  const updatedBlog = await blog.save();
  response.json(updatedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  };

  if (body.likes !== undefined) {
    blog.likes = body.likes;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(updatedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;

    if (user.id.toString() !== blog.user.toString()) {
      return response.status(401).json({ error: "token invalid" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
);

module.exports = blogsRouter;
