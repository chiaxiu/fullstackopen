/* eslint-disable react/prop-types */
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BORN } from "../queries";
import { useEffect, useState } from "react";
import Select from "react-select";

const Authors = ({ show }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);

  const [editBorn, editResult] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    if (editResult.data && editResult.data.editAuthor === null) {
      console.log("author not found");
    }
  }, [editResult.data]);

  if (!show) {
    return null;
  }

  if (result.loading) return <div>Loading...</div>;
  const authors = result.data.allAuthors;
  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  console.log(options);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const setBornTo = Number(born);

    editBorn({ variables: { name, setBornTo } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Set birthyear</h3>
          <div>
            name{" "}
            <Select
              defaultValue={name}
              onChange={(selectedOption) => setName(selectedOption.value)}
              options={options}
            />
          </div>
          <div>
            born{" "}
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">set</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
