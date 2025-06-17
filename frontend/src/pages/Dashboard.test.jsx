import { vi } from "vitest";

// Mock todos module before imports
vi.mock("../services/todos");

import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import * as AuthContext from "../context/AuthContext";
import * as todosAPI from "../services/todos";

describe("Dashboard", () => {
  let useAuthSpy;
  let getTodosSpy;

  beforeEach(() => {
    useAuthSpy = vi.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: { username: "testuser" },
      logout: vi.fn(),
      loading: false,
      error: null,
    });

    getTodosSpy = vi.spyOn(todosAPI, "getTodos");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("displays loading state initially", () => {
    getTodosSpy.mockImplementation(() => new Promise(() => {}));
    useAuthSpy.mockReturnValue({
      user: { username: "testuser" },
      logout: vi.fn(),
      loading: true,
      error: null,
    });

    render(<Dashboard />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays todos after loading", async () => {
    const mockTodos = [{ _id: "1", title: "Test Todo", completed: false }];
    getTodosSpy.mockResolvedValue(mockTodos);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Test Todo")).toBeInTheDocument();
    });
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("displays error message when fetch fails", async () => {
    getTodosSpy.mockRejectedValue(new Error("Failed to fetch"));
    useAuthSpy.mockReturnValue({
      user: { username: "testuser" },
      logout: vi.fn(),
      loading: false,
      error: "Failed to fetch",
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
    });
  });
});
