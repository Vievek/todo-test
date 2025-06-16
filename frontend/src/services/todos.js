import axios from "./api";

export const getTodos = async () => {
  const response = await axios.get("/api/todos");
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post("/api/todos", todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.patch(`/api/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`/api/todos/${id}`);
  return response.data;
};
