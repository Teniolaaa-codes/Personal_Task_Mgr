import Task from "../models/Task.js";

// Task CRUD controllers: all operations are scoped to the logged-in user
function taskResponse(task) {
  return {
    id: task._id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    category: task.category,
    completed: task.completed,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

// GET /api/tasks ==> myTasks
async function myTasks(req, res) {
  try {
    // filter for User-scoped data
    const filter = { user: req.user._id };

    // filters (to match the client UI)
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.completed === "true") {
      filter.completed = true;
    } else if (req.query.completed === "false") {
      filter.completed = false;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      count: tasks.length,
      tasks: tasks.map(taskResponse),
    });
  } catch (err) {
    console.error("myTasks error:", err);
    return res.status(500).json({ message: "Couldn't get tasks" });
  }
}

// GET /api/tasks/:id ==> getTaskById
async function getTaskById(req, res) {
  try {
    // Find task by id && owner
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({ task: taskResponse(task) });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid task id" });
    }
    console.error("getTaskById error:", err);
    return res.status(500).json({ message: "Couldn't fetch task" });
  }
}

// POST /api/tasks ==> addNewTask
async function addNewTask(req, res) {
  try {
    const { title, description, dueDate, category, completed } = req.body;

    if (!title || !description || !dueDate || !category) {
      return res.status(400).json({
        message: "title, description, due date, and category are required",
      });
    }

    // Due date must not be in the past
    const today = new Date().toISOString().slice(0, 10);
    if (dueDate < today) {
      return res.status(400).json({
        message: "Due date cannot be in the past",
      });
    }

    const task = await Task.create({
      user: req.user._id, // Bind task to the authenticated user
      title: title.trim(),
      description: description.trim(),
      dueDate,
      category,
      completed: completed === true,
    });

    return res.status(201).json({
      message: "New task added",
      task: taskResponse(task),
    });
  } catch (err) {
    // Mongoose ValidationError means a required field is missing or invalid
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(400).json({ message });
    }
    console.error("addNewTask error:", err);
    return res.status(500).json({ message: "Failed to add new task" });
  }
}

// PUT /api/tasks/:id ==> editTaskById
async function editTaskById(req, res) {
  try {
    const { title, description, dueDate, category, completed } = req.body;

    // Only edit if the task exists && belongs to this user
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (title !== undefined) task.title = String(title).trim();
    if (description !== undefined)
      task.description = String(description).trim();
    if (category !== undefined) task.category = category;
    if (completed !== undefined) task.completed = Boolean(completed);

    if (dueDate !== undefined) {
      const today = new Date().toISOString().slice(0, 10);
      // Allow keeping an existing past due date; block newly chosen past dates
      if (dueDate < today && dueDate !== task.dueDate) {
        return res.status(400).json({
          message: "Due date cannot be in the past",
        });
      }
      task.dueDate = dueDate;
    }

    await task.save();

    return res.status(200).json({
      message: "Task editted successfully",
      task: taskResponse(task),
    });
  } catch (err) {
    // Mongoose CastError means the id is not a valid ObjectId
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid task id" });
    }
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(400).json({ message });
    }
    console.error("editTaskById error:", err);
    return res.status(500).json({ message: "Failed to edit task" });
  }
}

// DELETE /api/tasks/:id ==> deleteTaskById
async function deleteTaskById(req, res) {
  try {
    // Delete only if task id matches && user owns the task
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid task id" });
    }
    console.error("deleteTaskById error:", err);
    return res.status(500).json({ message: "Failed to delete task" });
  }
}

// PATCH /api/tasks/:id/status ==> statusComplete
async function statusComplete(req, res) {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.completed = !task.completed;
    await task.save();

    return res.status(200).json({
      message: `Task marked as ${task.completed ? "complete" : "incomplete"}`,
      task: taskResponse(task),
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid task id" });
    }
    console.error("statusComplete error:", err);
    return res.status(500).json({ message: "Failed to update task status" });
  }
}

export {
  myTasks,
  getTaskById,
  addNewTask,
  editTaskById,
  deleteTaskById,
  statusComplete,
};
