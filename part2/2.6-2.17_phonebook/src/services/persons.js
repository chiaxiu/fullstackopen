import axios from "axios";

const baseUrl = "/api/persons/";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (nameObject) => {
  const request = axios.post(baseUrl, nameObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(baseUrl + id);
};

const update = (id, changedContact) => {
  const request = axios.put(baseUrl + id, changedContact);
  return request.then((response) => response.data);
};

export default { getAll, create, remove, update };
