import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ToDoInput from "./ToDoInput";

describe("ToDoInput", () => {
  it("renders ToDoInput", () => {
    const mockAddItem = vi.fn();
    render(<ToDoInput addItem={mockAddItem} />);
    expect(screen.getByText("Add New Todo Item")).toBeInTheDocument();
  });

  it("change input and  save new item", () => {
    const mockAddItem = vi.fn();
    render(<ToDoInput addItem={mockAddItem} />);
    const todoInput = screen.getByTestId("todo-input") as HTMLInputElement;
    fireEvent.change(todoInput, { target: { value: "Todo Item 1" } });
    const saveButton = screen.getByTestId("todo-save") as HTMLInputElement;
    fireEvent.click(saveButton);
    waitFor(() => {
      expect(mockAddItem).toHaveBeenCalledWith("Todo Item 1");
    });
  });
});
