/**
 * WHAT: Task CRUD + search against the Express API
 * WHY:  My Tasks / New / Edit must use the server so data is user-scoped and persistent
 * WHERE: Pages call these after AuthContext provides a JWT
 * HOW:  Bearer token on every request; optional ?search&category&completed
 */

import type { Task, TaskCategory, TaskFormValues } from "../types/tasks";
import { API_BASE, authHeaders } from "./config";

type ApiTask = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: TaskCategory;
  completed: boolean;
};

function mapTask(t: ApiTask): Task {
  return {
    id: String(t.id),
    title: t.title,
    description: t.description,
    dueDate: t.dueDate,
    category: t.category,
    completed: Boolean(t.completed),
  };
}

export type ListTasksParams = {
  token: string;
  search?: string;
  category?: string;
  completed?: "true" | "false";
};

export async function fetchTasks(params: ListTasksParams): Promise<Task[]> {
  const qs = new URLSearchParams();
  if (params.search?.trim()) qs.set("search", params.search.trim());
  if (params.category && params.category !== "All") {
    qs.set("category", params.category);
  }
  if (params.completed) qs.set("completed", params.completed);

  const url = `${API_BASE}/api/tasks${qs.toString() ? `?${qs}` : ""}`;
  const res = await fetch(url, { headers: authHeaders(params.token) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load tasks");
  return ((data.tasks || []) as ApiTask[]).map(mapTask);
}

export async function fetchTaskById(token: string, id: string): Promise<Task> {
  const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
    headers: authHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Task not found");
  return mapTask(data.task as ApiTask);
}

export async function createTask(
  token: string,
  values: TaskFormValues
): Promise<Task> {
  const res = await fetch(`${API_BASE}/api/tasks`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(values),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create task");
  return mapTask(data.task as ApiTask);
}

export async function updateTaskApi(
  token: string,
  id: string,
  values: Partial<TaskFormValues> & { completed?: boolean }
): Promise<Task> {
  const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(values),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update task");
  return mapTask(data.task as ApiTask);
}

export async function deleteTaskApi(token: string, id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete task");
}

export async function toggleTaskApi(token: string, id: string): Promise<Task> {
  const res = await fetch(`${API_BASE}/api/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: authHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to toggle task");
  return mapTask(data.task as ApiTask);
}
