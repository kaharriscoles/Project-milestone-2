console.log("Starting server...");
// Import Express
const express = require("express");

// Create the Express app
const app = express();

// Set the port number
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log each request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static frontend files from this folder
app.use(express.static(__dirname));

// Server-side task data
let tasks = [
  {
    name: "Example Task",
    course: "Web Development",
    dueDate: "2026-06-20"
  }
];

// GET route to return all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST route to add a new task
app.post("/api/tasks", (req, res) => {
  const newTask = {
    name: req.body.name,
    course: req.body.course,
    dueDate: req.body.dueDate
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});