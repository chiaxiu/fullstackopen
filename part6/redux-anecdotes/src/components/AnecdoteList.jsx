import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  deleteNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector((state) => state);

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(increaseVote(anecdote.id));
                dispatch(createNotification(`you voted '${anecdote.content}'`));
                setTimeout(() => {
                  dispatch(deleteNotification());
                }, 3000);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
