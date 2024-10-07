import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
} from "./redux/todos/todoSlice.js";

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateTodo({ id: currentId, text: input }));
      setIsEditing(false);
    } else {
      dispatch(addTodo({ text: input }));
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
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl text-center font-headingFont">
        Stackholic Todo App
      </h1>
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
        {filteredTodos?.length > 0 &&
          filteredTodos?.map((todo) => {
            return (
              <li key={todo.id}>
                <span className={`${todo.completed} ? "line-through" : "none"`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => {
                    dispatch(toggleTodo({ id: todo.id }));
                  }}>
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button
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
