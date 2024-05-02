import { useParams } from "react-router-dom";

const IndivUser = ({ users }) => {
  const id = useParams().id;
  const selectedUser = users.find((user) => user.id === id);

  if (!selectedUser) {
    return null;
  }

  return (
    <>
      <h2>{selectedUser.name}</h2>
      <div>added blogs</div>
      <ul>
        {selectedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default IndivUser;
