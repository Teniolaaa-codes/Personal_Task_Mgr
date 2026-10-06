import { Router } from "express";
import {
  myTasks,
  getTaskById,
  addNewTask,
  editTaskById,
  deleteTaskById,
  statusComplete,
} from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

// Protect all task routes, token required on every request
router.use(protect);

router.route("/").get(myTasks).post(addNewTask);
router.route("/:id").get(getTaskById).put(editTaskById).delete(deleteTaskById);
router.patch("/:id/status", statusComplete);

export default router;
