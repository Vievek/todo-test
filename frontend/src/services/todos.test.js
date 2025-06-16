import { getTodos, createTodo, updateTodo, deleteTodo } from "./todos";
import api from "./api";

vi.mock("./api");

describe("todos service", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches todos", async () => {
    const mockTodos = [{ id: 1, title: "Test Todo" }];
    api.get.mockResolvedValue({ data: mockTodos });

    const result = await getTodos();
    expect(api.get).toHaveBeenCalledWith("/api/todos");
    expect(result).toEqual(mockTodos);
  });

  it("creates a todo", async () => {
    const newTodo = { title: "New Todo" };
    const mockResponse = { id: 1, ...newTodo };
    api.post.mockResolvedValue({ data: mockResponse });

    const result = await createTodo(newTodo);
    expect(api.post).toHaveBeenCalledWith("/api/todos", newTodo);
    expect(result).toEqual(mockResponse);
  });

  it("updates a todo", async () => {
    const updatedTodo = { title: "Updated Todo", completed: true };
    const mockResponse = { id: 1, ...updatedTodo };
    api.patch.mockResolvedValue({ data: mockResponse });

    const result = await updateTodo("1", updatedTodo);
    expect(api.patch).toHaveBeenCalledWith("/api/todos/1", updatedTodo);
    expect(result).toEqual(mockResponse);
  });

  it("deletes a todo", async () => {
    api.delete.mockResolvedValue({ data: { success: true } });

    const result = await deleteTodo("1");
    expect(api.delete).toHaveBeenCalledWith("/api/todos/1");
    expect(result).toEqual({ success: true });
  });
});
