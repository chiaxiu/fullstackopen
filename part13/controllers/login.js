const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { SECRET } = require('../util/config');
const { User, Session } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username
    }
  });

  const passwordCorrect = body.password === 'secret';

  if (!(user && passwordCorrect && !user.isDisabled)) {
    return response.status(401).json({
      error: 'invalid username or password, or user is disabled'
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id
  };

  const token = jwt.sign(userForToken, SECRET);

  await Session.create({ userId: user.id });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

router.delete('/logout', tokenExtractor, async (request, response) => {
  console.log('hello', request.decodedToken.id);
  try {
    await Session.destroy({ where: { userId: request.decodedToken.id } });
    response.status(204).end();
  } catch (error) {
    return response.status(401).json({ error: 'Token invalid or expired' });
  }
});

module.exports = router;
