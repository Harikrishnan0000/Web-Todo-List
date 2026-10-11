// routes/tasks.js
// REST API for tasks (assignment items A4 and A5)
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// Convert to string, trim, and return "" if missing (A5)
const cleanTitle = (value) => String(value ?? "").trim();

// GET /api/tasks - fetch all tasks (oldest first)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /api/tasks - add a new task
router.post("/", async (req, res) => {
  const title = cleanTitle(req.body.title);
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    const task = await Task.create({ title });
    res.status(201).json(task); // 201 Created
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT /api/tasks/:id - edit title and/or toggle completed
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updates = {};

  // Only validate the title if the client sent one
  if (req.body.title !== undefined) {
    const title = cleanTitle(req.body.title);
    if (!title) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    updates.title = title;
  }
  if (req.body.completed !== undefined) {
    updates.completed = Boolean(req.body.completed);
  }

  try {
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /api/tasks/:id - delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not found" });
  }
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted", id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
