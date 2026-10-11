# MERN Stack To-Do List

A full-stack To-Do List built with **MongoDB, Express.js, React (Vite) and Node.js**.
Tasks are stored in MongoDB through a REST API and shown in a React interface.

## Features
- Add, complete/uncomplete, and delete tasks
- Data persists in MongoDB (survives page refresh)
- Input validation (empty titles rejected with HTTP 400)
- CORS restricted to the frontend origin (`http://localhost:3000`)

## Project structure
```
backend/    Express server, Mongoose model, REST routes
  models/Task.js
  routes/tasks.js
  server.js
frontend/   React app (Vite)
  src/components/  TaskForm, TaskList, TaskItem
  src/api.js       fetch calls to the backend
  src/App.jsx
```

## API endpoints
| Method | Endpoint         | Description                          | Success code |
|--------|------------------|--------------------------------------|--------------|
| GET    | /api/tasks       | Fetch all tasks                      | 200          |
| POST   | /api/tasks       | Add a task (`{ "title": "..." }`)    | 201          |
| PUT    | /api/tasks/:id   | Edit title and/or `completed`        | 200          |
| DELETE | /api/tasks/:id   | Delete a task                        | 200          |

Errors: `400` for an empty title, `404` if the task is not found.

## Prerequisites
- Node.js 18+
- MongoDB running locally, or a free MongoDB Atlas cluster

## How to run

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env      # then fill in MONGO_URI
npm start
```
`.env` variables:
```
MONGO_URI=mongodb://127.0.0.1:27017/todo-app   # or your Atlas connection string
PORT=5000
```
The server runs on http://localhost:5000.

### 2. Frontend (in a second terminal)
```bash
cd frontend
npm install
npm start
```
Open http://localhost:3000. Keep both servers running.

## Screenshots
Add your screenshots to a `screenshots/` folder and list them here:
- `screenshots/add-task.png`
- `screenshots/complete-task.png`
- `screenshots/delete-task.png`
- `screenshots/merged-pull-requests.png`

## Author
Name: _your name_ · Roll No: _your roll number_
