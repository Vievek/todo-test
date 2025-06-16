import api from "./api";

export const getTodos = async () => {
  const response = await api.get("/api/todos");
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await api.post("/api/todos", todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await api.patch(`/api/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/api/todos/${id}`);
  return response.data;
};
