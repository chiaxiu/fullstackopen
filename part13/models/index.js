const Blog = require('./blog');
const User = require('./users');
const Readinglist = require('./readingList');
const Session = require('./sessions');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Readinglist });
Blog.belongsToMany(User, { through: Readinglist });

User.hasMany(Session);
Session.belongsTo(User);

module.exports = { Blog, User, Readinglist, Session };
