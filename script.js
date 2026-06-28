// Get the form and task list container from the HTML
const taskForm = document.getElementById("taskForm");
const tasksContainer = document.getElementById("tasksContainer");

// Store tasks loaded from the server
let tasks = [];

// Get task data from the Express server
async function fetchTasks() {
try {
const response = await fetch("/api/tasks");

if (!response.ok) {
  throw new Error("Failed to load tasks from the server.");
}

tasks = await response.json();
renderTasks();

} catch (error) {
console.error(error);
tasksContainer.innerHTML = "<p>There was a problem loading tasks.</p>";
}
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
course.textContent = "Course: " + task.course;

const dueDate = document.createElement("p");
dueDate.textContent = "Due Date: " + task.dueDate;

taskCard.appendChild(taskTitle);
taskCard.appendChild(course);
taskCard.appendChild(dueDate);

tasksContainer.appendChild(taskCard);

});
}

// Send new task data to the Express server
taskForm.addEventListener("submit", async function (event) {
event.preventDefault();

const taskName = document.getElementById("taskName").value.trim();
const courseName = document.getElementById("courseName").value.trim();
const dueDate = document.getElementById("dueDate").value.trim();

// Basic frontend validation before sending data to the server
if (!taskName || !courseName || !dueDate) {
alert("Please fill in all fields.");
return;
}

const newTask = {
name: taskName,
course: courseName,
dueDate: dueDate
};

try {
const response = await fetch("/api/tasks", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(newTask)
});

if (!response.ok) {
  throw new Error("Failed to save task.");
}

taskForm.reset();
fetchTasks();

} catch (error) {
console.error(error);
alert("There was a problem saving the task.");
}
});

// Load tasks from the server when the page opens
fetchTasks();