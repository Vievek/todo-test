import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { useAuth } from "../context/AuthContext";
import * as todosAPI from "../services/todos";

// Mock the useAuth hook
vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Mock the todos service
vi.mock("../services/todos", () => ({
  getTodos: vi.fn(),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
}));

describe("Dashboard", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: { username: "testuser" },
      logout: vi.fn(),
      loading: false,
      error: null,
    });
  });

  it("displays loading state initially", async () => {
    todosAPI.getTodos.mockImplementation(() => new Promise(() => {}));

    render(<Dashboard />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays todos after loading", async () => {
    const mockTodos = [{ _id: "1", title: "Test Todo", completed: false }];
    todosAPI.getTodos.mockResolvedValue(mockTodos);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Test Todo")).toBeInTheDocument();
    });
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("displays error message when fetch fails", async () => {
    todosAPI.getTodos.mockRejectedValue(new Error("Failed to fetch"));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
    });
  });
});
