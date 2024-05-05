/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FILTERED_BOOKS } from "../queries";

const Books = ({ show, books }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const result = useQuery(FILTERED_BOOKS, {
    variables: { genre: selectedGenre },
  });

  if (result.loading) return <div>Loading...</div>;
  const filteredBooks = result.data.allBooks;

  if (!show) {
    return null;
  }

  const uniqueGenres = [...new Set(books.flatMap((book) => book.genres))];

  const handleGenreClick = (genre) => {
    setSelectedGenre((prevGenre) => (prevGenre === genre ? "" : genre));
  };

  return (
    <div>
      <h2>books</h2>
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
      {uniqueGenres.map((genre) => (
        <button key={genre} onClick={() => handleGenreClick(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
