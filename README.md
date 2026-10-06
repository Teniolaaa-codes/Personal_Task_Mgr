```markdown
# Personal Task Manager

Full-stack personal task manager: a React client for managing tasks and an Express API with authentication, authorization, and user-scoped data.

---

## Overview

| Layer | Responsibility |
|--------|----------------|
| **Client** | UI to create, list, filter, edit, complete, and delete tasks |
| **Server** | REST API with JWT auth; each user only accesses their own tasks |

**Week 1 (client):** Foundational CRUD UI (React + TypeScript + Tailwind).  
**Week 2 (server):** Backend build with Authentication, authorization, and user-scoped task CRUD (tested with Postman).

---

## Features

### Client
- Create, view, edit, and delete tasks
- Fields: title, description, due date, category, completion status
- Categories: Work, Important, Urgent, Personal
- Form validation (required fields; due date not in the past)
- Filter by category and completion status
- Responsive layout
- Inline errors

### Server
- User registration and login (JWT)
- Protected task routes (Bearer token required)
- User-scoped CRUD (User A cannot access User B’s tasks)
- Task filters: `?category=` and `?completed=`
- Password hashing with bcrypt

---

## Tech stack

**Client**
- React (functional components + hooks)
- TypeScript
- Tailwind CSS
- React Router
- Vite
- react-icons

**Server**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv, cors

---

## Getting started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local) **or** MongoDB Atlas
- npm

### 1. Clone the repo

```bash
https://github.com/Teniolaaa-codes/Personal_Task_Mgr.git

cd Personal_Task_Mgr
```

### 2. Server setup

```bash
cd server
npm install
```

Edit `.env`:

```
PORT=4001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=add_your_long_random_jwt_secret
JWT_EXPIRES_IN=5d
```

Run the server:

```bash
npm run dev
```

Base URL: `http://localhost:4001`

### 3. Client setup

```bash
cd client
npm install
npm run dev
```

Open the URL shown in the terminal (hold ctrl + click).

---

## Notes

- Passwords are hashed with bcrypt (never stored plain).
- JWT required on all task routes.
- Every task query is scoped with `user: req.user._id`.
- Keep `.env` out of Git (see `server/.gitignore`).

---
