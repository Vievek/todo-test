export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="text-gray-500">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className={`flex items-center justify-between p-3 bg-white border rounded shadow-sm ${
            todo.completed ? "bg-gray-50" : ""
          }`}
        >
          <span
            className={`${todo.completed ? "line-through text-gray-400" : ""}`}
            onClick={() => onToggle(todo._id)}
            style={{ cursor: "pointer" }}
          >
            {todo.title}
          </span>
          <div className="space-x-2">
            <button
              onClick={() => onToggle(todo._id)}
              className={`px-2 py-1 rounded ${
                todo.completed
                  ? "bg-green-500 text-white"
                  : "text-green-500 hover:text-green-700"
              }`}
            >
              {todo.completed ? "✓ Done" : "Mark Done"}
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="px-2 py-1 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
