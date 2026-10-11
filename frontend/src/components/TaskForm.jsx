import { useState } from "react";

// Form with one input; calls onAdd(title) on submit, then clears the input
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();                 // stop the browser's page reload
    if (!title.trim()) return;          // ignore empty input
    await onAdd(title);
    setTitle("");                       // clear the input
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
