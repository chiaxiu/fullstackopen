import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const put = async (updatedObject) => {
  const { id, ...putObject } = updatedObject;
  const response = await axios.put(`${baseUrl}/${id}`, putObject);
  return response.data;
};

const addComment = async (commentObject) => {
  const { id, comment } = commentObject;
  const response = await axios.put(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, put, remove, setToken, addComment };
