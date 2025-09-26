import { useMemo, useState } from 'react';
import './App.css'

type TodoItem = {
  id: number;
  description: string;
  isCompleted: boolean;
}

function App() {

  const [toDoList, setToDoList] = useState<TodoItem[]>([]);
  const [toDoItem, setTodoItem] = useState<string>("");
  const [filterState, setFilterState] = useState<string>("All");

  const addItem = () => {
    if (toDoItem.trim() === "") return;
    const newItem: TodoItem = {
      id: toDoList.length + 1,
      description: toDoItem,
      isCompleted: false
    }

    setToDoList([...toDoList, newItem]);
    setTodoItem("");
  }

  const toggleCompleteStatus = (id: number) => {
    const updatedList = toDoList.map(item => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      } else { return item; }
    })
    setToDoList(updatedList);
  }

  const filterList: TodoItem[] = useMemo(() => {
    if (filterState === "Active") return toDoList.filter(item => !item.isCompleted);
    if (filterState === "Completed") return toDoList.filter(item => item.isCompleted);
    return toDoList;;
  }, [filterState, toDoList])

  return (
    <div className='main-container'>
      <h2> TODO LIST </h2>
      <div className='input-container'>
        <div className="input-wrapper">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '10px' }}>

            <label className='label'>
              Add New Todo Item </label>
            <input data-testid="todo-input" className="input" type='text' onChange={(e) => setTodoItem(e.target.value)} value={toDoItem} />
          </div>

          <button className="button" data-testid="todo-save" onClick={addItem}>Save</button>

        </div>

        <div className="input-wrapper" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <label className='label'>Filter By </label>
          <div>
            <button className="button" style={{ backgroundColor: filterState === "All" ? 'lightblue' : 'lightgray' }} data-testid="filter-all" onClick={() => setFilterState("All")}>All</button>
            <button className="button" style={{ backgroundColor: filterState === "Active" ? 'lightblue' : 'lightgray' }} data-testid="filter-active" onClick={() => setFilterState("Active")}>Active</button>
            <button className="button" style={{ backgroundColor: filterState === "Completed" ? 'lightblue' : 'lightgray' }} data-testid="filter-completed" onClick={() => setFilterState("Completed")}>Completed</button>
          </div>
        </div>

      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>

        <label className='label'>
          ToDo List </label>
        <div data-testid="list-wrapper" className='list-wrapper'>

          {filterList.length > 0 ?
            filterList.map((item) => (
              <label key={item.id} className='list-item'>
                <input type="checkbox" data-testid={`checkbox-${item.id}`} checked={item.isCompleted} onChange={() => toggleCompleteStatus(item.id)} />{item.description}
              </label>)) : "No items to display"}
        </div>
      </div>

    </div>
  )
}

export default App
