import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ToDoList from "./ToDoList";

describe("ToDoList", () => {
  it("renders the Add New Item label", () => {
    render(<ToDoList />);
    expect(screen.getByText("Add New Todo Item")).toBeInTheDocument();
  });

  it("add new todoItem", () => {
    render(<ToDoList />);
    const todoInput = screen.getByTestId("todo-input") as HTMLInputElement;
    fireEvent.change(todoInput, { target: { value: "Todo Item 1" } });
    waitFor(() => {
      expect(screen.getByText("Todo Item 1")).toBeInTheDocument();
    });
  });

  it("save new todoItem and mark as complete", () => {
    render(<ToDoList />);
    const todoInput = screen.getByTestId("todo-input") as HTMLInputElement;
    fireEvent.change(todoInput, { target: { value: "Todo Item 1" } });
    const saveButton = screen.getByTestId("todo-save") as HTMLInputElement;
    fireEvent.click(saveButton);

    const listWrapper = screen.getByTestId("list-wrapper") as HTMLElement;
    waitFor(() => {
      expect(listWrapper).toHaveTextContent("Todo Item 1");
      const checkbox1 = screen.getByTestId("checkbox-1") as HTMLInputElement;
      fireEvent.click(checkbox1);
      expect(checkbox1.checked).toBe(true);
    });
  });

  it("filter by complete", () => {
    render(<ToDoList />);
    const filterButton = screen.getByTestId(
      "filter-completed"
    ) as HTMLInputElement;
    fireEvent.click(filterButton);

    const listWrapper = screen.getByTestId("list-wrapper") as HTMLElement;
    waitFor(() => {
      expect(listWrapper).toHaveTextContent("Todo Item 1");
      const checkbox1 = screen.getByTestId("checkbox-1") as HTMLInputElement;
      expect(checkbox1.checked).toBe(true);
    });
  });

  it("filter by active", () => {
    render(<ToDoList />);
    const filterButton = screen.getByTestId(
      "filter-active"
    ) as HTMLInputElement;
    fireEvent.click(filterButton);

    const listWrapper = screen.getByTestId("list-wrapper") as HTMLElement;
    waitFor(() => {
      expect(listWrapper).not.toHaveTextContent("Todo Item 1");
    });
  });

  it("filter by completed", () => {
    render(<ToDoList />);
    const filterButton = screen.getByTestId(
      "filter-completed"
    ) as HTMLInputElement;
    fireEvent.click(filterButton);

    const listWrapper = screen.getByTestId("list-wrapper") as HTMLElement;
    waitFor(() => {
      expect(listWrapper).toHaveTextContent("Todo Item 1");
    });
  });
  it("save empty item", () => {
    render(<ToDoList />);
    const saveButton = screen.getByTestId("todo-save") as HTMLInputElement;
    fireEvent.click(saveButton);

    const listWrapper = screen.getByTestId("list-wrapper") as HTMLElement;
    waitFor(() => {
      expect(listWrapper).toHaveLength(0);
    });
  });
});
