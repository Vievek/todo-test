import Todo from "../models/Todo.js";
import { validateTodoInput } from "../utils/validate.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  const { title } = req.body;

  // Validate input
  const { errors, valid } = validateTodoInput(title);
  if (!valid) {
    return res.status(400).json({ errors });
  }

  try {
    const todo = new Todo({
      title,
      user: req.userId,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndRemove(id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
