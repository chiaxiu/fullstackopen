const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");

const helper = require("./test_helper");

const Blog = require("../models/blog");
const User = require("../models/user");

describe("when there is initially some blogs saved", () => {
  let token;

  beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();

    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: "root1",
      name: "rootname",
      passwordHash,
    });

    await user.save();

    const loginInfo = await api
      .post("/api/login")
      .send({ username: "root1", password: "sekret" });

    token = loginInfo.body.token;
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("the first blog is about React patterns", async () => {
    const response = await api.get("/api/blogs");
    const contents = response.body.map((e) => e.title);
    assert(contents.includes("React patterns"));
  });

  test("the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    assert(response.body.map((e) => Object.keys(e).includes("id")));
  });

  describe("addition of a new blog", () => {
    test("a valid blog can be added ", async () => {
      const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        userId: "6613ef1a1c761047dd27a332",
        __v: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");

      const contents = response.body.map((r) => r.title);

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);

      assert(contents.includes("Canonical string reduction"));
    });

    test("blog without likes will have the likes equal to 0", async () => {
      const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        userId: "6613ef1a1c761047dd27a332",
        __v: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");

      const contents = response.body.map((r) => r.likes);

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);

      assert(contents.includes(0));
    });

    test("blog without title is not added", async () => {
      const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        userId: "6612b096a86f68b4859c0647",
        __v: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);

      const response = await api.get("/api/blogs");

      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });

    test("blog without url is not added", async () => {
      const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
        userId: "6612a7f8798d08a11a00bfce",
        __v: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);

      const response = await api.get("/api/blogs");

      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });

    test("blog without token is not added", async () => {
      const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        userId: "6612a7f8798d08a11a00bfce",
        __v: 0,
      };

      await api.post("/api/blogs").send(newBlog).expect(401);

      const response = await api.get("/api/blogs");

      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });
  });

  describe("updating of a blog", () => {
    test("succeeds with status code 200 if id is valid", async () => {
      const updateBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 20,
      };

      await api
        .put("/api/blogs/5a422aa71b54a676234d17f8")
        .send(updateBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");

      const contents = response.body.map((r) => r.likes);

      assert.strictEqual(response.body.length, helper.initialBlogs.length);

      assert(contents.includes(20));
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        userId: "6613ef1a1c761047dd27a332",
        __v: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[2];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

      const contents = blogsAtEnd.map((r) => r.title);
      assert(!contents.includes(blogToDelete.title));
    });
  });
});

after(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
