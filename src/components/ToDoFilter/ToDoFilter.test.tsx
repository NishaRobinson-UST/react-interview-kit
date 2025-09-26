import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ToDoFilter from "./ToDoFilter";

describe("ToDoFilter", () => {
  it("renders toDoFilter", () => {
    const setFilterType = vi.fn();
    render(<ToDoFilter filterType={"All"} setFilterType={setFilterType} />);
    expect(screen.getByText("Filter By")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(3);
  });

  it("select active filter", () => {
    const setFilterType = vi.fn();
    render(
      <ToDoFilter filterType={"Completed"} setFilterType={setFilterType} />
    );
    const filterButton = screen.getByTestId(
      "filter-active"
    ) as HTMLInputElement;
    fireEvent.click(filterButton);
    expect(setFilterType).toHaveBeenCalledWith("Active");
  });

  it("select completed filter", () => {
    const setFilterType = vi.fn();
    render(<ToDoFilter filterType={"Active"} setFilterType={setFilterType} />);
    const filterButton = screen.getByTestId(
      "filter-completed"
    ) as HTMLInputElement;
    fireEvent.click(filterButton);
    expect(setFilterType).toHaveBeenCalledWith("Completed");
    screen.debug();
  });
});
