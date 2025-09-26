import type { TodoItem } from "../ToDoList/ToDoList";
import "./ToDoItem.css";

interface ToDoItemProps {
  item: TodoItem;
  toggleStatus: (id: number) => void;
}

function ToDoItem({ item, toggleStatus }: ToDoItemProps) {
  return (
    <label key={item.id} className="list-item">
      <input
        type="checkbox"
        data-testid={`checkbox-${item.id}`}
        checked={item.isCompleted}
        onChange={() => toggleStatus(item.id)}
      />
      {item.description}
    </label>
  );
}

export default ToDoItem;
