import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

import api from "./api";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./todos";

describe("Todo Service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch todos", async () => {
    const mockData = [{ id: 1, text: "Test todo" }];
    vi.spyOn(api, "get").mockResolvedValue({ data: mockData });
    const result = await getTodos();
    expect(api.get).toHaveBeenCalledWith("/api/todos");
    expect(result).toEqual(mockData);
  });

  it("should create a todo", async () => {
    const newTodo = { text: "New todo" };
    const mockResponse = { id: 2, ...newTodo };
    vi.spyOn(api, "post").mockResolvedValue({ data: mockResponse });
    const result = await createTodo(newTodo);
    expect(api.post).toHaveBeenCalledWith("/api/todos", newTodo);
    expect(result).toEqual(mockResponse);
  });

  it("should update a todo", async () => {
    const id = 1;
    const updatedTodo = { text: "Updated todo" };
    const mockResponse = { id, ...updatedTodo };
    vi.spyOn(api, "patch").mockResolvedValue({ data: mockResponse });
    const result = await updateTodo(id, updatedTodo);
    expect(api.patch).toHaveBeenCalledWith(`/api/todos/${id}`, updatedTodo);
    expect(result).toEqual(mockResponse);
  });

  it("should delete a todo", async () => {
    const id = 1;
    const mockResponse = { success: true };
    vi.spyOn(api, "delete").mockResolvedValue({ data: mockResponse });
    const result = await deleteTodo(id);
    expect(api.delete).toHaveBeenCalledWith(`/api/todos/${id}`);
    expect(result).toEqual(mockResponse);
  });
});
