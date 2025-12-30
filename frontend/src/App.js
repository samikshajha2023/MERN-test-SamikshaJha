import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();

    const tempTodo = {
      _id: Date.now(), // temporary ID for UI
      title,
      description,
    };

    // Show immediately in UI
    setTodos([...todos, tempTodo]);

    // Clear form
    setTitle("");
    setDescription("");

    // Send to backend
    try {
      const res = await axios.post("http://localhost:5000/api/todos", {
        title: tempTodo.title,
        description: tempTodo.description,
      });

      // Replace temp ID with backend ID
      setTodos((prev) =>
        prev.map((t) => (t._id === tempTodo._id ? res.data : t))
      );
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // Delete todo (immediate removal from UI)
  const deleteTodo = async (id) => {
    // Remove from UI first
    setTodos(todos.filter((todo) => todo._id !== id));

    // Then remove from backend
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
    } catch (err) {
      console.error("Error deleting todo:", err);
      // Optional: revert UI if backend fails
      fetchTodos();
    }
  };

  // Mark done (immediate removal from UI)
  const markDone = async (id) => {
    // Remove from UI immediately
    setTodos(todos.filter((todo) => todo._id !== id));

    // Update backend
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { done: true });
    } catch (err) {
      console.error("Error marking todo as done:", err);
      // Optional: revert UI if backend fails
      fetchTodos();
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Todo List</h1>
      <form onSubmit={addTodo} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>Add Todo</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ marginBottom: "10px" }}>
            <span style={{ marginRight: "10px" }}>
              <strong>{todo.title}</strong>: {todo.description}
            </span>
            <button onClick={() => markDone(todo._id)} style={{ marginRight: "5px" }}>Done</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
