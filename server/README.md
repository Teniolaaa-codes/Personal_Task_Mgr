# Personal Task Manager - Server

Backend API with **authentication**, **authorization**, and **user-scoped task CRUD**. The Client side is not integrated intentionally as required for this week's task.
Designed to be tested with **Postman**.

**Tech Studio Internship Week 2 task – Backend Build.**

## Features

| Concern              | Implementation                                                                   |
| -------------------- | -------------------------------------------------------------------------------- |
| **Authentication**   | Sign-up + login with email/password; returns a JWT                               |
| **Authorization**    | JWT middleware (`protect`) blocks unauthenticated access to all task routes      |
| **User-scoped data** | Every task is stored with `user: ObjectId`; all queries filter by `req.user._id` |

A user can only create, list, view, update, delete, and toggle the completion status of **their own** tasks.

## Tech stack

- Node.js + Express
- MongoDB + Mongoose
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- dotenv, cors

## Setup

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Install MongoDB

Run MongoDB locally (or use MongoDB Atlas and put the connection string in `.env`).

### 3. Configure environment

Edit `.env`:

```
PORT=4001
MONGO_URI=your_mongodb_
JWT_SECRET=add_your_long_random_jwt_secret
JWT_EXPIRES_IN=5d
```

### 4. Start the server

```bash
npm run dev
# or
npm start
```

Visit `http://localhost:4001` — you should see a JSON list of endpoints.

---

## API reference

Base URL: `http://localhost:4001`

### Auth (public except `/me`)

| Method | Path               | Body                        | Auth         |
| ------ | ------------------ | --------------------------- | ------------ |
| POST   | `/api/auth/signup` | `{ name, email, password }` | No           |
| POST   | `/api/auth/login`  | `{ email, password }`       | No           |
| GET    | `/api/auth/me`     | -                           | Bearer token |

### Tasks (all require Bearer token)

| Method | Path                    | Body / Query                                            | Notes                      |
| ------ | ----------------------- | ------------------------------------------------------- | -------------------------- |
| GET    | `/api/tasks`            | `?category=Work&completed=false`                        | List only **YOUR** tasks   |
| POST   | `/api/tasks`            | `{ title, description, dueDate, category, completed? }` | Creates task for **YOU**   |
| GET    | `/api/tasks/:id`        | -                                                       | 404 if not yours           |
| PUT    | `/api/tasks/:id`        | partial fields                                          | 404 if not yours           |
| DELETE | `/api/tasks/:id`        | -                                                       | 404 if not yours           |
| PATCH  | `/api/tasks/:id/status` | -                                                       | Toggle complete/incomplete |

**Task fields**

- `title` (string, required)
- `description` (string, required)
- `dueDate` (string `YYYY-MM-DD`, required, can't be in the past)
- `category` (enum: `Work` | `Personal` | `Urgent` | `Important`)
- `completed` (boolean, default `false`)

## Postman testing guide

### A. Register two users

**POST** `http://localhost:4001/api/auth/signup`

```json
{
  "name": "Bruce Wayne",
  "email": "bruce@example.com",
  "password": "secretpassword12"
}
```

- Copy `token` from the response → save as `Bruce_Token `.

- Register Tony Stark the same way → save as `Tony_Token`.

### B. Login (optional)

**POST** `http://localhost:4001/api/auth/login`

```json
{
  "email": "bruce@example.com",
  "password": "secretpassword12"
}
```

- Copy new token

### C. Add new tasks as Bruce

Header: `Authorization: Bearer <BRUCE_TOKEN>`

**POST** `/api/tasks`

```json
{
  "title": "Bruce project",
  "description": "Only Bruce should see this",
  "dueDate": "2026-12-31",
  "category": "Personal"
}
```

- Create a second task if you want.

### D. List tasks - prove scoping

1. **GET** `/api/tasks` with Bruce’s token → only Bruce’s tasks.
2. **GET** `/api/tasks` with Tony’s token → only Tony’s tasks.

### E. Cross-user access must fail

1. Copy a task `id` from Bruce’s list.
2. **GET** `/api/tasks/<Bruce-task-id>` with **Tony’s** token → **404 Task not found**.
3. Same for **PUT**, **DELETE**, **PATCH** with Tony’s token → **404**.

### F. Unauthorized without token

**GET** `/api/tasks` with no Authorization header → **401**.

### G. Filters

`GET /api/tasks?category=Work&completed=false` with Bruce’s token.

### H. Update / status / delete as owner

Use Bruce’s token on Bruce’s task ids — should succeed.

---
