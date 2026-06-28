require("dotenv").config();

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

// Create the Express app
const app = express();

// Create Prisma client
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Set the port number
const PORT = 3000;

console.log("Starting server...");

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log each request
app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

// Serve static frontend files from this folder
app.use(express.static(__dirname));

// GET route to return all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: "asc"
      }
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get tasks." });
  }
});

// POST route to add a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const name = req.body.name;
    const course = req.body.course;
    const dueDate = req.body.dueDate;

    // Server-side validation to make sure all fields are filled in
    if (!name || !course || !dueDate) {
      return res.status(400).json({
        error: "Name, course, and due date are required."
      });
    }

    const newTask = await prisma.task.create({
      data: {
        name: name.trim(),
        course: course.trim(),
        dueDate: dueDate.trim()
      }
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});