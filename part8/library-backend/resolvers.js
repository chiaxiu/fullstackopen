const { GraphQLError } = require("graphql");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author");
      }

      if (!args.genre) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id }).populate("author");
      }

      if (!args.author) {
        return Book.find({ genres: args.genre }).populate("author");
      }

      const author = await Author.findOne({ name: args.author });
      return Book.find({ author: author._id, genres: args.genre }).populate(
        "author"
      );
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (_root, _args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: (root) => root.bookCount,
  },
  Mutation: {
    addBook: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const author = await Author.findOne({ name: args.author });

      if (!author) {
        const authorToAdd = new Author({ name: args.author, bookCount: 1 });

        try {
          await authorToAdd.save();
          const book = new Book({
            ...args,
            author: authorToAdd._id,
          });
          await book.save();

          pubsub.publish("BOOK_ADDED", { bookAdded: book });
          return book;
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: [args.author, args.title],
              error,
            },
          });
        }
      } else {
        author.bookCount = author.bookCount + 1;

        try {
          await author.save();

          const book = new Book({
            ...args,
            author: author._id,
          });

          await book.save();

          pubsub.publish("BOOK_ADDED", { bookAdded: book });
          return book;
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: [args.author, args.title],
              error,
            },
          });
        }
      }
    },
    editAuthor: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("update born year failed", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      return author;
    },

    createUser: async (_root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },

    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
