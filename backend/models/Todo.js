import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: new Date() },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
