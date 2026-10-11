import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { getTasks, addTask, updateTask, deleteTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]); // list shown on screen
  const [error, setError] = useState("");

  // B2: fetch all tasks from the backend once, when the page loads
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message));
  }, []);

  // B3: send new task to POST, then add it to state (no reload needed)
  const handleAdd = async (title) => {
    try {
      const created = await addTask(title);
      setTasks((prev) => [...prev, created]);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // B4: toggle completed through PUT, then replace that task in state
  const handleToggle = async (task) => {
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // B5: delete through DELETE, then remove it from state
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="app">
      <h1>To-Do List</h1>
      <TaskForm onAdd={handleAdd} />
      {error && <p className="error">{error}</p>}
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </main>
  );
}
