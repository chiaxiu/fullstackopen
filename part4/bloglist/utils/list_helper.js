const _ = require("lodash");

// const blogs = [
//   {
//     _id: "5a422a851b54a676234d17f7",
//     title: "React patterns",
//     author: "Michael Chan",
//     url: "https://reactpatterns.com/",
//     likes: 7,
//     __v: 0,
//   },
//   {
//     _id: "5a422aa71b54a676234d17f8",
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//     __v: 0,
//   },
//   {
//     _id: "5a422b3a1b54a676234d17f9",
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//     likes: 12,
//     __v: 0,
//   },
//   {
//     _id: "5a422b891b54a676234d17fa",
//     title: "First class tests",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//     likes: 10,
//     __v: 0,
//   },
//   {
//     _id: "5a422ba71b54a676234d17fb",
//     title: "TDD harms architecture",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//     likes: 0,
//     __v: 0,
//   },
//   {
//     _id: "5a422bc61b54a676234d17fc",
//     title: "Type wars",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//     likes: 2,
//     __v: 0,
//   },
// ];

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let mostLikes = 0;
  let topFavorite = null;

  blogs.map((blog) => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes;
      topFavorite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
  });

  return topFavorite;
};

const mostBlogs = (blogs) => {
  let countMap = {};
  let returnAuthor = null;

  if (blogs.length === 0) return null;

  _.forEach(blogs, (blog) => {
    if (countMap[blog.author] === undefined) {
      countMap[blog.author] = 1;
    } else {
      countMap[blog.author]++;
    }
  });

  const [author, count] = Object.entries(countMap).reduce((a, e) =>
    e[1] > a[1] ? e : a
  );

  returnAuthor = { author: author, blogs: count };

  return returnAuthor;
};

const mostLikes = (blogs) => {
  let likeMap = {};
  let returnAuthor = null;

  if (blogs.length === 0) return null;

  _.forEach(blogs, (blog) => {
    if (likeMap[blog.author] === undefined) {
      likeMap[blog.author] = blog.likes;
    } else {
      likeMap[blog.author] = likeMap[blog.author] + blog.likes;
    }
  });

  const [author, likes] = Object.entries(likeMap).reduce((a, e) =>
    e[1] > a[1] ? e : a
  );

  returnAuthor = { author: author, likes: likes };

  return returnAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
