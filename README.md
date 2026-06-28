# Project-milestone-1
## Features

- Semantic HTML5 structure
- Responsive CSS layout using CSS Grid and Flexbox
- Form input handling with vanilla JavaScript
- Dynamic DOM rendering
- Persistent data using localStorage
- Delete button for removing tasks

## Technologies Used

- HTML
- CSS
- JavaScript
- localStorage

## Milestone 2

This milestone adds a Node.js and Express backend to the client-side prototype.

### New Features

- Express server initialized in `app.js`
- Server listens on port 3000
- Static frontend files served with `express.static()`
- GET `/api/tasks` route returns task data
- POST `/api/tasks` route accepts new task data
- Middleware added for request logging
- Middleware added for parsing JSON request bodies
- Frontend uses `fetch()` to communicate with the backend

### How to Run

1. Install dependencies:

```bash
npm install