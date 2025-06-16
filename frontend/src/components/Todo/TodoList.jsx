export default function TodoList({ todos }) {
  if (todos.length === 0) {
    return <p className="text-gray-500">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex items-center justify-between p-3 bg-white border rounded shadow-sm"
        >
          <span className={todo.completed ? "line-through text-gray-400" : ""}>
            {todo.title}
          </span>
          <div className="space-x-2">
            <button className="text-green-500 hover:text-green-700">✓</button>
            <button className="text-red-500 hover:text-red-700">✕</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
