import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setIsEditing(false);
    } else {
      console.log("Adding todo");
    }
    setInput("");
  };
  return (
    <div>
      <h1>Stackholic Todo App</h1>
      <input
        type="text"
        placeholder="Search todo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">{isEditing ? "Save" : "Add"}</button>
      </form>
      <ul>
        {todos.map((todo) => {
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button>Complete</button>
            <button>Edit</button>
            <button>Delete</button>
          </li>;
        })}
      </ul>
    </div>
  );
}

export default App;
