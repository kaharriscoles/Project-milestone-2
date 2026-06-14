// Get the form and task list container from the HTML
const taskForm = document.getElementById("taskForm");
const tasksContainer = document.getElementById("tasksContainer");

// Store tasks loaded from the server
let tasks = [];

// Get task data from the Express server
async function fetchTasks() {
  const response = await fetch("/api/tasks");
  tasks = await response.json();
  renderTasks();
}

// Display all tasks on the page
function renderTasks() {
  tasksContainer.innerHTML = "";

  if (tasks.length === 0) {
    tasksContainer.innerHTML = "<p>No tasks added yet.</p>";
    return;
  }

  tasks.forEach((task) => {
    const taskCard = document.createElement("article");
    taskCard.classList.add("task-item");

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.name;

    const course = document.createElement("p");
    course.textContent = `Course: ${task.course}`;

    const dueDate = document.createElement("p");
    dueDate.textContent = `Due Date: ${task.dueDate}`;

    taskCard.appendChild(taskTitle);
    taskCard.appendChild(course);
    taskCard.appendChild(dueDate);

    tasksContainer.appendChild(taskCard);
  });
}

// Send new task data to the Express server
taskForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const taskName = document.getElementById("taskName").value;
  const courseName = document.getElementById("courseName").value;
  const dueDate = document.getElementById("dueDate").value;

  const newTask = {
    name: taskName,
    course: courseName,
    dueDate: dueDate
  };

  await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTask)
  });

  taskForm.reset();
  fetchTasks();
});

// Load tasks from the server when the page opens
fetchTasks();