import { useState } from "react";
import "./ToDoInput.css";

interface ToDoInputProps {
  addItem: (item: string) => void;
}

function ToDoInput({ addItem }: ToDoInputProps) {
  const [toDoItem, setTodoItem] = useState<string>("");

  return (
    <div className="todo-input">
      <div className="input-wrapper">
        <label className="label">Add New Todo Item </label>
        <input
          data-testid="todo-input"
          className="input"
          type="text"
          onChange={(e) => setTodoItem(e.target.value)}
          value={toDoItem}
        />
      </div>
      <button
        className="button"
        data-testid="todo-save"
        onClick={() => {
          addItem(toDoItem);
          setTodoItem("");
        }}
      >
        Save
      </button>
    </div>
  );
}

export default ToDoInput;
