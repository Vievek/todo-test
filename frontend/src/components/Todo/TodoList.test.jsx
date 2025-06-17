import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";
import { vi } from "vitest";

describe("TodoList", () => {
  const mockTodos = [
    { _id: "1", title: "Test Todo 1", completed: false },
    { _id: "2", title: "Test Todo 2", completed: true },
  ];

  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders empty state when no todos", () => {
    render(<TodoList todos={[]} />);
    expect(
      screen.getByText("No todos yet. Add one above!")
    ).toBeInTheDocument();
  });

  it("renders todos correctly", () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("calls onToggle when todo is clicked", () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    fireEvent.click(screen.getByText("Test Todo 1"));
    expect(mockOnToggle).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("shows completed todos with line-through", () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    const completedTodo = screen.getByText("Test Todo 2");
    expect(completedTodo).toHaveClass("line-through");
  });
});
