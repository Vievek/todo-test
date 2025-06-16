import axios from "./api";

export const register = async (credentials) => {
  const response = await axios.post("/api/auth/register", credentials);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post("/api/auth/login", credentials);
  localStorage.setItem("token", response.data.token);
  return response.data.result;
};

export const getCurrentUser = async () => {
  const response = await axios.get("/api/auth/me");
  return response.data;
};
