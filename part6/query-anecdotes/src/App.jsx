import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {
  createAnecdote,
  getAnecdotes,
  updateAnecdote,
} from "./servers/request";
import { useNotification } from "./NotificationContext";

const App = () => {
  const { notificationDispatch } = useNotification();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries("anecdotes");
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `New anecdote created: ${newAnecdote.content}`,
      });
      setTimeout(() => {
        notificationDispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `too short anecdote, must have length 5 or more`,
      });
      setTimeout(() => {
        notificationDispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    // refetchOnWindowFocus: false,
    retry: 1,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return (
      <span>anecdote service is not available due to problems in server</span>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                handleVote(anecdote);
                notificationDispatch({
                  type: "SET_NOTIFICATION",
                  payload: `You voted for: ${anecdote.content}`,
                });
                setTimeout(() => {
                  notificationDispatch({
                    type: "CLEAR_NOTIFICATION",
                  });
                }, 5000);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
