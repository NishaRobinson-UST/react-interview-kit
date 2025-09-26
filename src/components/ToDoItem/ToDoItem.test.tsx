import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ToDoItem from "./ToDoItem";

describe("ToDoItem", () => {
  it("renders the ToDoItem", () => {
    const mockToggleCompleteStatus = vi.fn();
    const item = { id: 1, description: "Todo Item 1", isCompleted: false };
    render(<ToDoItem item={item} toggleStatus={mockToggleCompleteStatus} />);
    expect(screen.getByText("Todo Item 1")).toBeInTheDocument();
  });

  it("toggle checkbox selection", () => {
    const mockToggleCompleteStatus = vi.fn();
    const item = { id: 1, description: "Todo Item 1", isCompleted: false };
    render(<ToDoItem item={item} toggleStatus={mockToggleCompleteStatus} />);
    const checkbox1 = screen.getByTestId("checkbox-1") as HTMLInputElement;
    fireEvent.click(checkbox1);
    expect(mockToggleCompleteStatus).toHaveBeenCalledWith(1);
    expect(mockToggleCompleteStatus).toHaveBeenCalledTimes(1);
  });
});
