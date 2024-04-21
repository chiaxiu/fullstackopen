import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, updateBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [fullInfo, setFullInfo] = useState(false);

  const handleLikeButton = async (event) => {
    event.preventDefault();
    try {
      const updatedObject = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      };
      await blogService.put(updatedObject);
      updateBlogs();
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRemoveButton = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        updateBlogs();
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  return (
    <div style={blogStyle}>
      <div data-testid="blog-title">
        {blog.title}{" "}
        <button onClick={() => setFullInfo(!fullInfo)}>
          {fullInfo ? "hide" : "view"}
        </button>
      </div>
      {fullInfo && (
        <div data-testid="blog-contents">
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{" "}
            <button onClick={handleLikeButton} data-testid="like-button">
              like
            </button>
          </p>
          <p>{blog.author}</p>
          {user.username === blog.user.username && (
            <button onClick={handleRemoveButton}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
