// ADDED: Shared category color mapping used by NewTask, EditTask, and MyTasks cards.
// Colors: Work=cyan, Important=yellow, Urgent=red, Personal=indigo
// Each category has text, light bg, border, and selected styles.

import type { TaskCategory } from "../types/tasks";

export const CATEGORY_STYLES: Record<
  TaskCategory,
  {
    text: string;
    bg: string;
    border: string;
    selectedBg: string;
    selectedBorder: string;
    selectedText: string;
  }
> = {
  Work: {
    text: "text-cyan-700",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    selectedBg: "bg-cyan-100",
    selectedBorder: "border-cyan-600",
    selectedText: "text-cyan-800",
  },
  Important: {
    text: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    selectedBg: "bg-yellow-100",
    selectedBorder: "border-yellow-600",
    selectedText: "text-yellow-800",
  },
  Urgent: {
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    selectedBg: "bg-red-100",
    selectedBorder: "border-red-600",
    selectedText: "text-red-800",
  },
  Personal: {
    text: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    selectedBg: "bg-indigo-100",
    selectedBorder: "border-indigo-600",
    selectedText: "text-indigo-800",
  },
};

export const ALL_CATEGORIES: TaskCategory[] = [
  "Work",
  "Important",
  "Urgent",
  "Personal",
];
