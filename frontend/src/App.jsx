import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();

  // Fetch messages
  async function getMessages() {
    const response = await fetch("http://localhost:3500/new");

    return response.json();
  }

  const {
    data: messages,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });

  // Send HTTP POST request (to create a message)
  const createMessage = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch("http://localhost:3500/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]); // Refetch messages
    },
  });

  // Send HTTP DELETE request (to delete a message)
  const deleteMessage = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`http://localhost:3500/new/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the message");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]); // Refetch messages
    },
  });

  // Handle form submit
  function onSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const user = form.user.value;
    const text = form.text.value;

    createMessage.mutate({ text, user });

    form.reset();
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <main className="App">
      <h1 className="App_title">Here are your messages:</h1>

      <div className="App__message-container">
        {messages.map((message) => {
          return (
            <div key={message.id} className="App__message">
              <p>
                From {message.user}: {message.text}
              </p>
              <p>When: {message.added}</p>

              <button
                onClick={() => {
                  if (
                    confirm(
                      `Are you sure you want to delete this message from ${message.user}?: ${message.text}`
                    )
                  ) {
                    deleteMessage.mutate(message.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      <form onSubmit={onSubmit} className="App__form">
        <fieldset>
          <legend>Submit Your Information</legend>

          <div>
            <label htmlFor="user">User:</label>
            <input type="text" id="user" name="user" required />
          </div>

          <div>
            <label htmlFor="text">Text:</label>
            <input type="text" id="text" name="text" required />
          </div>

          <button type="submit" disabled={createMessage.isLoading}>
            {createMessage.isLoading ? "Sending..." : "Submit"}
          </button>
        </fieldset>

        {createMessage.isError && (
          <p style={{ color: "red" }}>Error: {createMessage.error.message}</p>
        )}
        {createMessage.isSuccess && (
          <p style={{ color: "green" }}>Message sent successfully!</p>
        )}
      </form>
    </main>
  );
}

export default App;
