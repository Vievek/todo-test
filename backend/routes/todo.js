import express from "express";
import auth from "../middlewares/auth.js";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/", auth, getTodos);
router.post("/", auth, createTodo);
router.patch("/:id", auth, updateTodo);
router.delete("/:id", auth, deleteTodo);

export default router;
