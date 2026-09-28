import { useState, useEffect, useCallback } from "react";
import type { Task, TaskFormValues } from "../types/tasks";

const STORAGE_KEY = "task-mgr-tasks";

//Read tasks from localStorage (or return empty array if none)
function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Persist tasks to localStorage
function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  // Keep localStorage in sync whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Create a new task
  const addTask = useCallback((values: TaskFormValues) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...values,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  // Update an existing task by id
  const updateTask = useCallback((id: string, values: TaskFormValues) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...values } : t)),
    );
  }, []);

  // Delete a task by id
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Toggle completion flag for a task
  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  // get a task by id
  const getTask = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks],
  );

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    getTask,
  };
}
