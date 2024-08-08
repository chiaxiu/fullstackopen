const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { Blog, User } = require('../models');
const { SECRET } = require('../util/config');

const { Op } = require('sequelize');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

router.get('/', async (req, res) => {
  const where = {};

  if (req.query.search) {
    const searchQuery = `%${req.query.search}%`;
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: searchQuery
        }
      },
      {
        author: {
          [Op.iLike]: searchQuery
        }
      }
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
  });
  res.json(blogs);
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date()
    });
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.blog) {
    if (req.blog.userId === req.decodedToken.id) {
      await req.blog.destroy();
      res.status(204).end();
    } else {
      res.status(403).json({ error: 'forbidden' });
    }
  } else {
    res.status(404).end();
  }
});

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json({ likes: req.blog.likes });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
