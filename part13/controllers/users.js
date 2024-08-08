const router = require('express').Router();

const { Op } = require('sequelize');
const { User, Blog, Readinglist } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  });
  res.json(users);
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog
    }
  });

  if (user) {
    const blogIds = user.blogs.map((blog) => blog.id);
    const blogs = await Blog.findAll({
      where: { id: { [Op.in]: blogIds } }
    });

    const { read } = req.query;

    const filteredBlogs = user.blogs.filter((blog) => {
      if (read === undefined) return true;
      return blog.readinglist.read.toString() === read;
    });

    res.json({
      name: user.name,
      username: user.username,
      readings: filteredBlogs.map((blog) => ({
        id: blog.id,
        url: blog.url,
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
        year: blog.year,
        readinglists: filteredBlogs.map((blog) => ({
          id: blog.readinglist.id,
          read: blog.readinglist.read
        }))
      }))
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    user.username = req.body.username;
    await user.save();
    res.json({ username: user.username });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
