const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { Session, User } = require('../models');

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);

      const session = await Session.findOne({
        where: { userId: req.decodedToken.id }
      });
      const user = await User.findByPk(req.decodedToken.id);

      if (!session || !user || user.isDisabled) {
        return res
          .status(401)
          .json({ error: 'token invalid or user disabled' });
      }
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

module.exports = { tokenExtractor };
