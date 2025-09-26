import { useEffect, useMemo, useState } from "react";
import "./ToDoList.css";
import ToDoInput from "../ToDoInput/ToDoInput";
import ToDoItem from "../ToDoItem/ToDoItem";
import ToDoFilter from "../ToDoFilter/ToDoFilter";

export type TodoItem = {
  id: number;
  description: string;
  isCompleted: boolean;
};

function ToDoList() {
  const [toDoList, setToDoList] = useState<TodoItem[]>(() => {
    const storedList = localStorage.getItem("todoList");
    return storedList ? JSON.parse(storedList) : [];
  });
  const [filterState, setFilterState] = useState<string>("All");

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(toDoList));
  }, [toDoList]);

  const addItem = (toDoInput: string) => {
    if (toDoInput.trim() === "") return;
    const newItem: TodoItem = {
      id: toDoList.length + 1,
      description: toDoInput,
      isCompleted: false,
    };

    setToDoList([...toDoList, newItem]);
  };

  const toggleCompleteStatus = (id: number) => {
    const updatedList = toDoList.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      } else {
        return item;
      }
    });
    setToDoList(updatedList);
  };

  const filterList: TodoItem[] = useMemo(() => {
    if (filterState === "Active")
      return toDoList.filter((item) => !item.isCompleted);
    if (filterState === "Completed")
      return toDoList.filter((item) => item.isCompleted);
    return toDoList;
  }, [filterState, toDoList]);

  return (
    <div className="main-container">
      <h2> TODO LIST </h2>
      <ToDoInput addItem={addItem} />
      <ToDoFilter filterType={filterState} setFilterType={setFilterState} />

      <div className="list-container">
        <label className="label">ToDo List </label>
        <div data-testid="list-wrapper" className="list-wrapper">
          {filterList.length > 0
            ? filterList.map((item) => (
                <ToDoItem
                  key={item.id}
                  item={item}
                  toggleStatus={toggleCompleteStatus}
                />
              ))
            : "No items to display"}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
