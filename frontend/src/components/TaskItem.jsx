// One row: checkbox, title (struck through when completed), delete button
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />
      <span className="title">{task.title}</span>
      <button className="delete" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </li>
  );
}
