import "./ToDoFilter.css";

interface ToDoFilterProps {
  filterType: string;
  setFilterType: (type: string) => void;
}

function ToDoFilter({ filterType, setFilterType }: ToDoFilterProps) {
  return (
    <div
      className="button-wrapper"
      style={{ flexDirection: "column", alignItems: "flex-start" }}
    >
      <label className="label">Filter By </label>
      <div>
        <button
          className={`button ${filterType === "All" && "button-active"}`}
          data-testid="filter-all"
          onClick={() => setFilterType("All")}
        >
          All
        </button>
        <button
          className={`button ${filterType === "Completed" && "button-active"}`}
          data-testid="filter-active"
          onClick={() => setFilterType("Active")}
        >
          Active
        </button>
        <button
          className={`button ${filterType === "Active" && "button-active"}`}
          data-testid="filter-completed"
          onClick={() => setFilterType("Completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default ToDoFilter;
