import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({ setMessage, updateBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.create({ title: title, author: author, url: url });
      setMessage(`a new blog ${title} by ${author} is added!`);
      updateBlogs();
      setTitle("");
      setAuthor("");
      setUrl("");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("ERROR Failed to post; try refreshing ");
      console.log(exception);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:&nbsp;
          <input
            data-testid="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:&nbsp;
          <input
            data-testid="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:&nbsp;
          <input
            data-testid="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
