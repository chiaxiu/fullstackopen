import { useDispatch } from "react-redux";
import { increaseLike, removeBlog } from "../reducers/blogReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import blogService from "../services/blogs";

const IndivBlog = ({ blogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return null;
  }

  const handleLikeButton = async (event) => {
    event.preventDefault();
    try {
      const updatedObject = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      };
      dispatch(increaseLike(updatedObject));
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRemoveButton = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(blog.id));
        navigate("/blogs");
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    await blogService.addComment({
      id: blog.id,
      comment: comment,
    });
    setComment("");
  };

  return (
    <div style={blogStyle}>
      <div data-testid="blog-title">{blog.title}</div>
      <div data-testid="blog-contents">
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{" "}
          <button onClick={handleLikeButton} data-testid="like-button">
            like
          </button>
        </p>
        <p>added by {blog.author}</p>
        {user.username === blog.user.username && (
          <button onClick={handleRemoveButton}>remove</button>
        )}
        {blog.comments && (
          <>
            <h3>comments</h3>
            <form onSubmit={handleAddComment}>
              <input
                type="text"
                value={comment}
                name="comment"
                onChange={({ target }) => setComment(target.value)}
              />
              <button type="submit">add comment</button>
            </form>
            <ul>
              {blog.comments.map((comment) => (
                <li key={comment}>{comment}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default IndivBlog;
