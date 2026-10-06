import "dotenv/config"; // Load environment variables from .env file
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

const app = express();
app.use(cors());
app.use(express.json());

// Health check 
app.get("/health", (req, res) => {
  res.json({
    message: "TaskMgr. is running",
    endpoints: {
      auth: {
        signup: "POST /api/auth/signup",
        login: "POST /api/auth/login",
        me: "GET /api/auth/me (Bearer token)",
      },
      tasks: {
        myTasks: "GET /api/tasks (Bearer token)",
        addNewTask: "POST /api/tasks (Bearer token)",
        getTaskById: "GET /api/tasks/:id (Bearer token)",
        editTaskById: "PUT /api/tasks/:id (Bearer token)",
        deleteTaskById: "DELETE /api/tasks/:id (Bearer token)",
        status: "PATCH /api/tasks/:id/status (Bearer token)",
      },
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 4001;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`TaskMgr. running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
