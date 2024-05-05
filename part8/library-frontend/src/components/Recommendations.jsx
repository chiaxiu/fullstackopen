/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { ME } from "../queries";

const Recommendations = ({ show, books }) => {
  const result = useQuery(ME);
  if (!show) {
    return null;
  }
  const favoriteGenre = result.data.me.favoriteGenre;
  const filteredBooks = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre: <b>{favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
