// models/Task.js
// Mongoose schema/model for a Task (assignment item A3)
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },           // task text, must be present
  completed: { type: Boolean, default: false },      // false until ticked
  createdAt: { type: Date, default: Date.now },      // set automatically
});

module.exports = mongoose.model("Task", taskSchema);
