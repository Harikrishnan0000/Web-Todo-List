// api.js
// All calls to the backend live here. Each function talks to the REST API
// and returns the parsed JSON (or throws an Error with the server's message).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

// Shared helper: send the request, throw if the status is not 2xx
async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

// GET /api/tasks
export const getTasks = () => request(API_URL);

// POST /api/tasks
export const addTask = (title) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

// PUT /api/tasks/:id (send only the fields that changed)
export const updateTask = (id, changes) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });

// DELETE /api/tasks/:id
export const deleteTask = (id) => request(`${API_URL}/${id}`, { method: "DELETE" });
