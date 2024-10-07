import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
} from "./redux/todos/todoSlice.js";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setAllTodos] = useState([]);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    localStorage.setItem("localTodos", JSON.stringify(todos));
    const localTodos = JSON.parse(localStorage.getItem("localTodos"));
    if (localTodos.length > 0) {
      setAllTodos(localTodos);
    }
  }, [todos.length]);

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredTodos);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateTodo({ id: currentId, text: input }));
      setIsEditing(false);
    } else {
      if (input !== "") {
        dispatch(addTodo({ text: input }));
      }
    }
    setInput("");
  };
  const handleEdit = (todo) => {
    if (todo) {
      setIsEditing(true);
      setInput(todo.text);
      setCurrentId(todo.id);
    }
  };
  return (
    <div className="todo_container">
      <h1 className="todo_title">Stackholic Todo App</h1>
      <input
        className="todo_input"
        type="text"
        placeholder="Search todo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <form className="todo_form" onSubmit={handleSubmit}>
        <input
          className="todo_input"
          type="text"
          placeholder="Add todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add_button" type="submit">
          {isEditing ? "Save" : "Add"}
        </button>
      </form>
      <ul className="todo_list_container">
        {filteredTodos?.length > 0 &&
          filteredTodos?.map((todo) => {
            return (
              <li className="todo_list_items" key={todo.id}>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    fontSize: "1.5rem",
                    fontFamily: "Arial",
                    marginRight: "2rem",
                  }}>
                  {todo.text}
                </span>
                <button
                  className="toggle_btn"
                  onClick={() => {
                    dispatch(toggleTodo({ id: todo.id }));
                  }}>
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button className="edit_btn" onClick={() => handleEdit(todo)}>
                  Edit
                </button>
                <button
                  className="delete_btn"
                  onClick={() => {
                    dispatch(deleteTodo({ id: todo.id }));
                  }}>
                  Delete
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
