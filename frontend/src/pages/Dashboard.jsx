import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TodoList from "../components/Todo/TodoList";
import TodoForm from "../components/Todo/TodoForm";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.username}</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
}
