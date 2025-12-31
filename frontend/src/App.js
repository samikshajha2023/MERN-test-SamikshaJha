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
        title: tempTodo.title,
        description: tempTodo.description,
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
    } catch (err) {
      fetchTodos();
    }
  };

  const markDone = async (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { done: true });
    } catch (err) {
      fetchTodos();
    }
  };

  return (
    <div className="app">
      <h1 className="heading">✨ My To-Do List ✨</h1>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Todo description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 && (
        <p className="empty-msg">🎉 Your list is empty! Add something fun! 🎉</p>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <div className="todo-text">
              <strong>{todo.title}</strong>
              <span>{todo.description}</span>
            </div>

            <div className="todo-actions">
              <button className="done" onClick={() => markDone(todo._id)}>
                Done
              </button>
              <button className="delete" onClick={() => deleteTodo(todo._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
