Personal Task Manager
A beginner-friendly CRUD app for creating, viewing, editing, completing, and filtering personal tasks.

Built for Tech Studio Internship Week 1 task – Foundational CRUD Application.

Features
Create tasks with title, description, due date, and category
Edit and delete existing tasks
Mark tasks as complete / incomplete
Filter by category and completion status
Form validation (all fields required; due date cannot be in the past)
Responsive UI (mobile → desktop)
Data persisted in the browser via localStorage (My Tasks starts empty)
Tech Stack
React (functional components + hooks)
TypeScript
Tailwind CSS
React Router
Vite
react-icons
Run locally
cd client
npm install
npm run dev
Open the URL shown in the terminal (hold ctrl + click).

Usage
Home — landing page; go to My Tasks or New Task from the nav.
New Task — fill title, description, category, and due date
Done button saves and navigates to My Tasks.
My Tasks — list, filter, complete, edit, or delete tasks.
Edit Task — update a task and save; returns to My Tasks.
Validation
Title, description, category, and due date are required
Due date cannot be in the past
Errors show inline under the field
Filtering
Categories: All, Work, Important, Urgent, Personal
Completion status: All, Incomplete, Complete
Notes
Tasks are stored in localStorage under the key personal-task-manager-tasks
Clearing site data resets the task list
The server/ folder is intentionally unused for this week
