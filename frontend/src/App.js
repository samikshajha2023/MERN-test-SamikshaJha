import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    const tempTodo = {
      _id: Date.now(),
      title,
      description,
    };

    setTodos([...todos, tempTodo]);
    setTitle("");
    setDescription("");

    try {
      const res = await axios.post("http://localhost:5000/api/todos", {
        title,
        description,
      });

      setTodos((prev) =>
        prev.map((t) => (t._id === tempTodo._id ? res.data : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
    } catch {
      fetchTodos();
    }
  };

  const markDone = async (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { done: true });
    } catch {
      fetchTodos();
    }
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="title">
          🌈 My <span>To-Do</span> List ✨
        </h1>

        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            placeholder="✍️ What do you need to do?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="📝 Add some details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">➕ Add</button>
        </form>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <div>
                <strong>{todo.title}</strong>
                <p>{todo.description}</p>
              </div>

              <div className="actions">
                <button
                  className="done-btn"
                  onClick={() => markDone(todo._id)}
                >
                  ✔
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo._id)}
                >
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="empty-text">✨ Your list is empty. Add something fun!</p>
        )}
      </div>
    </div>
  );
}

export default App;
